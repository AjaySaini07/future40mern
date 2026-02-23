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
import {
  FaBriefcase,
  FaUsers,
  FaBullseye,
  FaChalkboardTeacher,
} from "react-icons/fa";

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

      <section className="mt-9 relative overflow-hidden bg-slate-950">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-6 items-center">
          {/* LEFT IMAGE (IMAGE SECTION) */}
          <Reveal>
            <div className="lg:col-span-1 flex justify-center relative">
              {/* Ambient Gradient Light */}
              <div
                className="absolute
      bg-gradient-to-tr from-blue-500/20 via-purple-500/20 to-pink-500/20
      blur-[80px] rounded-full -z-10"
              />

              {/* Premium Glass Card */}
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
            w-[230px] sm:w-[310px]
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

          {/* RIGHT CONTENT (TEXT SECTION) */}
          <div className="lg:col-span-2 text-center lg:text-left">
            {getFounderLoading ? (
              <p className="text-slate-400">Loading founder info...</p>
            ) : (
              <>
                {/* Founder Name */}
                <h2 className="lg:text-center text-xl sm:text-2xl font-semibold text-white">
                  {founder?.name || "Ajay Saini"} -{" "}
                  <span className="text-cyan-400 block sm:inline">
                    {founder?.title || "Spoken English Coach"}
                  </span>
                </h2>

                {/* Founder Bio */}
                {/* <p className="mt-2 lg:mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                    {founder?.bio}
                  </p> */}
                <div
                  className="relative mt-3 px-4 py-3
          bg-slate-800/10 border border-slate-900
          rounded-md backdrop-blur-sm"
                >
                  <span className="absolute -top-2 left-3 text-5xl text-blue-500/40 font-serif">
                    “
                  </span>

                  <p
                    className="text-slate-300 text-sm sm:text-base
            leading-normal text-start tracking-wide"
                  >
                    {founder?.bio}
                  </p>

                  <span className="absolute -bottom-9 right-3 text-5xl text-blue-500/40 font-serif">
                    ”
                  </span>
                </div>

                {/* Founder Info */}
                <div className="mt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {/* Experience */}
                    <div className="rounded-md bg-slate-900/70 border border-slate-800 p-3 sm:p-4 hover:border-blue-500/40 transition-all duration-300">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 text-2xl">
                          <FaBriefcase />
                        </div>

                        <div className="text-start">
                          <p className="text-xs uppercase tracking-wider text-slate-400">
                            Experience
                          </p>
                          <p className="mt-0.5 text-md sm:font-semibold text-white">
                            {founder?.experienceYears}
                            <span className="text-blue-400 ml-1">+ Years</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Students */}
                    <div className="rounded-md bg-slate-900/70 border border-slate-800 p-3 sm:p-4 hover:border-emerald-500/40 transition-all duration-300">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 text-2xl">
                          <FaUsers />
                        </div>

                        <div className="text-start">
                          <p className="text-xs uppercase tracking-wider text-slate-400">
                            Students Trained
                          </p>
                          <p className="mt-0.5 text-md sm:font-semibold text-white">
                            {founder?.studentsTrained}
                            <span className="text-emerald-400 ml-1">+</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Teaching Style */}
                    <div className="rounded-md bg-slate-900/70 border border-slate-800 p-3 sm:p-4 hover:border-purple-500/40 transition-all duration-300">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 text-2xl">
                          <FaChalkboardTeacher />
                        </div>

                        <div className="text-start">
                          <p className="text-xs uppercase tracking-wider text-slate-400">
                            Teaching Style
                          </p>
                          <p className="mt-0.5 text-md sm:font-medium text-white">
                            {founder?.teachingStyle || "Friendly & Practical"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Specialisation */}
                    <div className="rounded-md bg-slate-900/70 border border-slate-800 p-3 sm:p-4 hover:border-cyan-500/40 transition-all duration-300">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 text-2xl">
                          <FaBullseye />
                        </div>

                        <div className="text-start">
                          <p className="text-xs uppercase tracking-wider text-slate-400">
                            Specialisation
                          </p>
                          <p className="mt-0.5 text-md sm:font-medium text-white">
                            {founder?.specialization ||
                              "Spoken & Business English"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </section>
  );
}
