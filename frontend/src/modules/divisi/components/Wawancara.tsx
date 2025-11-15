import { Button } from "@/components/ui/button";
import Link from "next/link";

const Wawancara = () => (
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

export default Wawancara;
