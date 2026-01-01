import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
      <div className="absolute inset-0 opacity-30 bg-[url('https://images.pexels.com/photos/1181376/pexels-photo-1181376.jpeg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950" />

      <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl">
          <Reveal>
            <p className="inline-flex items-center rounded-full bg-slate-900/70 border border-slate-700 px-3 py-1 text-xs text-slate-300 mb-4">
              🔓 Fluent English | Career Growth
            </p>
          </Reveal>

          <Reveal>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Master <span className="text-blue-400">English</span> with{" "}
              <span className="text-blue-300">Confidence</span>
            </h1>
          </Reveal>

          <Reveal>
            <p className="mt-4 text-slate-300 text-sm md:text-base max-w-xl">
              Transform your English speaking skills with live classes,
              real-time feedback, structured modules and personalised guidance.
            </p>
          </Reveal>

          <div className="mt-6 flex flex-wrap gap-3">
            <Reveal>
              <a
                href="#courses"
                className="inline-flex items-center rounded-full bg-blue-600 hover:bg-blue-500 px-6 py-2.5 text-sm font-semibold"
              >
                View Courses
              </a>
            </Reveal>

            <Reveal>
              <a
                href="#success-form"
                className="inline-flex items-center rounded-full border border-slate-600 px-6 py-2.5 text-sm font-semibold text-slate-100 hover:border-blue-400"
              >
                Book Free Demo
              </a>
            </Reveal>
          </div>

          {/* stats */}
          <div className="mt-8 flex flex-wrap gap-8 text-sm text-slate-300">
            <div>
              <Reveal>
                <p className="text-2xl font-bold text-blue-400">15+</p>
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Years Experience
                </p>
              </Reveal>
            </div>
            <div>
              <Reveal>
                <p className="text-2xl font-bold text-blue-400">10K+</p>
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Students Trained
                </p>
              </Reveal>
            </div>
            <div>
              <Reveal>
                <p className="text-2xl font-bold text-blue-400">95%</p>
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Success Rate
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
