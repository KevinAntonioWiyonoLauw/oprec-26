import { ArrowRight } from "lucide-react";
import Image from "next/image";
import omahti from "@/assets/beranda/about/omahti.webp";
import himakom from "@/assets/beranda/about/himakom.webp";
import Link from "next/link";

interface AboutProps {
  category: "Himakom" | "OmahTI";
}

const About: React.FC = () => {
  return (
    <div className="flex w-full flex-col gap-3 lg:flex-row lg:gap-4">
      <AboutCard category="OmahTI" />
      <AboutCard category="Himakom" />
    </div>
  );
};

const AboutCard: React.FC<AboutProps> = ({ category }) => {
  const href = `/${category.toLowerCase()}`;
  return (
    <div
      data-gsap={`${category === "Himakom" ? "left" : "right"}`}
      className={`relative h-40 w-full overflow-clip rounded-3xl bg-gradient-to-b p-6 xs:h-56 sm:h-80 xl:h-96 ${
        category === "Himakom"
          ? "from-custom-blue from-50%"
          : "from-custom-orange from-50%"
      } to-custom-gray-dark`}
    >
      <Image
        className={`rounded object-cover z-0`}
        sizes="100%"
        src={category === "OmahTI" ? omahti : himakom}
        alt="Anggota OmahTI dan Himakom"
        fill
      />
      <div className="absolute bottom-4 left-4 z-20">
        <h2 className="text-xl font-semibold text-custom-silver xxs:text-2xl xs:text-3xl sm:text-4xl xl:text-5xl">
          {category}
        </h2>
        <p className="text-xxs font-medium text-custom-silver xxs:text-xs xs:text-sm sm:text-base xl:text-lg">
          {category === "Himakom"
            ? "Himpunan Mahasiswa Ilmu Komputer"
            : "Organisasi Mahasiswa Ahli Teknologi Informasi"}
        </p>
      </div>
      <Link href={href} className="z-20">
        <button className="absolute bottom-4 right-4 z-20 flex aspect-square items-center justify-center rounded-xl bg-custom-silver p-2 transition-all hover:scale-105 xs:p-4">
          <ArrowRight className="h-4 w-4 text-custom-black xxs:h-6 xxs:w-6" />
        </button>
      </Link>

      {/* gradient overlay */}
      <div className="inset-0 absolute bg-gradient-to-t from-custom-gray/80 via-custom-gray/10 z-10 to-transparent" />
    </div>
  );
};

export default About;
