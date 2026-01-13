import User from "../models//userModels";
import Divisi from "../models/divisiModels";
import { Request, Response } from "express";
import { IGetRequestWithUser } from "../types/getUserRequest";
import { IDivisi } from "../types/IDivisi";
import { IUser } from "../types/IUser";
import { generateTokens, setCookies } from "../utils/jwt";
import { COOKIE_CONFIG } from "../config/jwtcookies";
import mongoose from "mongoose";
//
const MAX_DIVISIONS_PER_TYPE = 2;

// Pemilihan divisi dibuka: 14 Januari 2026, 00:00 WIB (midnight)
// Pemilihan divisi ditutup: 22 Januari 2026, 00:00 WIB (midnight)
const DIVISION_SELECTION_OPEN_DATE = new Date(Date.UTC(2026, 0, 13, 17, 0, 0)); // 14 Jan 2026, 00:00 WIB (UTC+7)
const DIVISION_SELECTION_CLOSE_DATE = new Date(Date.UTC(2026, 0, 21, 17, 0, 0)); // 22 Jan 2026, 00:00 WIB (UTC+7)

class DivisionSelectionError extends Error {
    constructor(message: string, public statusCode: number = 400) {
        super(message);
    }
}

export const pilihDivisi = async (req: IGetRequestWithUser, res: Response): Promise<void> => {
    try {
        // Check if selection period is open
        const now = new Date();
        if (now < DIVISION_SELECTION_OPEN_DATE) {
            res.status(403).json({ 
                message: `Pemilihan divisi belum dibuka. Akan dibuka pada ${DIVISION_SELECTION_OPEN_DATE.toLocaleString('id-ID', { 
                    dateStyle: 'long', 
                    timeStyle: 'short',
                    timeZone: 'Asia/Jakarta'
                })}`
            });
            return;
        }
        
        if (now > DIVISION_SELECTION_CLOSE_DATE) {
            res.status(403).json({ 
                message: `Pemilihan divisi sudah ditutup pada ${DIVISION_SELECTION_CLOSE_DATE.toLocaleString('id-ID', { 
                    dateStyle: 'long', 
                    timeStyle: 'short',
                    timeZone: 'Asia/Jakarta'
                })}`
            });
            return;
        }

        const { slug: divisiSlug } = req.params;
        const { urutanPrioritas } = req.body;

        if (!req.user?.userId) {
            throw new DivisionSelectionError("Unauthorized", 401);
        }

        // Ambil user + divisi (divisi belum diupdate slot-nya di sini)
        const [divisiRaw, user] = await Promise.all([
            Divisi.findOne({ slug: divisiSlug }),
            User.findById(req.user.userId)
                .populate("divisiPilihanOti")
                .populate("divisiPilihanHima")
        ]);

        if (!divisiRaw || !user) {
            throw new DivisionSelectionError("Division or user not found");
        }

        const userId = user._id as mongoose.Types.ObjectId;

        // Cek apakah user sudah pernah pilih divisi ini
        if (divisiRaw.dipilihOleh?.some((id: any) => id.toString() === userId.toString())) {
            throw new DivisionSelectionError("User sudah terdaftar di divisi ini");
        }

        // Handle logika pilihan di sisi user (tidak menyentuh divisi)
        await handleDivisionSelection(user, divisiRaw, urutanPrioritas);

        /**
         * STEP 1: Klaim slot divisi secara atomic
         * - pastikan:
         *   - slot belum penuh
         *   - user belum ada di dipilihOleh
         */
        const updatedDivisi = await Divisi.findOneAndUpdate(
            {
                _id: divisiRaw._id,
                // slot belum penuh
                $expr: { $lt: [{ $size: { $ifNull: ["$dipilihOleh", []] } }, "$slot"] },
                // user belum terdaftar
                dipilihOleh: { $ne: userId }
            },
            {
                $addToSet: { dipilihOleh: userId }
            },
            { new: true }
        );

        if (!updatedDivisi) {
            // Kalau sampai sini berarti:
            // - slot mendadak penuh, atau
            // - user tiba-tiba sudah masuk (race condition)
            throw new DivisionSelectionError("Slot sudah habis atau user sudah terdaftar di divisi ini");
        }

        // STEP 2: generate token berdasarkan user yang sudah dimodif (divisiPilihan, enrolledSlug*)
        const tokens = generateTokens({
            userId: user.id,
            username: user.username,
            NIM: user.NIM,
            isAdmin: user.isAdmin,
            enrolledSlugHima: user.enrolledSlugHima,
            enrolledSlugOti: user.enrolledSlugOti
        });

        setCookies(res, tokens, COOKIE_CONFIG);

        // STEP 3: simpan user
        user.accessToken = tokens.accessToken;
        user.refreshToken = tokens.refreshToken;

        await user.save(); // kalau ini gagal, divisi sudah terupdate; tanpa transaksi memang tidak bisa 100% atomic

        res.status(200).json({
            message: "Berhasil mendaftar ke divisi ini",
            user: {
                enrolledSlugHima: user.enrolledSlugHima,
                enrolledSlugOti: user.enrolledSlugOti
            }
        });
        return;
    } catch (error) {
        const status = error instanceof DivisionSelectionError ? error.statusCode : 500;
        const message = error instanceof Error ? error.message : "Internal server error";
        res.status(status).json({ message });
        return;
    }
};


async function handleDivisionSelection(
    user: IUser,
    divisi: IDivisi,
    urutanPrioritas: number
): Promise<void> {
    const isHimakom = divisi.himakom;
    const divisionArray: any = isHimakom ? user.divisiPilihanHima : user.divisiPilihanOti;
    const priorityField = isHimakom ? 'prioritasHima' : 'prioritasOti';
    // Initialize arrays if they don't exist
    user.divisiPilihan = user.divisiPilihan || [];

    if (isHimakom) {
        if(user.tanggalPilihanHima?.tanggalId){throw new DivisionSelectionError("User sudah memilih wawancara Himakom, sudah tidak bisa memilih divisi lain");}
        user.divisiPilihanHima = user.divisiPilihanHima || [];
    } else {
        if(user.tanggalPilihanOti?.tanggalId){throw new DivisionSelectionError("User sudah memilih wawancara OTI, sudah tidak bisa memilih divisi lain");}
        user.divisiPilihanOti = user.divisiPilihanOti || [];
    }

    // Check division limit
    if ((divisionArray?.length || 0) >= MAX_DIVISIONS_PER_TYPE) {
        throw new DivisionSelectionError(`Maximal ${MAX_DIVISIONS_PER_TYPE} divisi OTI atau Himakom yang diperbolehkan`);
    }

    const existingPriority = user.divisiPilihan.find((d: any) => d.urutanPrioritas === urutanPrioritas);
    if(existingPriority){
        throw new DivisionSelectionError("Prioritas sudah dipilih");
    }
    // Find existing selection{
    const foundDivisi = divisionArray[0];
    const isLowestPriority = (newPriority: number, divisiPilihan: any[]) => {
        return divisiPilihan.every((divisi: any) => newPriority < divisi.urutanPrioritas);
    };
    const urutanTerendah = isLowestPriority(urutanPrioritas, user.divisiPilihan);
    const newSelection = {
        divisiId: divisi.id,
        urutanPrioritas
    };

    if (!foundDivisi) {
        // Add new selection
        user.divisiPilihan.push(newSelection);
        user[priorityField] = divisi.id;
        user.enrolledSlugHima = isHimakom ? divisi.slug : user.enrolledSlugHima;
        user.enrolledSlugOti = isHimakom ? user.enrolledSlugOti : divisi.slug;
        divisionArray?.push(divisi.id);
    } else {
        // Update existing selection based on priority
        if (!urutanTerendah) {
            user.divisiPilihan.push(newSelection);
            divisionArray?.push(divisi.id);
        } else {
            user[priorityField] = divisi.id;
            user.enrolledSlugHima = isHimakom ? divisi.slug : user.enrolledSlugHima;
            user.enrolledSlugOti = isHimakom ? user.enrolledSlugOti : divisi.slug;
            user.divisiPilihan.push(newSelection);
            divisionArray?.push(divisi.id);
        }
    }
}

export const getAllDivisi = async(_req: Request, res: Response): Promise<void> => {
    try{
        const semuaDivisi = await Divisi.find({});
        res.status(200).json({semuaDivisi});
        return;
    } catch (err){
        res.status(500).json({message: "Cannot fetch divisi"});
        return;
    }
}
export const getOneDivisi = async(req: Request, res: Response): Promise<void> => {
    try{
        const { slug: divisiSlug } = req.params;
        const satuDivisi = await Divisi.findOne({ slug: divisiSlug });
        if(!satuDivisi){
            res.status(404).json({message: "Divisi gaada"});
            return;
        }
        res.status(200).json({satuDivisi});
        return;
    } catch (err){
        res.status(500).json({message: "Cannot fetch one divisi"});
        return;
    }
}