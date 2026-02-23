// import Reveal from "./Reveal";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import "swiper/css";
// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { useState } from "react";

// const stories = [
//   {
//     name: "Riya P.",
//     tag: "Got Promoted",
//     text: "Future40 help present confidently in meetings. My manager noticed change promoted.",
//     img: "https://avatar.iran.liara.run/public",
//   },
//   {
//     name: "Aman S.",
//     tag: "Cracked Interview",
//     text: "Mock interviews + speaking practice improved my confidence. I finally cracked my dream job.",
//     img: "https://avatar.iran.liara.run/public/girl",
//   },
//   {
//     name: "Kriti J.",
//     tag: "Fluent Communicator",
//     text: "I used to hesitate speaking English now I talk to international clients fluently & fearlessly.",
//     img: "https://avatar.iran.liara.run/public/boy",
//   },
//   {
//     name: "Manisha K.",
//     tag: "Got Promoted",
//     text: "Future40 help present confidently in meetings. My manager noticed change promoted.",
//     img: "https://avatar.iran.liara.run/public",
//   },
//   {
//     name: "Manisha K.",
//     tag: "Got Promoted",
//     text: "Future40 help present confidently in meetings. My manager noticed change promoted.",
//     img: "https://avatar.iran.liara.run/public/girl",
//   },
// ];

// export default function SuccessStoriesSection() {
//   const [selectedStory, setSelectedStory] = useState(null);

//   return (
//     <section
//       id="success"
//       className="pt-12 md:pt-16 pb-2 md:pb-5 px-4 bg-slate-950"
//     >
//       <div className="max-w-6xl mx-auto text-center w-full">
//         <Reveal>
//           <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
//             Student <span className="text-blue-400">Success Stories</span>
//           </h2>
//           <p className="text-slate-400 max-w-lg mx-auto text-xs sm:text-sm mt-1 sm:mt-2">
//             Each success story reflects dedication, growth and transformation.
//           </p>
//         </Reveal>

//         {/* SWIPER */}
//         <div className="relative group">
//           {/* Left Fade */}
//           <div className="pointer-events-none absolute left-0 top-0 h-full [@media(min-width:250px)]:w-3 [@media(min-width:480px)]:w-6 [@media(min-width:640px)]::w-9 bg-gradient-to-r from-slate-950 to-transparent [@media(min-width:250px)]:z-10 md:z-20"></div>
//           {/* Right Fade */}
//           <div className="pointer-events-none absolute right-0 top-0 h-full [@media(min-width:250px)]:w-3 [@media(min-width:480px)]:w-6 [@media(min-width:640px)]::w-9 bg-gradient-to-l from-slate-950 to-transparent [@media(min-width:250px)]:z-10 md:z-20"></div>

//           <Swiper
//             modules={[Autoplay]}
//             spaceBetween={16}
//             slidesPerView={1}
//             loop={true}
//             allowTouchMove={false}
//             speed={6000}
//             autoplay={{
//               delay: 0,
//               disableOnInteraction: false,
//             }}
//             breakpoints={{
//               320: { slidesPerView: 1 },
//               480: { slidesPerView: 2 },
//               640: { slidesPerView: 2 },
//               768: { slidesPerView: 3 },
//               1024: { slidesPerView: 4 },
//             }}
//             className="linear-swiper mt-5 sm:mt-7 md:mt-8 w-full"
//           >
//             {stories.map((s, index) => (
//               <SwiperSlide key={index}>
//                 <div className="p-0.5 my-1 rounded-md bg-slate-800/40">
//                   {/* <div
//                     className="rounded-md bg-slate-900 p-4 text-center hover:border border-white/10 hover:border-cyan-600 backdrop-blur-xl
//                                 hover:scale-[1.02] transition duration-600"
//                   > */}
//                   <div
//                     className="
//     rounded-md bg-slate-900 p-4 text-center
//     border border-white/10
//     backdrop-blur-xl

//     transform-gpu
//     transition-all duration-500 ease-out

//     hover:scale-[1.02]
//     hover:border-cyan-500/80
//     hover:shadow-lg hover:shadow-cyan-500/20
//   "
//                   >
//                     {/* Avatar */}
//                     <div className="flex justify-center">
//                       <div className="relative">
//                         <img
//                           loading="lazy"
//                           src={s.img}
//                           alt={s.name}
//                           className="
//               w-20 h-20 rounded-full object-cover border-2 border-blue-400
//               animate-pulseSoft
//             "
//                         />

//                         {/* Soft glow (ye neon nahi hai) */}
//                         <div
//                           className="
//               absolute inset-0 rounded-full blur-xl
//               bg-blue-500/20
//             "
//                         ></div>
//                       </div>
//                     </div>

//                     <p className="text-yellow-400 mt-3 text-lg">★ ★ ★ ★ ★</p>

//                     <p className="text-slate-300 mt-3 text-sm leading-relaxed">
//                       {s.text}
//                     </p>

//                     <h4 className="text-white font-semibold mt-4">{s.name}</h4>
//                     <p className="text-[11px] text-blue-400">{s.tag}</p>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>

//         {/* View All Stories */}
//         <Reveal>
//           <div className="flex justify-center mt-8 mb-6 sm:mb-4">
//             <Link
//               to="/all-stories"
//               className="
//       inline-flex items-center justify-center
//       px-8 py-3
//       text-xs sm:text-sm md:text-base
//       rounded-full
//       border-2 border-blue-500
//       text-blue-400 font-semibold
//       transition-all duration-300
//       hover:bg-blue-500 hover:text-white
//       hover:scale-100
//       active:scale-95
//     "
//             >
//               View All Stories
//             </Link>
//           </div>
//         </Reveal>
//       </div>

//       {/* Modal – Synced Reveal */}
//       <AnimatePresence>
//         {selectedStory && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setSelectedStory(null)}
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
//           >
//             <motion.div
//               initial={{ scale: 0.9, y: 30 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.9, y: 30 }}
//               transition={{ duration: 0.3, ease: "easeOut" }}
//               onClick={(e) => e.stopPropagation()}
//               className="relative w-full max-w-md sm:max-w-lg rounded-lg bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700 p-7 shadow-2xl"
//             >
//               <button
//                 onClick={() => setSelectedStory(null)}
//                 className="absolute top-4 right-4 text-slate-400 hover:text-white transition-transform duration-300 hover:scale-110"
//               >
//                 <CrossIcon size={24} />
//               </button>

//               {/* Photo */}
//               <div className="flex justify-center -mt-18 sm:-mt-21 mb-2">
//                 <img
//                   src={selectedStory.photo.url}
//                   alt={selectedStory.name}
//                   className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border-4 border-slate-700 bg-slate-900"
//                 />
//               </div>
//               {/* Avatar Section */}
//               {/* <div className="flex justify-center mb-4">
//                       <div className="relative">
//                         <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl" />

//                         <img
//                           src={selectedStory.photo.url}
//                           alt={selectedStory.name}
//                           className="
//                 relative w-20 h-20 sm:w-28 sm:h-28
//                 rounded-full
//                 border-4 border-slate-800
//                 object-cover
//                 shadow-lg
//               "
//                         />
//                       </div>
//                     </div> */}

//               {/* Rating */}
//               <div className="flex justify-center gap-1 mb-2">
//                 {Array.from({ length: 5 }).map((_, index) => (
//                   <StarIcon
//                     key={index}
//                     className={
//                       index < selectedStory.rating
//                         ? "text-yellow-400"
//                         : "text-slate-600"
//                     }
//                   />
//                 ))}
//               </div>

//               <div className="text-center">
//                 <div className="flex flex-wrap justify-center items-center gap-1 mb-2 text-center">
//                   {/* Name */}
//                   <h3 className="text-sm sm:text-md md:text-lg font-semibold text-white">
//                     {selectedStory.name}
//                   </h3>

//                   {/* Icon */}
//                   {/* <FaMedal className="text-red-500 drop-shadow-sm text-sm sm:text-lg md:text-xl" /> */}
//                   <span>🏆</span>

//                   {/* Achievement */}
//                   <p className="text-sm sm:text-md md:text-lg font-semibold text-sky-400">
//                     {selectedStory.achievement}
//                   </p>
//                 </div>

//                 {/* Divider */}
//                 <div className="h-px w-full bg-slate-700/60 mb-3" />

//                 {/* Story */}
//                 <div
//                   className="max-h-30 sm:max-h-50 overflow-y-auto scrollbar-slim
//         pr-2 scroll-smooth"
//                 >
//                   <p className="text-xs sm:text-sm text-slate-300 leading-normal">
//                     “{selectedStory.story}”
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// }

import Reveal from "./Reveal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useSuccessStory } from "../hooks/useSuccessStory";
import { useEffect } from "react";
import { AwardIcon, CrossIcon, StarIcon } from "../icons/Icons";

export default function SuccessStoriesSection() {
  const [selectedStory, setSelectedStory] = useState(null);
  const [stories, setStories] = useState([]);
  const { fetchStory, fetchLoading } = useSuccessStory();

  useEffect(() => {
    const loadStories = async () => {
      const res = await fetchStory({ page: 1, limit: 10 });

      if (res?.success) {
        setStories(res.stories || []);
      }
    };

    loadStories();
  }, []);

  return (
    <section
      id="success"
      className="pt-12 md:pt-16 pb-2 md:pb-5 px-4 bg-slate-950"
    >
      <div className="max-w-6xl mx-auto text-center w-full">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
            Student <span className="text-blue-400">Success Stories</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto text-xs sm:text-sm mt-1 sm:mt-2">
            Each success story reflects dedication, growth and transformation.
          </p>
        </Reveal>

        {/* SWIPER */}
        <div className="relative group">
          {/* Left Fade */}
          <div className="pointer-events-none absolute left-0 top-0 h-full [@media(min-width:250px)]:w-3 [@media(min-width:480px)]:w-6 [@media(min-width:640px)]::w-9 bg-gradient-to-r from-slate-950 to-transparent [@media(min-width:250px)]:z-10 md:z-20"></div>
          {/* Right Fade */}
          <div className="pointer-events-none absolute right-0 top-0 h-full [@media(min-width:250px)]:w-3 [@media(min-width:480px)]:w-6 [@media(min-width:640px)]::w-9 bg-gradient-to-l from-slate-950 to-transparent [@media(min-width:250px)]:z-10 md:z-20"></div>

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
            className="linear-swiper mt-5 sm:mt-7 md:mt-8 w-full"
          >
            {stories.map((s) => (
              <SwiperSlide key={s._id}>
                <div className="p-[1px] my-2 rounded-md bg-gradient-to-b from-slate-700/40 to-slate-800/30">
                  <div
                    onClick={() => setSelectedStory(s)}
                    className="
        rounded-md
        bg-slate-900/90
        px-4.5 py-3 sm:py-4
        text-center
        border border-slate-800
        backdrop-blur-md
        transition-all duration-300
        hover:-translate-y-1
        hover:border-cyan-500/40
        hover:shadow-xl hover:shadow-cyan-500/10
        cursor-pointer
      "
                  >
                    {/* Avatar */}
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-2xl"></div>

                        <img
                          loading="lazy"
                          src={s?.photo?.url}
                          alt={s?.name}
                          className="
              relative
              w-20 h-20
              rounded-full
              object-cover
              border-2 border-slate-700
              shadow-md
            "
                        />
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex justify-center gap-1 mt-2">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <StarIcon
                          key={index}
                          className={
                            index < s.rating
                              ? "text-yellow-400 drop-shadow-[0_0_3px_rgba(250,204,21,0.5)]"
                              : "text-slate-700"
                          }
                        />
                      ))}
                    </div>

                    {/* Name */}
                    <h4 className="text-sm sm:text-base text-white tracking-wide">
                      {s.name}
                    </h4>

                    {/* Line */}
                    <div className="w-10 h-[2px] mx-auto mt-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />

                    {/* Story */}
                    <div
                      className="relative mt-2 px-3 py-1.5
    bg-slate-800/40
    border border-slate-700/50
    rounded-md backdrop-blur-sm"
                    >
                      <span className="absolute -top-3 left-3 text-3xl text-blue-500/40 font-serif">
                        “
                      </span>

                      <p
                        className="
            text-slate-300
    text-xs sm:text-sm
    leading-normal
    tracking-normal
    text-justify
    line-clamp-4"
                      >
                        {s.story}
                      </p>

                      <span className="absolute -bottom-7 right-3 text-3xl text-blue-500/40 font-serif">
                        ”
                      </span>
                    </div>

                    {/* Achievement */}
                    <div className="w-full flex justify-center mt-2">
                      <span className=" px-3 py-0.5 rounded-full text-[11px] font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20">
                        {s.achievement}
                      </span>
                    </div>

                    {/* Divider Accent */}
                    {/* <div className="w-10 h-[2px] mx-auto mt-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" /> */}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* View All Stories Button */}
        <Reveal>
          <div className="flex justify-center mt-8 mb-6 sm:mb-4">
            <Link
              to="/all-stories"
              className="
      inline-flex items-center justify-center
      px-8 py-3
      text-xs sm:text-sm md:text-base
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

      {/* Modal – Synced Reveal */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStory(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg sm:max-w-xl rounded-md bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700 p-4 sm:p-6 shadow-2xl"
            >
              <button
                onClick={() => setSelectedStory(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-transform duration-300 hover:scale-110"
              >
                <CrossIcon className="text-xl sm:text-2xl" />
              </button>

              {/* Photo */}
              <div className="flex justify-center -mt-14 sm:-mt-20 mb-2">
                <img
                  src={selectedStory.photo.url}
                  alt={selectedStory.name}
                  className="w-20 h-20 sm:w-28 sm:h-28 bg-cover text-sm rounded-full border-4 border-slate-700 bg-slate-900"
                />
              </div>

              {/* Rating */}
              <div className="flex justify-center text-sm sm:text-base gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon
                    key={index}
                    className={
                      index < selectedStory.rating
                        ? "text-yellow-400 drop-shadow-[0_0_3px_rgba(250,204,21,0.5)]"
                        : "text-slate-600"
                    }
                  />
                ))}
              </div>

              {/* Name */}
              <h3
                className="
    text-md sm:text-lg font-semibold
    text-transparent bg-clip-text text-center
    bg-gradient-to-r from-blue-400 to-cyan-400
    tracking-wide
  "
              >
                {selectedStory.name}
              </h3>

              {/* Achievement Badge */}
              <div className="flex justify-center">
                <span
                  className="flex items-center gap-2 px-4 py-1 rounded-full mb-1.5
  text-xs sm:text-sm font-medium
  bg-gradient-to-r from-sky-500/10 to-blue-500/10
  text-sky-400
  border border-sky-500/20
"
                >
                  <AwardIcon className="text-sky-400 text-sm drop-shadow-sm" />
                  {selectedStory.achievement}
                  <AwardIcon className="text-sky-400 text-sm drop-shadow-sm" />
                </span>
              </div>

              {/* <div className="w-full h-[2px] mx-auto mb-1.5 bg-gradient-to-r from-blue-900/50 to-cyan-800/50 rounded-full" /> */}

              {/* Accent Divider */}
              {/* <div
                  className="w-16 h-1 mx-auto rounded-full 
    bg-gradient-to-r from-blue-500 to-cyan-400"
                /> */}

              {/* Story Box */}
              <div
                className="
    max-h-40 sm:max-h-52 overflow-y-auto scrollbar-slim
    pl-3 pr-1.5 py-2.5
    bg-slate-800/20
    border border-slate-700/30
    rounded-sm
    backdrop-blur-sm
    relative
  "
              >
                <p
                  className="
        text-xs sm:text-sm md:text-base text-slate-300
      leading-normal tracking-wide"
                >
                  {selectedStory.story}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
