import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Reveal from "./Reveal";
import useBanners from "../hooks/useBanners";

export default function Banners() {
  const { banners, loading } = useBanners();

  if (loading) {
    return (
      <section className="bg-slate-950 py-12">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <p className="text-slate-400 text-sm">Loading banners...</p>
        </div>
      </section>
    );
  }

  if (!banners.length) {
    return null; // no banners → hide section
  }

  return (
    <section className="bg-slate-950 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          loop
          className="rounded-md"
        >
          {banners.map((item) => (
            <SwiperSlide key={item._id}>
              <Reveal>
                <div className="p-1">
                  <div
                    className="
                      relative rounded-md
                      overflow-hidden
                      border border-white/10
                      bg-slate-900
                    "
                  >
                    {/* IMAGE BANNER */}
                    <img
                      src={item.image.url}
                      alt="Banner"
                      className="
                        w-full h-[280px] sm:h-[290px] md:h-[300px]
                        object-cover
                      "
                    />

                    {/* OVERLAY (optional – remove if not needed) */}
                    <div className="absolute inset-0 bg-black/30" />
                  </div>
                </div>
              </Reveal>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
