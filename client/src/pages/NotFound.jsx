import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden px-4">
      {/* Background glow */}
      <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[150px] rounded-full -top-40 -left-40"></div>
      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[150px] rounded-full -bottom-40 -right-40"></div>

      {/* Glass card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-md w-full text-center
        bg-slate-900/60 backdrop-blur-xl
        border border-slate-700/40
        rounded-xl
        shadow-[0_10px_50px_rgba(0,0,0,0.7)]
        p-5 sm:p-10"
      >
        {/* 404 */}
        <h1
          className="text-5xl sm:text-7xl font-extrabold tracking-tight
        bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500
        bg-clip-text text-transparent"
        >
          404
        </h1>

        {/* title */}
        <h2 className="mt-3 text-xl font-semibold text-white">
          Page Not Found
        </h2>

        {/* message */}
        <p className="mt-2 text-slate-400 text-sm leading-relaxed">
          The page you are trying to access does not exist or may have been
          moved.
        </p>

        {/* button */}
        <Link
          to="/"
          className="inline-block mt-6 px-6 py-2.5
          rounded-md
          bg-gradient-to-r from-cyan-500 to-blue-600
          hover:from-cyan-400 hover:to-blue-500
          text-white text-sm font-medium
          shadow-lg shadow-cyan-500/20
          transition-all duration-500"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
