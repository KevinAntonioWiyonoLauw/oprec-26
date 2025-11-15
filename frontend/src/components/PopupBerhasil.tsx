import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function PopupBerhasil({
  open,
  onBerhasilClose,
  successMessage,
}: {
  open: boolean;
  onBerhasilClose: () => void;
  successMessage?: string;
}) {
  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <Button className="w-20 sm:w-24 lg:w-32 text-sm lg:text-md tracking-wide">
          Pilih
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-lg bg-custom-gray-dark p-0 w-[90vw] xxs:w-[75vw] xs:w-[55vw] md:w-[40vw] lg:w-[38vw] xl:w-[30vw] 2xl:w-[25vw] h-auto">
        
        {/* Header Background */}
        <div className="h-14 sm:h-20 lg:h-24 bg-custom-black rounded-t-lg" />

        {/* Icon in Center */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[25px] sm:top-[35px] lg:top-[40px]">
          <div className="relative bg-custom-black rounded-full p-3 sm:p-4 lg:p-6 border border-white w-16 sm:w-20 lg:w-28 h-16 sm:h-20 lg:h-28 flex items-center justify-center">
            <Check className="h-10 w-10 text-white sm:h-12 sm:w-12 lg:h-16 lg:w-16" />
          </div>
        </div>

        {/* Content Section */}
        <div className="text-center mt-6 sm:mt-8 lg:mt-16 px-4">
          <p className="text-white text-[0.9rem] lg:text-base mb-0 sm:mb-1 lg:mb-2">
            Request Berhasil
          </p>
          <h2 className="text-white text-lg xs:text-lg sm:text-xl lg:text-2xl font-bold mb-0 sm:mb-1 lg:mb-2">
            {successMessage || "Request anda aneh, jika anda melihat pesan ini mohon hubungi panitia"}
          </h2>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse xxs:flex-row lg:flex-row justify-center items-center gap-2 p-4 pt-0 lg:pt-4 sm:px-4">
          <AlertDialogAction asChild>
            <Button
              onClick={onBerhasilClose}
              className="w-full h-8 sm:h-10 text-[0.9rem]"
            >
              Tutup
            </Button>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
