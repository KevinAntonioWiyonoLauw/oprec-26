"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import { Button } from "@/components/ui/button";

// ProjectCard component
const ProjectCard = ({ divisiData }: { divisiData: any }) => (
  <div className="group/card relative h-[200px] overflow-hidden rounded-lg bg-custom-gray-dark md:h-[250px]">
    <Image
      src={divisiData.url}
      alt={divisiData.deskripsiProker}
      width={300}
      height={600}
      className="h-full w-full object-cover transition-transform duration-300 group-hover/card:scale-105"
    />
    <div className="absolute bottom-0 left-0 right-0 bg-custom-gray-dark px-3 py-1">
      <h3
        className={`text-lg font-medium ${
          divisiData.himakom ? "text-custom-blue" : "text-custom-orange"
        }`}
      >
        {divisiData.deskripsiProker}
      </h3>
    </div>
  </div>
);

// ProjectsSwiper component
interface ProjectsSwiperProps {
  divisiData: any[]; // Expecting an array of divisi data
}

export default function ProjectsSwiper({ divisiData }: ProjectsSwiperProps) {
  // If there's no divisiData or it's an empty array, return nothing
  if (!divisiData || divisiData.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3 lg:pr-0">
      <h1 className="text-lg font-semibold">
        Proyek / Program Kerja / Kegiatan
      </h1>
      <div className="relative md:px-12">
        <Button
          variant="ghost"
          className="button-prev p-0 absolute -left-0 top-1/2 z-30 hidden aspect-square w-[5vw] -translate-y-1/2 items-center justify-center rounded-md md:flex md:w-[3.2vw] xl:w-[2.5vw]"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="ghost"
          className="button-next absolute -right-0 top-1/2 z-30 hidden aspect-square w-[5vw] -translate-y-1/2 items-center justify-center rounded-md p-0 md:flex md:w-[3.2vw] xl:w-[2.5vw]"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={1.2}
          navigation={{
            prevEl: ".button-prev",
            nextEl: ".button-next",
          }}
          breakpoints={{
            640: { slidesPerView: 2.2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
          className="relative w-full mySwiper cursor-grab active:cursor-grabbing"
        >
          {divisiData.map((item: any) => (
            <SwiperSlide key={item._id?.$oid || item._id}>
              <ProjectCard divisiData={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
