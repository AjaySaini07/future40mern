import React from "react";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiYoutube,
  FiPhone,
  FiMail,
  FiMapPin,
} from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-4">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Future40 Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              <span className="text-orange-400">Future</span>
              <span className="text-cyan-400">40</span>
            </h3>
            <p className="text-blue-200 text-sm mb-4">
              Transform your English speaking skills with expert trainers,
              interactive classes and proven methods. Join thousands of
              successful learners & grow in your career.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              {[
                { name: "Facebook", icon: FiFacebook },
                { name: "Twitter", icon: FiTwitter },
                { name: "Instagram", icon: FiInstagram },
                { name: "LinkedIn", icon: FiLinkedin },
                { name: "YouTube", icon: FiYoutube },
              ].map(({ name, icon: Icon }) => (
                <a
                  key={name}
                  href="#"
                  aria-label={name}
                  className="w-12 h-12 rounded-full bg-[#1a2332] hover:bg-cyan-400 text-cyan-400 hover:text-white transition flex items-center justify-center border border-cyan-400/30 hover:border-cyan-400"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              {["About Us", "Our Team", "Courses", "Faculty", "Gallery"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-blue-200 hover:text-cyan-400 transition"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
              <li>
                <a
                  href="#contact"
                  className="text-blue-200 hover:text-cyan-400 transition"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-3 text-blue-200 text-sm">
              <li className="flex items-center gap-2">
                <FiPhone className="text-cyan-400" /> +91 12345 67890
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="text-cyan-400" /> info@future40.com
              </li>
              <li className="flex items-start gap-2">
                <FiMapPin className="text-cyan-400 mt-1" />
                <span>
                  123 Education Street, Learning City,
                  <br />
                  Knowledge State, India - 123456
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-cyan-400/30 pt-8 text-center">
          <p className="text-blue-200 text-sm">
            © {new Date().getFullYear()} Future40. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
