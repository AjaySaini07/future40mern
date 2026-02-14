// import useFounder from "../hooks/useFounder";
// import Reveal from "./Reveal";
// import { motion } from "framer-motion";

// export default function FounderSection() {
//   const { getFounder, getFounderLoading } = useFounder();

//   return (
//     <section
//       id="founder"
//       className="bg-slate-950 pt-12 md:pt-16 pb-2 md:pb-5 px-4"
//     >
//       <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
//         Meet Our <span className="text-blue-400">Founder</span>
//       </h2>
//       <p className="text-center text-xs sm:text-sm text-slate-400 mt-1 sm:mt-2 max-w-xl mx-auto">
//         Learn more about the visionary behind Future40 and their commitment to
//         your success.
//       </p>

//       <div className="mt-5 sm:mt-7 md:mt-9 bg-slate-950 relative overflow-hidden">
//         {/* 🔥 Background Light Blurs */}
//         <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/20 blur-2xl rounded-full -z-10" />
//         <div className="absolute bottom-10 right-20 w-56 h-56 bg-purple-500/20 blur-2xl rounded-full -z-10" />

//         <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-x-2 gap-y-5">
//           {/* 🟦 IMAGE WITH 3D DEPTH */}
//           <Reveal>
//             <div className="flex justify-center">
//               <div
//                 className="relative"
//                 // style={{ perspective: "1200px" }} // 🔥 3D depth
//               >
//                 {/* Floating Shapes */}
//                 <span className="[@media(min-width:340px)]:absolute top-2 -right-5 [@media(min-width:480px)]:-right-7 w-8 h-8 [@media(min-width:480px)]:w-12 [@media(min-width:480px)]:h-12 rounded-full bg-pink-500/40" />
//                 <span className="[@media(min-width:340px)]:absolute bottom-4 -left-4 [@media(min-width:480px)]:-left-6 w-8 h-8 [@media(min-width:480px)]:w-10 [@media(min-width:480px)]:h-10 rotate-40 bg-orange-400/70 rounded-md" />

//                 {/* 🧊 Glass Hexagon (STATIC) */}
//                 <div
//                   className="relative w-[220px] h-[220px] [@media(min-width:340px)]:w-[240px] [@media(min-width:340px)]:h-[240px] sm:w-[340px] sm:h-[380px]
//       flex items-center justify-center"
//                 >
//                   {/* Hex Frame */}
//                   <div
//                     className="absolute inset-0 hexagon
//         border-[2px] [@media(min-width:340px)]:border-[3px] rounded-md border-purple-500/70
//         bg-slate-900/20 backdrop-blur-sm"
//                   />

//                   {/* Inner Glow */}
//                   <div
//                     className="absolute inset-0 hexagon
//         bg-gradient-to-br from-purple-500/20 to-blue-500/20
//         opacity-40"
//                   />

//                   {/* 🎯 IMAGE — SAME MOTION AS BEFORE */}
//                   <motion.img
//                     src="/image.png"
//                     alt="Founder"
//                     initial={{ rotateX: 0, rotateY: 0 }}
//                     whileHover={{
//                       rotateX: -8,
//                       rotateY: 10,
//                       scale: 1.03,
//                     }}
//                     transition={{
//                       type: "spring",
//                       stiffness: 120,
//                       damping: 14,
//                     }}
//                     className="relative z-10
//         w-[210px] [@media(min-width:340px)]:w-[230px] sm:w-[320px]
//         object-cover rounded
//         transform-gpu"
//                   />

//                   {/* Soft Bottom Shadow */}
//                   <div
//                     className="absolute -bottom-6 left-1/2 -translate-x-1/2
//         w-56 h-6 bg-purple-500/30 blur-2xl opacity-60"
//                   />
//                 </div>
//               </div>
//             </div>
//           </Reveal>

//           {/* TEXT BLOCK UPGRADED */}
//           <Reveal>
//             <div className="w-full text-center lg:text-left lg:self-center">
//               {/* Heading */}
//               <h2
//                 className="text-xl sm:text-2xl md:text-3xl
//     font-bold text-white leading-snug"
//               >
//                 Ajay Saini –{" "}
//                 <span className="text-blue-400 block sm:inline">
//                   Spoken English Coach
//                 </span>
//               </h2>

//               {/* Description */}
//               <p
//                 className="
//     mt-3 sm:mt-4
//     w-full max-w-2xl
//     mx-auto lg:mx-0
//     text-center lg:text-left
//     text-sm sm:text-[15px] md:text-base
//     text-slate-300 leading-relaxed
//   "
//               >
//                 "Ajay has trained students, working professionals and business
//                 owners to speak clear, confident English. With practical
//                 speaking practice, mindset coaching & real situation based
//                 training, he creates real outcomes— interviews cracked,
//                 promotions earned & communication transformed."
//               </p>

//               {/* Details */}
//               <div
//                 className="mt-5 sm:mt-6
//     grid grid-cols-1 [@media(min-width:450px)]:grid-cols-2 sm:grid-cols-2
//     gap-4 sm:gap-6
//     text-sm sm:text-[15px]"
//               >
//                 <div>
//                   <p className="text-slate-400">Experience</p>
//                   <p className="font-semibold text-white">10+ Years</p>
//                 </div>

//                 <div>
//                   <p className="text-slate-400">Students Trained</p>
//                   <p className="font-semibold text-white">5000+</p>
//                 </div>

//                 <div>
//                   <p className="text-slate-400">Specialisation</p>
//                   <p className="font-semibold text-white">
//                     Spoken & Business English
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-slate-400">Teaching Style</p>
//                   <p className="font-semibold text-white">
//                     Friendly & Practical
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </Reveal>
//         </div>
//       </div>
//     </section>
//   );
// }

import { useEffect, useState } from "react";
import useFounder from "../hooks/useFounder";
import Reveal from "./Reveal";
import { motion } from "framer-motion";

export default function FounderSection() {
  const { getFounder, getFounderLoading } = useFounder();
  const [founder, setFounder] = useState(null);

  /* -------- FETCH FOUNDER -------- */
  useEffect(() => {
    const fetchFounder = async () => {
      const data = await getFounder();
      if (data) {
        setFounder(data);
      }
    };

    fetchFounder();
  }, []);

  return (
    <section
      id="founder"
      className="bg-slate-950 pt-12 md:pt-16 pb-2 md:pb-5 px-4"
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
        Meet Our <span className="text-blue-400">Founder</span>
      </h2>

      <p className="text-center text-xs sm:text-sm text-slate-400 mt-1 sm:mt-2 max-w-xl mx-auto">
        Learn more about the visionary behind Future40 and their commitment to
        your success.
      </p>

      <div className="mt-9 relative">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-5 lg:gap-0">
          {/* ----------- IMAGE SECTION ----------- */}
          {/* <Reveal>
            <div className="flex justify-center">
              <motion.img
                src={founder?.image.url}
                alt="Founder"
                className="w-[240px] sm:w-[320px] rounded-lg object-cover"
                whileHover={{ scale: 1.03 }}
              />
            </div>
          </Reveal> */}
          <Reveal>
            <div className="flex justify-center relative">
              {/* ===== Ambient Gradient Light ===== */}
              <div
                className="absolute w-[280px] sm:w-[360px] h-[280px] sm:h-[360px]
      bg-gradient-to-tr from-blue-500/20 via-purple-500/20 to-pink-500/20
      blur-[80px] rounded-full -z-10"
              />

              {/* ===== Premium Glass Card ===== */}
              <motion.div
                whileHover={{ y: -1 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="relative group"
              >
                {/* Animated Gradient Border */}
                <div
                  className="
        absolute inset-0 rounded-lg p-[2px]
        bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500
        opacity-70 group-hover:opacity-100
        transition duration-500
      "
                />

                {/* Glass Container */}
                <div
                  className="
        relative rounded-lg overflow-hidden
        bg-slate-900/50 backdrop-blur-xl
        border border-slate-700/50 m-0.5
        shadow-[0_10px_40px_rgba(0,0,0,0.6)]
      "
                >
                  {/* Shine Overlay */}
                  <div
                    className="
          absolute inset-0 bg-gradient-to-tr
          from-white/5 via-transparent to-transparent
          pointer-events-none
        "
                  />

                  <motion.img
                    src={founder?.image?.url}
                    alt="Founder"
                    className="
            w-[230px] h-[220px] sm:w-[300px] sm:h-[285px]
            object-contain transition-transform duration-800 ease-out hover:scale-105 transform-gpu
          "
                  />
                </div>

                {/* Bottom Soft Shadow */}
                <div
                  className="
        absolute -bottom-8 left-1/2 -translate-x-1/2
        w-48 h-10
        bg-blue-500/20 blur-3xl opacity-60
      "
                />
              </motion.div>

              {/* Floating Subtle Accent */}
              <motion.span
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="
        absolute -top-6 right-10
        w-5 h-5 rounded-full
        bg-pink-500/50 blur-md
      "
              />
            </div>
          </Reveal>

          {/* ---------------------- TEXT SECTION ---------------------- */}
          <Reveal>
            <div className="w-full text-center lg:text-left lg:self-center">
              {getFounderLoading ? (
                <p className="text-slate-400">Loading founder info...</p>
              ) : (
                <>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                    {founder?.name || "Ajay Saini"} –{" "}
                    <span className="text-blue-400 block sm:inline">
                      {founder?.title || "Spoken English Coach"}
                    </span>
                  </h2>

                  <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                    {founder?.bio}
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-6 text-sm">
                    <div>
                      <p className="text-slate-400">Experience</p>
                      <p className="font-semibold text-white">
                        {founder?.experienceYears}
                        {"+ Years"}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-400">Students Trained</p>
                      <p className="font-semibold text-white">
                        {founder?.studentsTrained}
                        {"+"}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-400">Specialisation</p>
                      <p className="font-semibold text-white">
                        {founder?.specialization || "Spoken & Business English"}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-400">Teaching Style</p>
                      <p className="font-semibold text-white">
                        {founder?.teachingStyle || "Friendly & Practical"}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
