import React from "react";
import { FiFacebook, FiInstagram, FiLinkedin, FiYoutube } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 px-4 py-16">
      <div className="max-w-6xl mx-auto text-center">
        {/* Brand */}
        <h3 className="text-2xl sm:text-3xl font-bold mb-5">
          <span className="bg-gradient-to-r from-orange-400 via-cyan-400 to-orange-400 bg-clip-text text-transparent">
            Future40
          </span>
          <span className="text-blue-400 ml-2">English Training Academy</span>
        </h3>

        {/* Tagline */}
        <p className="text-slate-400 max-w-xl mx-auto mb-8 text-sm leading-relaxed">
          Transform your English communication with confidence. Join Future40
          and unlock better career opportunities with expert training and modern
          learning methods.
        </p>

        {/* Social Icons */}
        <div className="flex justify-center gap-3 sm:gap-5 mb-10">
          {[
            { name: "Facebook", icon: FiFacebook },
            // { name: "Twitter", icon: FiTwitter },
            { name: "Instagram", icon: FiInstagram },
            { name: "LinkedIn", icon: FiLinkedin },
            { name: "YouTube", icon: FiYoutube },
          ].map(({ name, icon: Icon }) => (
            <a
              key={name}
              href="#"
              aria-label={name}
              className="
            group
            w-12 h-12
            rounded-xl
            bg-slate-900
            border border-slate-800
            hover:border-cyan-500
            hover:bg-slate-800
            transition-all duration-500
            flex items-center justify-center
            shadow-lg
          "
            >
              <Icon className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition" />
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-6"></div>

        {/* Copyright */}
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} Future40 English Training Academy. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}
