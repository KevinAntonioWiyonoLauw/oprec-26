"use client";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function PopupDivisiBerhasil({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
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
          <p className="text-[0.9rem]">
            Konfirmasi Jadwal
          </p>
          <AlertDialogTitle className="text-2xl mt-3 mb-2">
            Pilih Divisi Berhasil
            </AlertDialogTitle>
          <p className="mb-4 text-[0.9rem] text-white">
            Jangan lupa mengerjakan tugas
          </p>
        </div>

        <div className="flex flex-col-reverse items-center justify-center gap-2 p-4 pt-0 xxs:flex-row sm:px-4 lg:flex-row lg:pt-4">
          <AlertDialogAction asChild>
            <Button
            size={`lg`}
              onClick={onClose}
              className="w-full text-[0.9rem]"
            >
              Selesai
            </Button>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
