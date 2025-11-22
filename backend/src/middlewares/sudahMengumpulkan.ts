import { IGetRequestWithUser } from "../types/getUserRequest";
import { Response, NextFunction } from "express";
import User from "../models/userModels";
import Penugasan from "../models/penugasanModels";
import "../models/divisiModels"; // Import to register schema for populate

export const sudahMengumpulkanOti = async(
    req: IGetRequestWithUser, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        const userId = req.user?.userId;
        
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const user = await User.findById(userId).populate("divisiPilihan.divisiId");
        
        if (!user?.divisiPilihan || user.divisiPilihan.length === 0) {
            res.status(400).json({ message: "Belum memilih divisi OmahTI" });
            return;
        }

        // Get all OmahTI divisions the user has chosen
        const divisiOtiIds = user.divisiPilihan
            .filter((dp: any) => dp.divisiId && dp.divisiId.himakom === false)
            .map((dp: any) => dp.divisiId._id);

        if (divisiOtiIds.length === 0) {
            res.status(400).json({ message: "Belum memilih divisi OmahTI" });
            return;
        }

        // Check if user has submitted assignment for ANY OmahTI division
        const penugasan = await Penugasan.findOne({
            disubmitOleh: userId,
            disubmitDi: { $in: divisiOtiIds }
        });

        if (!penugasan) {
            res.status(403).json({ 
                message: "Kamu harus mengumpulkan tugas untuk minimal 1 divisi OmahTI terlebih dahulu sebelum bisa memilih jadwal wawancara" 
            });
            return;
        }

        next();
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}

export const sudahMengumpulkanHima = async(
    req: IGetRequestWithUser, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        const userId = req.user?.userId;
        
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const user = await User.findById(userId).populate("divisiPilihan.divisiId");
        
        if (!user?.divisiPilihan || user.divisiPilihan.length === 0) {
            res.status(400).json({ message: "Belum memilih divisi HIMAKOM" });
            return;
        }

        // Get all HIMAKOM divisions the user has chosen
        const divisiHimaIds = user.divisiPilihan
            .filter((dp: any) => dp.divisiId && dp.divisiId.himakom === true)
            .map((dp: any) => dp.divisiId._id);

        if (divisiHimaIds.length === 0) {
            res.status(400).json({ message: "Belum memilih divisi HIMAKOM" });
            return;
        }

        // Check if user has submitted assignment for ANY HIMAKOM division
        const penugasan = await Penugasan.findOne({
            disubmitOleh: userId,
            disubmitDi: { $in: divisiHimaIds }
        });

        if (!penugasan) {
            res.status(403).json({ 
                message: "Kamu harus mengumpulkan tugas untuk minimal 1 divisi HIMAKOM terlebih dahulu sebelum bisa memilih jadwal wawancara" 
            });
            return;
        }

        next();
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}
