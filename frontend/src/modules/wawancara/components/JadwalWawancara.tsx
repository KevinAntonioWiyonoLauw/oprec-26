"use client";

import { useState, useEffect } from "react";

// fetch
interface ScheduleSlot {
  id: string;
  sesi: Date;
  himakom: boolean;
  sessionId: string;
}

interface UserSelection {
  tanggal: Date;
  jam: string;
  himakom: boolean;
}

type DivisionType =
  | "backend"
  | "frontend"
  | "uiux"
  | "dsai"
  | "cp"
  | "mobapps"
  | "gamedev"
  | "cybersec"
  | "ipc"
  | "media"
  | "pr"
  | "hr"
  | "snf"
  | "secretary"
  | "skilldev"
  | "treasurer";

interface JadwalWawancaraProps {
  variant: "himakom" | "omahti";
  disabled?: boolean;
  slugWawancara: string;
  pilihanDivisi: boolean;
  wawancara: {
    himakom: boolean;
    _id: string;
    tanggal: Date;
    sesi: {
      jam: Date;
      dipilihOleh: string[];
      slotTotal: {
        current: number;
        max: number;
      };
      slotDivisi: {
        backend: { sisaSlot: number; lokasi: string };
        frontend: { sisaSlot: number; lokasi: string };
        uiux: { sisaSlot: number; lokasi: string };
        dsai: { sisaSlot: number; lokasi: string };
        cp: { sisaSlot: number; lokasi: string };
        mobapps: { sisaSlot: number; lokasi: string };
        gamedev: { sisaSlot: number; lokasi: string };
        cybersec: { sisaSlot: number; lokasi: string };
        ipc: { sisaSlot: number; lokasi: string };
        media: { sisaSlot: number; lokasi: string };
        pr: { sisaSlot: number; lokasi: string };
        snf: { sisaSlot: number; lokasi: string };
        secretary: { sisaSlot: number; lokasi: string };
        skilldev: { sisaSlot: number; lokasi: string };
        treasurer: { sisaSlot: number; lokasi: string };
        hr: { sisaSlot: number; lokasi: string };
        _id: string;
      };
      _id: string;
    }[];
  }[];
  selectedSlot: ScheduleSlot | null;
  onSlotSelect: (
    id: string,
    sesi: Date,
    himakom: boolean,
    sessionId: string,
  ) => void;
}

const JadwalWawancara: React.FC<JadwalWawancaraProps> = ({
  variant,
  slugWawancara,
  pilihanDivisi,
  wawancara,
  disabled = false,
  selectedSlot,
  onSlotSelect,
}) => {
  const isGlobalDisabled = disabled || !pilihanDivisi;

  return (
    <div className="relative h-auto w-full rounded-md bg-custom-silver p-4">
      <div className="grid grid-cols-1 gap-4 overflow-x-auto xxs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {wawancara.map((item) => {
          const tanggalDate = new Date(item.tanggal);
          if (isNaN(tanggalDate.getTime())) {
            console.error("Invalid date:", item.tanggal);
            return null;
          }

          const day = tanggalDate.toLocaleDateString("id-ID", {
            weekday: "long",
            timeZone: "Asia/Jakarta"
          });
          const date = tanggalDate.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            timeZone: "Asia/Jakarta"
          });

          return (
            <div key={item._id} className={disabled ? "opacity-80" : ""}>
              <h3
                className={`mb-2 text-center text-base font-semibold ${
                  variant === "himakom"
                    ? "text-custom-blue"
                    : "text-custom-orange"
                }`}
              >
                {day}
              </h3>
              <h3
                className={`mb-2 text-center text-xl font-semibold ${
                  variant === "himakom"
                    ? "text-custom-blue"
                    : "text-custom-orange"
                }`}
              >
                {date}
              </h3>

              {item.sesi.map((session) => {
                const jamDate = new Date(session.jam);
                if (isNaN(jamDate.getTime())) {
                  console.error("Invalid time:", session.jam);
                  return null;
                }

                const timeString = jamDate.toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZone: "Asia/Jakarta",
                  hour12: false
                });

                const slotInfo =
                  slugWawancara
                    ? session.slotDivisi[slugWawancara as DivisionType]
                    : undefined;
                    
                const isSesiFull = session.slotTotal.current >= session.slotTotal.max;

                const isDivisiSlotAvailable =
                  !slugWawancara
                    ? false
                    : slotInfo === undefined
                      ? true
                      : slotInfo.sisaSlot > 0;

                const hasSlot = !isSesiFull && isDivisiSlotAvailable;
               
                if (slugWawancara && slotInfo) {
                  const totalSlotDivisi = 2; // Maksimal 2 per divisi
                  const terdaftarDivisi = totalSlotDivisi - slotInfo.sisaSlot;
                  
                  console.log(
                    `[${variant.toUpperCase()}] ${date} ${timeString} - Divisi ${slugWawancara}:`,
                    {
                      totalSesi: `${session.slotTotal.current}/${session.slotTotal.max} orang`,
                      divisiIni: `${terdaftarDivisi}/${totalSlotDivisi} orang`,
                      sisaSlotDivisi: slotInfo.sisaSlot,
                      lokasi: slotInfo.lokasi,
                      isSesiFull,
                      isDivisiSlotAvailable,
                      hasSlot,
                    }
                  );
                }

                const isSelected =
                  selectedSlot?.sessionId === session._id &&
                  selectedSlot?.sesi.getTime() === jamDate.getTime();

                const buttonDisabled = isGlobalDisabled || !hasSlot;

                return (
                  <div key={session._id}>
                    <button
                      type="button"
                      onClick={() => {
                        if (!buttonDisabled) {
                          onSlotSelect(
                            item._id,
                            jamDate,
                            item.himakom,
                            session._id,
                          );
                        }
                      }}
                      disabled={buttonDisabled}
                      className={`mb-2 w-full rounded py-2 transition-colors
                        ${
                          isSelected
                            ? variant === "himakom"
                              ? "bg-custom-blue text-custom-silver"
                              : "bg-custom-orange text-custom-silver"
                            : hasSlot
                              ? "bg-custom-gray-light text-custom-black hover:bg-custom-gray-light/80"
                              : "bg-custom-red text-custom-black opacity-60"
                        } ${
                          buttonDisabled
                            ? "cursor-not-allowed opacity-60"
                            : ""
                        }`}
                    >
                      {timeString}
                    </button>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {!pilihanDivisi && (
        <div className="absolute inset-0 grid place-items-center rounded-md bg-custom-black/80 p-4 backdrop-blur-sm transition-all">
          <h1 className="text-center text-custom-silver">
            Isi divisi pilihanmu sebelum memilih jadwal wawancara.
          </h1>
        </div>
      )}
    </div>
  );
};

export default JadwalWawancara;