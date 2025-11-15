import { Request, Response } from "express";
import { IGetRequestWithUser } from "../types/getUserRequest";
import { IDivisi } from "../types/IDivisi";
import { IDivisiSlot, IWawancara } from "../types/IWawancara";
import Wawancara from "../models/wawancaraModels";
import User from "../models/userModels";

interface DIVISISLOT {
  [key: string]: IDivisiSlot;
}

async function handleWawancaraSelection(
  req: IGetRequestWithUser,
  res: Response,
  isHimakom: boolean
): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const queryFields = isHimakom ? "prioritasHima" : "prioritasOti";
    const tanggalFields = isHimakom ? "tanggalPilihanHima" : "tanggalPilihanOti";
    const tanggalConflict = isHimakom ? "tanggalPilihanOti" : "tanggalPilihanHima";

    const { userId } = req.user;
    const { wawancaraId } = req.params;
    const { jamWawancara } = req.body;

    const jamWawancaraDate = new Date(jamWawancara);

    const [wawancara, user] = await Promise.all([
      Wawancara.findById(wawancaraId),
      User.findById(userId)
        .populate<{ prioritasHima: IDivisi; prioritasOti: IDivisi }>(queryFields)
        .populate<{ tanggalPilihanOti: IWawancara; tanggalPilihanHima: IWawancara }>(
          `${tanggalFields}.tanggalId`
        )
        .populate<{ tanggalPilihanOti: IWawancara; tanggalPilihanHima: IWawancara }>(
          `${tanggalConflict}.tanggalId`
        ),
    ]);

    if (!wawancara) {
      res.status(400).json({ message: "Wawancara tidak ditemukan" });
      return;
    }

    if (!user || !user[queryFields]) {
      res.status(400).json({ message: `User atau divisi pilihan tidak ditemukan` });
      return;
    }

    const possibleConflict =
      (user[tanggalConflict].tanggalId as unknown as IWawancara)?.sesi.filter((sesi) =>
        sesi.dipilihOleh.includes(userId)
      ) || [];

    if (possibleConflict.length > 0) {
      const hasConflicts =
        possibleConflict[0]?.jam.getTime() === jamWawancaraDate.getTime();
      if (hasConflicts) {
        res.status(400).json({
          message: `Waktu wawancara yang dipilih bentrok dengan jadwal ${isHimakom ? 'OmahTI' : 'Himakom'}`,
        });
        return;
      }
    }

    if (user[tanggalFields].tanggalId) {
      res.status(400).json({ 
        message: `Anda sudah memilih waktu wawancara untuk ${isHimakom ? 'Himakom' : 'OmahTI'}` 
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

    const slug = user[queryFields].slug;

    console.log("Matching sesi slotDivisi FULL:", JSON.stringify(matchingSesi.slotDivisi, null, 2));
    console.log("User slug:", slug);

    // Akses _doc untuk mendapatkan data asli dari subdocument
    const slotDivisiRaw: any = matchingSesi.slotDivisi;
    const slotDivisi = (slotDivisiRaw._doc || slotDivisiRaw) as DIVISISLOT;

    console.log("slotDivisi setelah cast:", slotDivisi);
    console.log("Keys in slotDivisi:", Object.keys(slotDivisi));

    if (!slotDivisi || !(slug in slotDivisi)) {
      res.status(400).json({ message: `Divisi ${slug} tidak tersedia untuk sesi ini` });
      return;
    }

    let current = slotDivisi[slug];

    console.log(`Slot info for ${slug}:`, current);

    if (!current || current.sisaSlot === undefined || current.sisaSlot <= 0) {
      res.status(400).json({ message: `Slot untuk divisi ${slug} sudah penuh` });
      return;
    }

    current.sisaSlot -= 1;
    matchingSesi.dipilihOleh.push(userId);
    user[tanggalFields].tanggalId = wawancara.id;
    user[tanggalFields].jam = jamWawancaraDate;

    await Promise.all([wawancara.save(), user.save()]);

    res.status(200).json({ 
      message: "Waktu wawancara berhasil dipilih",
      data: {
        jam: jamWawancaraDate,
        lokasi: current.lokasi,
        sisaSlot: current.sisaSlot
      }
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
      Wawancara.find({ himakom: true }), 
      Wawancara.find({ himakom: false }),
    ]);
    
    console.log("Himakom count:", wawancaraHimakom.length);
    console.log("OTI count:", wawancaraOti.length);
    
    res.status(200).json({ wawancaraHimakom, wawancaraOti });
    return;
  } catch (err) {
    console.error("ERROR getAllWawancara", err);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};