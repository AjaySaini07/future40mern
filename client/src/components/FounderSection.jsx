import Reveal from "./Reveal";
import { motion } from "framer-motion";

export default function FounderSection() {
  return (
    <section id="founder" className="bg-slate-950 py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center">
        Meet Our <span className="text-blue-400">Founder</span>
      </h2>
      <p className="text-center text-sm text-slate-400 mt-2 max-w-2xl mx-auto">
        Learn more about the visionary behind Future40 and their commitment to
        your success.
      </p>

      <div className="mt-10 bg-slate-950 relative overflow-hidden">
        {/* 🔥 Background Light Blurs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/20 blur-2xl rounded-full -z-10" />
        <div className="absolute bottom-10 right-20 w-56 h-56 bg-purple-500/20 blur-2xl rounded-full -z-10" />

        {/* <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-14 items-center"> */}
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-2">
          {/* 🟦 IMAGE WITH 3D DEPTH */}
          {/* <Reveal>
            <div className="flex justify-center">
              <div
                className="relative group"
                style={{ perspective: "1000px" }} // enables 3D rotation
              >
                <div
                  className="rounded-2xl border border-slate-700 shadow-2xl
                           transform-gpu transition-transform duration-500 group-hover:rotate-y-6 group-hover:rotate-x-3"
                >
                  <img
                    src="https://media.licdn.com/dms/image/v2/D4D03AQEJSc8sxmcMbg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1715872424793?e=1769040000&v=beta&t=4X2u_mV0UHFWKLAwWEcfXN5ncNxrPkbMUPhyhOb1Xbg"
                    loading="lazy"
                    alt="Founder"
                    className="rounded-2xl w-[350px] md:w-[380px] object-cover"
                  />

                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-xl opacity-0 group-hover:opacity-70 transition duration-700"></div>
                </div>

                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-56 h-6 bg-blue-500/30 blur-2xl opacity-0 group-hover:opacity-50 transition duration-700"></div>
              </div>
            </div>
          </Reveal> */}
          <Reveal>
            <div className="flex justify-center">
              <div
                className="relative"
                // style={{ perspective: "1200px" }} // 🔥 3D depth
              >
                {/* Floating Shapes */}
                {/* <span className="absolute top-1 left-1 w-9 h-9 rounded-full bg-purple-500/60" /> */}
                <span className="absolute top-2 -right-7 w-12 h-12 rounded-full bg-pink-500/40" />
                <span className="absolute bottom-4 -left-6 w-10 h-10 rotate-40 bg-orange-400/70 rounded-md" />

                {/* 🧊 Glass Hexagon (STATIC) */}
                <div
                  className="relative w-[340px] h-[380px]
      flex items-center justify-center"
                >
                  {/* Hex Frame */}
                  <div
                    className="absolute inset-0 hexagon
        border-[3px] rounded-md border-purple-500/70
        bg-slate-900/20 backdrop-blur-sm"
                  />

                  {/* Inner Glow */}
                  <div
                    className="absolute inset-0 hexagon
        bg-gradient-to-br from-purple-500/20 to-blue-500/20
        opacity-40"
                  />

                  {/* 🎯 IMAGE — SAME MOTION AS BEFORE */}
                  <motion.img
                    src="/image.png"
                    alt="Founder"
                    initial={{ rotateX: 0, rotateY: 0 }}
                    whileHover={{
                      rotateX: -8,
                      rotateY: 10,
                      scale: 1.03,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 120,
                      damping: 14,
                    }}
                    className="relative z-10
        w-[320px]
        object-cover rounded
        transform-gpu"
                  />

                  {/* Soft Bottom Shadow */}
                  <div
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2
        w-56 h-6 bg-purple-500/30 blur-2xl opacity-60"
                  />
                </div>
              </div>
            </div>
          </Reveal>

          {/* 🟦 TEXT BLOCK UPGRADED */}
          <Reveal>
            <div className="text-center md:text-left">
              {/* 🔹 Heading */}
              <h2
                className="text-2xl sm:text-3xl md:text-4xl
    font-bold text-white leading-snug"
              >
                Ajay Saini –{" "}
                <span className="text-blue-400 block sm:inline">
                  Spoken English Coach
                </span>
              </h2>

              {/* 🔹 Description */}
              <p
                className="mt-3 sm:mt-4
    text-sm sm:text-[15px] md:text-base
    text-slate-300 leading-relaxed max-w-2xl"
              >
                Ajay has trained students, working professionals and business
                owners to speak clear, confident English. With practical
                speaking practice, mindset coaching & real situation based
                training, he creates real outcomes— interviews cracked,
                promotions earned & communication transformed.
              </p>

              {/* 🔹 Details */}
              <div
                className="mt-5 sm:mt-6
    grid grid-cols-1 sm:grid-cols-2
    gap-4 sm:gap-6
    text-sm sm:text-[15px]"
              >
                <div>
                  <p className="text-slate-400">Experience</p>
                  <p className="font-semibold text-white">10+ Years</p>
                </div>

                <div>
                  <p className="text-slate-400">Students Trained</p>
                  <p className="font-semibold text-white">5000+</p>
                </div>

                <div>
                  <p className="text-slate-400">Specialisation</p>
                  <p className="font-semibold text-white">
                    Spoken & Business English
                  </p>
                </div>

                <div>
                  <p className="text-slate-400">Teaching Style</p>
                  <p className="font-semibold text-white">
                    Friendly & Practical
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
