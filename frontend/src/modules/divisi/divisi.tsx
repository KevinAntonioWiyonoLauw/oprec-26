// components
import DivisiPilihan from "./components/DivisiPilihan";
import DivisiLengkap from "./components/DivisiLengkap";
import Wawancara from "./components/Wawancara";
import {
  getAllDivisi,
  getEnrolledDivisi,
} from "@/utils/fetch";
import { cookies } from "next/headers";

const Divisi = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  const divisi = await getAllDivisi(accessToken as string);
  const pilihanDivisi  = await getEnrolledDivisi(accessToken as string);

  return (
    <>
      <Title />
      {/* kelas yang dipilih user */}
      <DivisiPilihan pilihanDivisi={pilihanDivisi}/>

      {/* kelas lengkap omahti dan himakom */}
      <div className="mt-4 flex flex-col gap-4">
        {/* <DivisiLengkap variant="omahti" divisi={divisi.otiDivisi} /> */}
        <DivisiLengkap variant="himakom" divisi={divisi.himakomDivisi} />
      </div>

      <Wawancara />
    </>
  );
};

const Title = () => (
  <div className="mb-8">
    <h1 className="text-2xl font-semibold sm:text-4xl">Divisi</h1>
    <p className={``}>
      Kamu hanya bisa memilih{" "}
      <span className={`font-semibold`}>Dua Divisi Himakom</span>
      {/* <span className={`font-semibold`}>Dua Divisi OmahTI</span> */}
    </p>
  </div>
);

export default Divisi;
