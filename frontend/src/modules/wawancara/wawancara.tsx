import { cookies } from "next/headers";
import { getAllWawancara, getEnrolledDivisi, getPilihanWawancara } from "@/utils/fetch";
import { getCurrentUser } from "@/utils/auth";
import WaktuPilihan from "./components/WaktuPilihan";
import PilihanWaktu from "./components/PilihanJam";

const Divisi = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  const user = await getCurrentUser();
  const enrolledSlugHima = user?.enrolledSlugHima;
  const enrolledSlugOti = user?.enrolledSlugOti;
  const { wawancaraHimakom, wawancaraOti } = await getAllWawancara(accessToken as string);
  const { filteredHima, filteredOti } = await getPilihanWawancara(accessToken as string);
  const divisiPilihan = await getEnrolledDivisi(accessToken as string);
  
  // Filter divisi pilihan dengan null checking
  const validDivisiPilihan = (divisiPilihan || []).filter(
    (divisi: any) => divisi && divisi.divisiId && divisi.divisiId.himakom !== undefined
  );
  
  const divisiPilihanFilteredHima = validDivisiPilihan
    .filter((divisi: any) => divisi.divisiId.himakom === true).length > 0;
  const divisiPilihanFilteredOti = validDivisiPilihan
    .filter((divisi: any) => divisi.divisiId.himakom === false).length > 0;
  
  return (
    <>
      <Title />
      <WaktuPilihan 
        filteredHima={filteredHima} 
        slugOti={enrolledSlugOti} 
        slugHima={enrolledSlugHima} 
        filteredOti={filteredOti}
      />
      <PilihanWaktu 
        slugOti={enrolledSlugOti} 
        slugHima={enrolledSlugHima} 
        pilihanDivisiHima={divisiPilihanFilteredHima} 
        pilihanDivisiOti={divisiPilihanFilteredOti} 
        wawancaraHimakom={wawancaraHimakom} 
        wawancaraOti={wawancaraOti} 
        pilihanHimakom={filteredHima} 
        pilihanOti={filteredOti} 
      />
    </>
  );
}

const Title = () => (
  <div className="mb-8">
    <h1 className="text-2xl font-semibold sm:text-4xl">Wawancara</h1>
    <p className={``}>
      Kamu hanya bisa memilih <span className={`font-semibold`}>Satu jadwal Himakom</span>
      {/* <span className={`font-semibold`}>Satu jadwal OmahTI</span> */}
    </p>
  </div>
);

export default Divisi;