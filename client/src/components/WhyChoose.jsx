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
    desc: "Small batches + 1:1 feedback to fix grammar, fluency and confidence issues.",
    glow: "from-pink-500 to-purple-500",
  },
  {
    icon: <FiTrendingUp />,
    title: "Result-Oriented Approach",
    desc: "Structured roadmap for interviews, presentations and speaking improvement.",
    glow: "from-cyan-400 to-blue-500",
  },
  {
    icon: <FiBookOpen />,
    title: "Premium Study Material",
    desc: "Worksheets, speaking tasks, vocabulary lists & guided daily practice.",
    glow: "from-green-400 to-emerald-500",
  },
  {
    icon: <FiBarChart2 />,
    title: "Support & Progress Tracking",
    desc: "Assessments, weekly speaking reviews & personal improvement roadmap.",
    glow: "from-orange-400 to-yellow-500",
  },
];

export default function NeonFeatureCards() {
  return (
    <section className="py-16 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-white">
          Why Choose <span className="text-blue-400">Future40?</span>
        </h2>
        <p className="text-center mt-3 text-slate-300 text-sm max-w-xl mx-auto">
          High-performance training built for real confidence, fluency & growth.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {features.map((f, i) => (
            <Reveal key={i}>
              <div className="relative group p-[2px] rounded-xl transition duration-500">
                {/* Neon Glow Border on Hover */}
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-r ${f.glow} opacity-0 group-hover:opacity-100 blur-sm transition duration-500`}
                />

                {/* Actual Card */}
                <div
                  className="relative rounded-md bg-slate-900/90 p-6 border border-white/10 backdrop-blur-xl 
                                group-hover:scale-[1.0] transition duration-500 shadow-lg overflow-hidden"
                >
                  {/* Icon Glow */}
                  <div
                    className={`w-12 h-10 flex items-center justify-center rounded-md text-xl text-white group-hover:scale-[1.06] transition duration-600 
                                  bg-gradient-to-br ${f.glow} shadow-[0_0_20px_rgba(255,255,255,0.4)]`}
                  >
                    {f.icon}
                  </div>

                  <h3 className="mt-4 text-[18px] font-semibold text-white">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-slate-300 text-sm leading-relaxed">
                    {f.desc}
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
