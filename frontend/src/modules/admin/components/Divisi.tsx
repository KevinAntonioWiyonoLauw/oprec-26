"use client";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import DivisiCard from "./Card";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/mousewheel";

interface DivisiProps {
  variant?: "omahti" | "himakom";
}

const Divisi = ({ variant = "omahti" }: DivisiProps) => {
  return (
    <div>
      <h1 className={`mb-3 text-xl font-semibold`}>
        Divisi {variant === "omahti" ? "OmahTI" : "Himakom"}
      </h1>

      <div className="flex w-full items-center justify-between gap-2">
        {/* prev button */}
        <Button
          variant="ghost"
          className={`px-2 py-1 hover:bg-custom-gray/20 ${variant === "omahti" ? "oti-prev" : "hima-prev"}`}
        >
          <ChevronLeft
            className={`${variant === "omahti" ? "text-custom-orange" : "text-custom-lavender"}`}
            strokeWidth={3}
          />
        </Button>
        <Swiper
          className="mySwiper overflow-hidden"
          modules={[Navigation]}
          navigation={{
            prevEl: variant === "omahti" ? ".oti-prev" : ".hima-prev",
            nextEl: variant === "omahti" ? ".oti-next" : ".hima-next",
          }}
          spaceBetween={10}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            490: {
              slidesPerView: 2,
            },
            700: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
            1536: {
              slidesPerView: 5,
            },
          }}
        >
          <SwiperSlide>
            <DivisiCard variant={variant} />
          </SwiperSlide>
          <SwiperSlide>
            <DivisiCard variant={variant} />
          </SwiperSlide>
          <SwiperSlide>
            <DivisiCard variant={variant} />
          </SwiperSlide>
          <SwiperSlide>
            <DivisiCard variant={variant} />
          </SwiperSlide>
          <SwiperSlide>
            <DivisiCard variant={variant} />
          </SwiperSlide>
          <SwiperSlide>
            <DivisiCard variant={variant} />
          </SwiperSlide>
        </Swiper>

        {/* next button */}
        <Button
          variant="ghost"
          className={`px-2 py-1 hover:bg-custom-gray/20 ${variant === "omahti" ? "oti-next" : "hima-next"}`}
        >
          <ChevronRight
            className={`${variant === "omahti" ? "text-custom-orange" : "text-custom-blue"}`}
            strokeWidth={3}
          />
        </Button>
      </div>
    </div>
  );
};

export default Divisi;
