import Reveal from "./Reveal";

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
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-14">
          {/* 🟦 IMAGE WITH 3D DEPTH */}
          <Reveal>
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
                    src="https://media.licdn.com/dms/image/v2/D4D03AQEJSc8sxmcMbg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1715872424793?e=1766620800&v=beta&t=R0oBVLU80b3n8d_ieBzqdTe5-s4oGJAqPqTCHTsN398"
                    loading="lazy"
                    alt="Founder"
                    className="rounded-2xl w-[350px] md:w-[380px] object-cover"
                  />

                  {/* 🔥 Glow Ring */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-xl opacity-0 group-hover:opacity-70 transition duration-700"></div>
                </div>

                {/* Floating Shadow Effect */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-56 h-6 bg-blue-500/30 blur-2xl opacity-0 group-hover:opacity-50 transition duration-700"></div>
              </div>
            </div>
          </Reveal>

          {/* 🟦 TEXT BLOCK UPGRADED */}
          <Reveal>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug">
                Ajay Saini –{" "}
                <span className="text-blue-400">Spoken English Coach</span>
              </h2>

              <p className="mt-4 text-[15px] text-slate-300 leading-relaxed">
                Ajay has trained students, working professionals and business
                owners to speak clear, confident English. With practical
                speaking practice, mindset coaching & real situation based
                training, he creates real outcomes— interviews cracked,
                promotions earned & communication transformed.
              </p>

              {/* Details */}
              <div className="mt-6 grid grid-cols-2 gap-6 text-[15px]">
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
