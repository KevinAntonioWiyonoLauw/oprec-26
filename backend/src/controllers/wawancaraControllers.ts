import { Request, Response } from "express";
import { IGetRequestWithUser } from "../types/getUserRequest";
import { IDivisi } from "../types/IDivisi";
import { IDivisiSlot, IWawancara } from "../types/IWawancara";
import Wawancara from "../models/wawancaraModels";
import User from "../models/userModels";

interface DIVISISLOT {
  [key: string]: IDivisiSlot;
}

const WAWANCARA_SELECTION_DEADLINE = new Date(Date.UTC(2026, 0, 29, 16, 59, 0)); // 29 Jan 2026, 23:59 WIB (UTC+7)
async function handleWawancaraSelection(
  req: IGetRequestWithUser,
  res: Response,
  isHimakom: boolean
): Promise<void> {
  try {
    // Check if selection period has closed
    const now = new Date();
    if (now > WAWANCARA_SELECTION_DEADLINE) {
      res.status(403).json({ 
        message: `Pemilihan jadwal wawancara sudah ditutup pada ${WAWANCARA_SELECTION_DEADLINE.toLocaleString('id-ID', { 
          dateStyle: 'long', 
          timeStyle: 'short',
          timeZone: 'Asia/Jakarta'
        })}`
      });
      return;
    }

    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const tanggalFields = isHimakom ? "tanggalPilihanHima" : "tanggalPilihanOti";
    const tanggalConflict = isHimakom ? "tanggalPilihanOti" : "tanggalPilihanHima";

    const { userId } = req.user;
    const { wawancaraId } = req.params;
    const { jamWawancara } = req.body;

    const jamWawancaraDate = new Date(jamWawancara);

    const [wawancara, user] = await Promise.all([
      Wawancara.findById(wawancaraId),
      User.findById(userId)
        .populate<{ 
          divisiPilihan: Array<{ 
            divisiId: IDivisi; 
            urutanPrioritas: number; 
          }>
        }>("divisiPilihan.divisiId")
        .populate<{
          tanggalPilihanOti: { tanggalId: IWawancara; jam?: Date };
          tanggalPilihanHima: { tanggalId: IWawancara; jam?: Date };
        }>(`${tanggalFields}.tanggalId`)
        .populate<{
          tanggalPilihanOti: { tanggalId: IWawancara; jam?: Date };
          tanggalPilihanHima: { tanggalId: IWawancara; jam?: Date };
        }>(`${tanggalConflict}.tanggalId`),
    ]);

    if (!wawancara) {
      res.status(400).json({ message: "Wawancara tidak ditemukan" });
      return;
    }

    if (!user || !user.divisiPilihan || user.divisiPilihan.length === 0) {
      res.status(400).json({ message: "User atau divisi pilihan tidak ditemukan" });
      return;
    }

    const userDivisions = user.divisiPilihan
      .filter(dp => dp.divisiId && dp.divisiId.himakom === isHimakom)
      .map(dp => dp.divisiId.slug);

    if (userDivisions.length === 0) {
      res.status(400).json({ 
        message: `Kamu belum memilih divisi ${isHimakom ? 'Himakom' : 'OmahTI'}` 
      });
      return;
    }

    const conflictWrapper = user[tanggalConflict] as
      | { tanggalId?: IWawancara; jam?: Date }
      | undefined;

    const conflictTanggal = conflictWrapper?.tanggalId;

    const possibleConflict =
      conflictTanggal?.sesi.filter((sesi) =>
        sesi.dipilihOleh.some((uid) => uid.toString() === userId.toString())
      ) || [];

    if (possibleConflict.length > 0 && possibleConflict[0]) {
      const hasConflicts =
        possibleConflict[0].jam.getTime() === jamWawancaraDate.getTime();
      if (hasConflicts) {
        const conflictType = isHimakom ? "OmahTI" : "Himakom";
        res.status(400).json({
          message: `Kamu sudah memilih ${conflictType} di waktu yang sama (${jamWawancaraDate.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Jakarta" })})`
        });
        return;
      }
    }

    if (user[tanggalFields].tanggalId) {
      res.status(400).json({
        message: `Anda sudah memilih waktu wawancara untuk ${
          isHimakom ? "Himakom" : "OmahTI"
        }`,
      });
      return;
    }

    const matchingSesi = wawancara.sesi.find(
      (sesi) => sesi.jam.getTime() === jamWawancaraDate.getTime()
    );

    if (!matchingSesi) {
      res.status(400).json({ message: "Sesi dengan jam tersebut tidak ditemukan" });
      return;
    }

    if (matchingSesi.slotTotal.current >= matchingSesi.slotTotal.max) {
      res.status(400).json({ 
        message: "Sesi wawancara ini sudah penuh (maksimal 6 orang)" 
      });
      return;
    }

    const slotDivisiRaw: any = matchingSesi.slotDivisi;
    const slotDivisi = (slotDivisiRaw._doc || slotDivisiRaw) as DIVISISLOT;

    if (!slotDivisi) {
      res.status(400).json({ 
        message: "Data slot divisi tidak tersedia" 
      });
      return;
    }

    const unavailableDivisions: string[] = [];
    const divisionsWithNoSlot: string[] = [];

    for (const divSlug of userDivisions) {
      if (!(divSlug in slotDivisi)) {
        unavailableDivisions.push(divSlug);
        continue;
      }

      const current = slotDivisi[divSlug];
      if (!current || current.sisaSlot === undefined || current.sisaSlot <= 0) {
        divisionsWithNoSlot.push(divSlug);
      }
    }

    if (unavailableDivisions.length > 0) {
      res.status(400).json({ 
        message: `Divisi ${unavailableDivisions.join(', ')} tidak tersedia untuk sesi ini` 
      });
      return;
    }

    if (divisionsWithNoSlot.length > 0) {
      res.status(400).json({ 
        message: `Slot untuk divisi ${divisionsWithNoSlot.join(', ')} sudah penuh (maksimal 2 orang per divisi)` 
      });
      return;
    }

    const updatedDivisions: Array<{ slug: string; sisaSlot: number; lokasi: string }> = [];
    
    for (const divSlug of userDivisions) {
      const current = slotDivisi[divSlug];
      
      if (!current || current.sisaSlot === undefined) {
        res.status(400).json({ 
          message: `Data slot untuk divisi ${divSlug} tidak valid` 
        });
        return;
      }

      current.sisaSlot -= 1;
      updatedDivisions.push({
        slug: divSlug,
        sisaSlot: current.sisaSlot,
        lokasi: current.lokasi || 'N/A' 
      });
    }

    matchingSesi.slotTotal.current += 1;
    matchingSesi.dipilihOleh.push(userId);

    (user[tanggalFields] as any).tanggalId = wawancara.id;
    (user[tanggalFields] as any).jam = jamWawancaraDate;

    await Promise.all([wawancara.save(), user.save()]);

    res.status(200).json({
      message: "Waktu wawancara berhasil dipilih",
      data: {
        jam: jamWawancaraDate,
        divisiTerpilih: userDivisions,
        updatedSlots: updatedDivisions,
        sisaSlotSesi: matchingSesi.slotTotal.max - matchingSesi.slotTotal.current,
      },
    });
    return;
  } catch (err) {
    console.error("ERROR handleWawancaraSelection", err);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
}

export const pilihWaktuWawancaraOti = async (
  req: IGetRequestWithUser,
  res: Response
): Promise<void> => {
  await handleWawancaraSelection(req, res, false);
};

export const pilihWaktuWawancaraHima = async (
  req: IGetRequestWithUser,
  res: Response
): Promise<void> => {
  await handleWawancaraSelection(req, res, true);
};


export const getAllWawancara = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const [wawancaraHimakom, wawancaraOti] = await Promise.all([
      Wawancara.find({ himakom: true }).sort({ tanggal: 1 }), // Sort by date ascending (oldest first)
      Wawancara.find({ himakom: false }).sort({ tanggal: 1 }),
    ]);
    
    res.status(200).json({ wawancaraHimakom, wawancaraOti });
    return;
  } catch (err) {
    console.error("ERROR getAllWawancara", err);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export const getUserWawancaraSelections = async (
  req: IGetRequestWithUser,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { userId } = req.user;

    const user = await User.findById(userId)
      .populate<{ 
        divisiPilihan: Array<{ 
          divisiId: IDivisi; 
          urutanPrioritas: number; 
        }>
        tanggalPilihanOti: { tanggalId: IWawancara; jam?: Date };
        tanggalPilihanHima: { tanggalId: IWawancara; jam?: Date };
      }>("divisiPilihan.divisiId tanggalPilihanOti.tanggalId tanggalPilihanHima.tanggalId");

    if (!user) {
      res.status(404).json({ message: "User tidak ditemukan" });
      return;
    }

    const selections = [];

    if (user.tanggalPilihanOti?.tanggalId && user.tanggalPilihanOti.jam) {
      const otiDivisions = user.divisiPilihan
        ?.filter(dp => dp.divisiId.himakom === false)
        ?.map(dp => dp.divisiId.slug) || [];

      selections.push({
        tanggal: user.tanggalPilihanOti.tanggalId.tanggal,
        jam: user.tanggalPilihanOti.jam.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Jakarta",
          hour12: false
        }),
        himakom: false,
        divisi: otiDivisions
      });
    }

    if (user.tanggalPilihanHima?.tanggalId && user.tanggalPilihanHima.jam) {
      const himaDivisions = user.divisiPilihan
        ?.filter(dp => dp.divisiId.himakom === true)
        ?.map(dp => dp.divisiId.slug) || [];

      selections.push({
        tanggal: user.tanggalPilihanHima.tanggalId.tanggal,
        jam: user.tanggalPilihanHima.jam.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Jakarta",
          hour12: false
        }),
        himakom: true,
        divisi: himaDivisions
      });
    }

    res.status(200).json({ selections });
    return;
  } catch (err) {
    console.error("ERROR getUserWawancaraSelections", err);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};