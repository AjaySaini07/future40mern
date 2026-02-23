import {
  FiUserCheck,
  FiTrendingUp,
  FiBookOpen,
  FiBarChart2,
} from "react-icons/fi";
import Reveal from "./Reveal";

const features = [
  {
    icon: <FiUserCheck />,
    title: "Personalised Live Training",
    desc: "Small focused batches with 1:1 feedback sessions to improve grammar, fluency, pronunciation and real speaking confidence. Get personalised correction and individual attention in every class.",
    glow: "from-pink-500 to-purple-500",
  },
  {
    icon: <FiTrendingUp />,
    title: "Result-Oriented Approach",
    desc: "A structured roadmap designed for interviews, presentations, business communication and daily speaking. We focus on practical outcomes — promotions, job offers and confidence transformation.",
    glow: "from-cyan-400 to-blue-500",
  },
  {
    icon: <FiBookOpen />,
    title: "Premium Study Material",
    desc: "Well-designed worksheets, vocabulary builders, real-life speaking tasks, mock interview scripts and guided daily practice plans to accelerate your improvement consistently.",
    glow: "from-green-400 to-emerald-500",
  },
  {
    icon: <FiBarChart2 />,
    title: "Support & Progress Tracking",
    desc: "Regular assessments, weekly speaking reviews, performance tracking and personalised improvement roadmaps to ensure continuous measurable progress in your communication skills.",
    glow: "from-orange-400 to-yellow-500",
  },
];

export default function NeonFeatureCards() {
  return (
    <section className="pt-12 md:pt-16 pb-2 md:pb-5 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-white">
          Why Choose <span className="text-blue-400">Future40?</span>
        </h2>
        <p className="text-center mt-1 sm:mt-2 text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
          High-performance training built for real confidence, fluency & growth.
        </p>

        <div className="mt-5 sm:mt-7 md:mt-9 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {features.map((f, i) => (
            <Reveal key={i}>
              <div className="relative group p-[2px] rounded-xl transition duration-500">
                {/* Neon Glow Border on Hover */}
                {/* <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-r ${f.glow} opacity-0 group-hover:opacity-100 blur-sm transition duration-500`}
                /> */}
                {/* Neon Glow Border on Hover Outside*/}
                {/* <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-r ${f.glow}
  opacity-0 group-hover:opacity-70 blur-[2px]
  transition-opacity duration-500`}
                /> */}
                {/* Neon Glow Border on Hover Inside*/}
                <div
                  className={`absolute inset-[1px] rounded-xl bg-gradient-to-r ${f.glow}
  opacity-0 group-hover:opacity-60 blur-[1.5px]
  transition-opacity duration-500`}
                />

                {/* Actual Card */}
                <div
                  className="relative rounded-md bg-slate-900/90 p-5 sm:p-6 border border-white/10 backdrop-blur-xl 
                                group-hover:scale-[1.01] transition duration-500 shadow-lg overflow-hidden"
                >
                  {/* Icon Glow */}
                  <div
                    className={`w-12 h-10 flex items-center justify-center rounded-md text-xl text-white group-hover:scale-[1.06] transition duration-600 
                                  bg-gradient-to-br ${f.glow} shadow-[0_0_20px_rgba(255,255,255,0.4)]`}
                  >
                    {f.icon}
                  </div>

                  <h3 className="mt-4 text-xl font-semibold text-white">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-slate-300 text-sm leading-relaxed">
                    {f.desc}
                  </p>

                  <p className="mt-3 text-xs text-blue-400 font-medium">
                    Learn more →
                  </p>

                  {/* Bottom glow beam */}
                  <div
                    className={`absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r ${f.glow}
                                   group-hover:w-full transition-all duration-600`}
                  ></div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
