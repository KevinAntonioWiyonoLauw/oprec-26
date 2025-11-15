"use client";

import { useState } from "react";
import JadwalWawancara from "./JadwalWawancara";
import Popup from "./Popup";

interface PilihanWaktuProps {
  variant?: "omahti" | "himakom";
  slugWawancara: string;
  pilihanDivisi: boolean; // boolean saja
  wawancara: any;
  pilihan: any;          // data pilihan wawancara user (null kalau belum pilih)
}

interface ScheduleSlot {
  id: string;
  sesi: Date;
  himakom: boolean;
  sessionId: string;
}

const PilihanWaktuCard = ({
  variant = "omahti",
  slugWawancara,
  pilihanDivisi,
  wawancara,
  pilihan,
}: PilihanWaktuProps) => {
  const [selectedSlot, setSelectedSlot] = useState<ScheduleSlot | null>(
    pilihan && pilihan.sesi && pilihan.sesi.length > 0
      ? {
          id: pilihan._id,
          sesi: new Date(pilihan.sesi[0].jam),
          himakom: variant === "himakom",
          sessionId: pilihan.sesi[0]._id,
        }
      : null,
  );

  const [popupType, setPopupType] = useState<
    "gagal" | "berhasil" | "konfirmasi"
  >("gagal");

  const handleSlotSelect = (
    id: string,
    sesi: Date,
    himakom: boolean,
    sessionId: string,
  ) => {
    setSelectedSlot({ id, sesi, himakom, sessionId });
    setPopupType("konfirmasi");
  };

  // user sudah PUNYA pilihan jadwal → semua tombol disable, hanya tombol popup yang aktif
  const hasChosenSchedule = Boolean(pilihan);

  return (
    <div className="flex w-full flex-col items-center rounded-xl bg-custom-gray-dark p-2 sm:p-4">
      <div className="mb-2 flex w-full items-center justify-between sm:mb-4">
        <div
          className={`rounded-md bg-custom-black p-2 text-sm sm:text-base ${
            variant === "himakom" ? "text-custom-blue" : "text-custom-orange"
          }`}
        >
          {variant === "himakom" ? "Himakom" : "OmahTI"}
        </div>

        <Popup
          disabled={hasChosenSchedule || !selectedSlot}
          type={popupType}
          selectedSlot={selectedSlot}
        />
      </div>

      <JadwalWawancara
        variant={variant === "himakom" ? "himakom" : "omahti"}
        disabled={hasChosenSchedule}
        slugWawancara={slugWawancara}
        pilihanDivisi={pilihanDivisi}
        wawancara={wawancara}
        selectedSlot={selectedSlot}
        onSlotSelect={handleSlotSelect}
      />
    </div>
  );
};

export default PilihanWaktuCard;