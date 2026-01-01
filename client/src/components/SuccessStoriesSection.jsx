import Reveal from "./Reveal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Link } from "react-router-dom";

const stories = [
  {
    name: "Riya P.",
    tag: "Got Promoted",
    text: "Future40 help present confidently in meetings. My manager noticed change promoted.",
    img: "https://avatar.iran.liara.run/public",
  },
  {
    name: "Aman S.",
    tag: "Cracked Interview",
    text: "Mock interviews + speaking practice improved my confidence. I finally cracked my dream job.",
    img: "https://avatar.iran.liara.run/public/girl",
  },
  {
    name: "Kriti J.",
    tag: "Fluent Communicator",
    text: "I used to hesitate speaking English — now I talk to international clients fluently & fearlessly.",
    img: "https://avatar.iran.liara.run/public/boy",
  },
  {
    name: "Manisha K.",
    tag: "Got Promoted",
    text: "Future40 help present confidently in meetings. My manager noticed change promoted.",
    img: "https://avatar.iran.liara.run/public",
  },
  {
    name: "Manisha K.",
    tag: "Got Promoted",
    text: "Future40 help present confidently in meetings. My manager noticed change promoted.",
    img: "https://avatar.iran.liara.run/public/girl",
  },
];

export default function SuccessStoriesSection() {
  return (
    <section id="success" className="py-12 bg-slate-950 ">
      <div className="max-w-6xl mx-auto px-4 text-center w-full">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Student <span className="text-blue-400">Success Stories</span>
          </h2>
          <p className="text-slate-400 mt-2 max-w-lg mx-auto text-sm">
            Each success story reflects dedication, growth and transformation.
          </p>
        </Reveal>

        {/* SWIPER */}
        <div className="relative group">
          {/* Left Fade */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-slate-950 to-transparent z-20"></div>
          {/* Right Fade */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-slate-950 to-transparent z-20"></div>

          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            loop={true}
            allowTouchMove={false}
            speed={6000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: { slidesPerView: 1 },
              480: { slidesPerView: 2 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="linear-swiper mt-12 w-full"
          >
            {stories.map((s, index) => (
              <SwiperSlide key={index}>
                <div className="p-[2px] my-1 rounded-md bg-slate-800/40">
                  <div
                    className="rounded-md bg-slate-900 p-6 text-center hover:border-t border-white/10 hover:border-cyan-600 backdrop-blur-xl 
                                hover:scale-[1.04] transition duration-600"
                  >
                    {/* Avatar */}
                    <div className="flex justify-center">
                      <div className="relative">
                        <img
                          loading="lazy"
                          src={s.img}
                          alt={s.name}
                          className="
              w-20 h-20 rounded-full object-cover border-2 border-blue-400
              animate-pulseSoft 
            "
                        />

                        {/* Soft glow (ye neon nahi hai) */}
                        <div
                          className="
              absolute inset-0 rounded-full blur-xl 
              bg-blue-500/20
            "
                        ></div>
                      </div>
                    </div>

                    <p className="text-yellow-400 mt-3 text-lg">★ ★ ★ ★ ★</p>

                    <p className="text-slate-300 mt-3 text-sm leading-relaxed">
                      {s.text}
                    </p>

                    <h4 className="text-white font-semibold mt-4">{s.name}</h4>
                    <p className="text-[11px] text-blue-400">{s.tag}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <Reveal>
          {/* <Link
            to="/all-stories"
            className="
    mt-8 px-8 py-3 rounded-full
    border-2 border-blue-500
    text-blue-400 font-semibold
    cursor-pointer
    transition-all duration-300
    hover:scale-102 hover:text-white
    active:scale-95
  "
          >
            View All Stories
          </Link> */}
          <div className="flex justify-center mt-8">
            <Link
              to="/all-stories"
              className="
      inline-flex items-center justify-center
      px-8 py-3
      rounded-full
      border-2 border-blue-500
      text-blue-400 font-semibold
      transition-all duration-300
      hover:bg-blue-500 hover:text-white
      hover:scale-100
      active:scale-95
    "
            >
              View All Stories
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
