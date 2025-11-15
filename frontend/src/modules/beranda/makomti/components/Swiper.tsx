"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';

// Galeri
import himakom1 from "@/assets/beranda/about/slug/galeri/himakom-1.webp";
import himakom2 from "@/assets/beranda/about/slug/galeri/himakom-2.webp";
import himakom3 from "@/assets/beranda/about/slug/galeri/himakom-3.webp";
import himakom4 from "@/assets/beranda/about/slug/galeri/himakom-4.webp";
import himakom5 from "@/assets/beranda/about/slug/galeri/himakom-5.webp";
import himakom6 from "@/assets/beranda/about/slug/galeri/himakom-6.webp";
import himakom7 from "@/assets/beranda/about/slug/galeri/himakom-7.webp";
import himakom8 from "@/assets/beranda/about/slug/galeri/himakom-8.webp";
import himakom9 from "@/assets/beranda/about/slug/galeri/himakom-9.webp";
import himakom10 from "@/assets/beranda/about/slug/galeri/himakom-10.webp";
import omahti1 from "@/assets/beranda/about/slug/galeri/omahti-1.webp";
import omahti2 from "@/assets/beranda/about/slug/galeri/omahti-2.webp";
import omahti3 from "@/assets/beranda/about/slug/galeri/omahti-3.webp";

// Project type definition
interface Project {
  id: number;
  image: string;
  makomti: string;
}

// Example projects
const projects: Project[] = [
  // Himakom projects
  { id: 1, image: himakom1.src, makomti: 'himakom' },
  { id: 2, image: himakom2.src, makomti: 'himakom' },
  { id: 3, image: himakom3.src, makomti: 'himakom' },
  { id: 4, image: himakom4.src, makomti: 'himakom' },
  { id: 5, image: himakom5.src, makomti: 'himakom' },
  { id: 6, image: himakom6.src, makomti: 'himakom' },
  { id: 7, image: himakom7.src, makomti: 'himakom' },
  { id: 8, image: himakom8.src, makomti: 'himakom' },
  { id: 9, image: himakom9.src, makomti: 'himakom' },
  { id: 10, image: himakom10.src, makomti: 'himakom' },
  // OmahTI projects
  { id: 11, image: omahti1.src, makomti: 'omahti' },
  { id: 12, image: omahti2.src, makomti: 'omahti' },
  { id: 13, image: omahti3.src, makomti: 'omahti' },
];

// ProjectCard component
const ProjectCard = ({ project }: { project: Project; divisiData: { makomti: string } }) => (
  <div className="relative overflow-hidden rounded-lg bg-custom-gray-dark h-[200px] md:h-[250px] group/card">
    <Image
      src={project.image}
      alt={`${project.makomti} project ${project.id}`}
      width={1100}
      height={600}
      className="w-full h-full object-cover transition-transform duration-300 group-hover/card:scale-105"
    />
  </div>
);

// ProjectsSwiper component
interface ProjectsSwiperProps {
  divisiData: {
    makomti: string;
  };
}

export default function ProjectsSwiper({ divisiData }: ProjectsSwiperProps) {
  const [isMdScreen, setIsMdScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsMdScreen(window.innerWidth >= 768);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Filter projects based on makomti value from divisiData
  const filteredProjects = projects.filter(
    project => project.makomti === divisiData.makomti
  );

  return (
    <div className="space-y-3 xl:px-0 pl-[min(5vw,32px)] md:px-[min(5vw,32px)]">
      <h1 className="font-semibold text-lg">
        Galeri Kegiatan {divisiData.makomti === 'himakom' ? 'Himakom' : 'OmahTI'}
      </h1>
      <div className="relative md:px-12">
        <button
          type="button"
          className="button-prev absolute -left-0 top-1/2 -translate-y-1/2 hidden aspect-square w-[5vw] items-center justify-center rounded-full md:flex md:w-[3.2vw] xl:w-[2.5vw] z-[999]"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          className="button-next absolute -right-0 top-1/2 -translate-y-1/2 hidden aspect-square w-[5vw] items-center justify-center rounded-full md:flex md:w-[3.2vw] xl:w-[2.5vw] z-[999]"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={1.2}
          navigation={{
            prevEl: '.button-prev',
            nextEl: '.button-next',
          }}
          breakpoints={{
            640: { slidesPerView: 2.2, spaceBetween: 20 },
            1024: { slidesPerView: 2, spaceBetween: 24 },
          }}
          className="w-full relative"
        >
          {filteredProjects.map((project) => (
            <SwiperSlide key={project.id}>
              <ProjectCard project={project} divisiData={divisiData} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}