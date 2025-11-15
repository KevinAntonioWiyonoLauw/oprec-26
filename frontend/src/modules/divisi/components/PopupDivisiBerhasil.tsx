"use client";
import { Check, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

export default function PopupDivisiBerhasil({
  open,
  onClose,
  divisiName,
  isHimakom,
}: {
  open: boolean;
  onClose: () => void;
  divisiName?: string;
  isHimakom?: boolean;
}) {
  const router = useRouter();

  const handleGoToWawancara = () => {
    router.push("/wawancara");
    onClose();
  };

  const handleLater = () => {
    onClose();
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="h-auto w-[90vw] rounded-lg bg-custom-gray-dark p-0 xxs:w-[76vw] xs:w-[56vw] sm:w-[48vw] md:w-[40vw] lg:w-[38vw] xl:w-[30vw] 2xl:w-[25vw]">
        <div className="h-14 rounded-t-lg bg-custom-black sm:h-20 lg:h-24" />

        <div className="absolute left-1/2 top-[25px] -translate-x-1/2 sm:top-[35px] lg:top-[40px]">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white bg-custom-black p-3 sm:h-20 sm:w-20 sm:p-4 lg:h-28 lg:w-28 lg:p-6">
            <Check className="h-10 w-10 text-white sm:h-12 sm:w-12 lg:h-16 lg:w-16" />
          </div>
        </div>

        <div className="mt-8 px-4 text-center *:text-custom-silver lg:mt-12">
          <p className="text-[0.9rem]">Konfirmasi Jadwal</p>
          <AlertDialogTitle className="mb-2 mt-3 text-2xl">
            Pilih Divisi Berhasil
          </AlertDialogTitle>
          {divisiName && (
            <p className="mb-2 text-sm text-white">
              Kamu telah memilih divisi{" "}
              <span className="font-semibold text-custom-blue">{divisiName}</span>{" "}
              untuk {isHimakom ? "HIMAKOM" : "OmahTI"}
            </p>
          )}
          <p className="text-[0.9rem] text-white">
            Jangan lupa mengerjakan tugas
          </p>
        </div>

        {/* Reminder Wawancara */}
        <div className="mx-4 my-3 rounded-lg border border-custom-blue/30 bg-custom-gray p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-custom-blue/20">
              <Calendar className="h-4 w-4 text-custom-blue" />
            </div>
            <div className="space-y-1 text-left">
              <p className="text-sm font-medium text-white">
                Pilih Jadwal Wawancara
              </p>
              <p className="text-xs text-gray-400">
                Segera pilih waktu wawancara sebelum slot penuh!
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse items-center justify-center gap-2 p-4 pt-0 xxs:flex-row sm:px-4">
          <Button
            variant="outline"
            size="lg"
            onClick={handleLater}
            className="w-full border-gray-600 bg-transparent text-[0.9rem] text-gray-300 hover:bg-gray-800 hover:text-white xxs:w-1/2"
          >
            Nanti Saja
          </Button>
          <AlertDialogAction asChild>
            <Button
              size="lg"
              onClick={handleGoToWawancara}
              className="w-full bg-custom-blue text-[0.9rem] hover:bg-custom-blue/90 xxs:w-1/2"
            >
              <Clock className="mr-2 h-4 w-4" />
              Pilih Jadwal
            </Button>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}