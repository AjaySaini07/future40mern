import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from "framer-motion";

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
    <section className="bg-slate-950 pt-8 sm:pt-12 pb-2 md:pb-5">
      <div className="mx-auto max-w-6xl px-4">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={900} // 🔥 smooth transition
          grabCursor={true} // nice UX
          loop
          className="rounded-md home-banner-swiper overflow-hidden"
        >
          {banners.map((item) => (
            <SwiperSlide key={item._id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Reveal>
                  <div className="p-1">
                    <div className="group relative rounded-md overflow-hidden border border-white/10 bg-slate-900">
                      {/* <img
                        src={item.image.url}
                        alt="Banner"
                        className="
              w-full h-[150px] sm:h-[290px] md:h-[300px]
              rounded-md object-cover
              transition-transform duration-[4500ms] ease-out
              group-hover:scale-105
            "
                      /> */}
                      <img
                        src={item.image.url}
                        alt="Banner"
                        className="
    w-full
    h-[180px] sm:h-[280px] md:h-[300px]
    rounded-md object-cover
    transition-transform duration-[4500ms] ease-out
    md:group-hover:scale-105
  "
                      />
                      {/* <img
                        src={item.image.url}
                        alt="Banner"
                        className="
    w-full aspect-[16/7]
    sm:h-[280px] md:h-[300px]
    rounded-md object-cover
    transition-transform duration-[4500ms] ease-out
    md:group-hover:scale-105
  "
                      /> */}

                      <div className="absolute inset-0 bg-black/30" />
                    </div>
                  </div>
                </Reveal>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
