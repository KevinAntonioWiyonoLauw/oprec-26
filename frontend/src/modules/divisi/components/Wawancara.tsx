import { Button } from "@/components/ui/button";
import Link from "next/link";

interface WawancaraProps {
  filteredHima?: any;
  filteredOti?: any;
}

const GOOGLE_MEET_LINK = "https://meet.google.com/asq-vzkm-nta";

const Wawancara = ({ filteredHima, filteredOti }: WawancaraProps) => {
  const sudahPilihWawancara = filteredHima || filteredOti;

  if (sudahPilihWawancara) {
    return (
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-lg bg-custom-gray-dark p-4">
        <h1 className="text-pretty text-center sm:text-start ml-2">
          Kamu sudah memilih jadwal wawancara. Klik tombol di samping untuk masuk ke ruang wawancara
        </h1>
        <Link href={GOOGLE_MEET_LINK} target="_blank" rel="noopener noreferrer">
          <Button variant={`white`} size={`lg`} className="w-full shrink-0 sm:px-10 sm:py-6 text-center text-base font-semibold text-custom-black lg:w-fit">
            Masuk Wawancara
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-lg bg-custom-gray-dark p-4">
      <h1 className="text-pretty text-center sm:text-start ml-2">
        Setelah menyelesaikan tugas, jangan lupa untuk mengisi jadwal wawancara
      </h1>
      <Link href={`wawancara`}>
        <Button variant={`white`} size={`lg`} className="w-full shrink-0 sm:px-10 sm:py-6 text-center text-base font-semibold text-custom-black lg:w-fit">
          Halaman Wawancara
        </Button>
      </Link>
    </div>
  );
};

export default Wawancara;
