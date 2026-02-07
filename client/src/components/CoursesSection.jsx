import { FiStar, FiBookOpen, FiFeather, FiAward } from "react-icons/fi";
import Reveal from "./Reveal";

const courses = [
  {
    title: "Beginner English",
    level: "Level 1",
    duration: "8 Weeks",
    points: ["Basic Grammar", "Daily Conversation", "Vocabulary Building"],
    icon: <FiStar />,
    color: "green-500",
  },
  {
    title: "Intermediate English",
    level: "Level 2",
    duration: "8 Weeks",
    points: ["Fluency Practice", "Error Correction", "Real-Life Speaking"],
    icon: <FiBookOpen />,
    color: "blue-500",
  },
  {
    title: "Advanced English",
    level: "Level 3",
    duration: "10 Weeks",
    points: ["Meetings", "Presentations", "Client Handling"],
    icon: <FiFeather />,
    color: "purple-500",
  },
  {
    title: "IELTS / TOEFL Preparation",
    level: "Exam",
    duration: "Custom",
    points: ["Speaking Tasks", "Mock Tests", "Feedback + Improvement"],
    icon: <FiAward />,
    color: "yellow-500",
  },
];

export default function CoursesSection() {
  return (
    <section className="bg-slate-950 pt-12 md:pt-16 pb-2 md:pb-5 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
          Our <span className="text-blue-400">Courses</span>
        </h2>
        <p className="text-slate-400 text-center text-xs sm:text-sm mt-1 sm:mt-2">
          Choose a skill-level course designed to improve your English fluency.
        </p>

        <div className="mt-5 sm:mt-7 md:mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {courses.map((c, i) => (
            <Reveal key={i}>
              <div
                className={`
                  group bg-[#0E1624] border border-slate-800 rounded-md p-5 
                  transition duration-500 hover:border-${c.color}
                hover:scale-[1.01] transition duration-600`}
              >
                {/* ICON */}
                <div
                  className={`w-12 h-10 bg-${c.color} rounded-md text-white text-xl flex items-center justify-center group-hover:scale-[1.08] transition duration-600`}
                >
                  {c.icon}
                </div>

                <p className="mt-5 text-[11px] text-slate-400 tracking-wide uppercase">
                  {c.level}
                </p>
                <h3 className="font-semibold text-lg text-white leading-tight">
                  {c.title}
                </h3>
                <p className="text-[11px] text-blue-400 mt-1">{c.duration}</p>

                <ul className="mt-4 text-sm text-slate-300 space-y-2">
                  {c.points.map((p, j) => (
                    <li key={j}>• {p}</li>
                  ))}
                </ul>

                {/* <button className="w-full py-2 mt-6 rounded-md bg-blue-600 hover:bg-blue-500 text-sm font-semibold"> */}
                <button
                  className={`w-full py-2 mt-6 rounded-md bg-${c.color} text-sm font-semibold`}
                >
                  Apply Now
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
