import { Link } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { MdMenu, MdClose } from "react-icons/md";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur border-b border-slate-800 relative">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white">
            Fooooo
          </div>
          <div>
            <p className="text-sm uppercase tracking-widest text-blue-400">
              Future40
            </p>
            <p className="text-xs text-slate-400">English Learning Studio</p>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-slate-200">
          <a href="#courses" className="hover:text-blue-400">
            Courses
          </a>
          <a href="#success" className="hover:text-blue-400">
            Success Stories
          </a>
          <a href="#founder" className="hover:text-blue-400">
            Founder
          </a>
          <a href="#contact" className="hover:text-blue-400">
            Contact
          </a>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#success-form"
            className="text-white rounded-full bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-medium transition"
          >
            Free Demo
          </a>

          <Link
            to="/login"
            className="text-white rounded-full border border-blue-500 px-4 py-2 text-sm font-medium hover:bg-blue-600 transition"
          >
            Login / Register
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-slate-200 text-2xl relative h-6 w-6"
        >
          <span
            className={`absolute inset-0 transition-all duration-300 cursor-pointer ${
              open ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
            }`}
          >
            <MdMenu />
          </span>

          <span
            className={`absolute inset-0 transition-all duration-300 cursor-pointer ${
              open ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
            }`}
          >
            <MdClose />
          </span>
        </button>
      </nav>

      {/* Mobile Dropdown */}
      <div
        className={`
          md:hidden absolute top-full right-4 mt-2
          w-56 rounded-md
          bg-slate-900 border border-slate-800
          p-4 space-y-2
          shadow-xl
          transition-all duration-300 ease-out
          ${
            open
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }
        `}
      >
        <a
          href="#success-form"
          onClick={() => setOpen(false)}
          className="block w-full text-center rounded-lg bg-blue-600 hover:bg-blue-500 py-2 text-sm font-medium text-white transition"
        >
          Free Demo
        </a>

        <Link
          to="/login"
          onClick={() => setOpen(false)}
          className="block w-full text-center rounded-lg border border-blue-500 py-2 text-sm font-medium text-white hover:bg-blue-600 transition"
        >
          Login / Register
        </Link>
      </div>
    </header>
  );
}
