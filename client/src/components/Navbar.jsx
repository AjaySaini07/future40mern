// import { Link } from "react-router-dom";
// import { useState } from "react";
// import { useTheme } from "../context/ThemeContext";
// import { MdMenu, MdClose } from "react-icons/md";

// export default function Navbar() {
//   const { theme, toggleTheme } = useTheme();
//   const [open, setOpen] = useState(false);

//   return (
//     <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur border-b border-slate-800 relative">
//       <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
//         {/* Logo */}
//         <div className="flex items-center gap-2">
//           <div className="h-9 w-9 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white">
//             F
//           </div>
//           <div>
//             <p className="text-sm uppercase tracking-widest text-blue-400">
//               Future40
//             </p>
//             <p className="text-xs text-slate-400">English Learning Studio</p>
//           </div>
//         </div>

//         {/* Desktop Links */}
//         <div className="hidden md:flex items-center gap-6 text-sm text-slate-200">
//           <a href="#courses" className="hover:text-blue-400">
//             Courses
//           </a>
//           <a href="#success" className="hover:text-blue-400">
//             Success Stories
//           </a>
//           <a href="#founder" className="hover:text-blue-400">
//             Founder
//           </a>
//           <a href="#contact" className="hover:text-blue-400">
//             Contact
//           </a>
//         </div>

//         {/* Desktop Buttons */}
//         <div className="hidden md:flex items-center gap-3">
//           <a
//             href="#success-form"
//             className="text-white rounded-full bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-medium transition"
//           >
//             Free Demo
//           </a>

//           <Link
//             to="/login"
//             className="text-white rounded-full border border-blue-500 px-4 py-2 text-sm font-medium hover:bg-blue-600 transition"
//           >
//             Login / Register
//           </Link>
//         </div>

//         {/* Mobile Toggle Button */}
//         <button
//           onClick={() => setOpen(!open)}
//           className="md:hidden text-slate-200 text-2xl relative h-6 w-6"
//         >
//           <span
//             className={`absolute inset-0 transition-all duration-300 cursor-pointer ${
//               open ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
//             }`}
//           >
//             <MdMenu />
//           </span>

//           <span
//             className={`absolute inset-0 transition-all duration-300 cursor-pointer ${
//               open ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
//             }`}
//           >
//             <MdClose />
//           </span>
//         </button>
//       </nav>

//       {/* Mobile Dropdown */}
//       <div
//         className={`
//           md:hidden absolute top-full right-4 mt-2
//           w-56 rounded-md
//           bg-slate-900 border border-slate-800
//           p-4 space-y-2
//           shadow-xl
//           transition-all duration-300 ease-out
//           ${
//             open
//               ? "opacity-100 scale-100"
//               : "opacity-0 scale-95 pointer-events-none"
//           }
//         `}
//       >
//         <a
//           href="#success-form"
//           onClick={() => setOpen(false)}
//           className="block w-full text-center rounded-lg bg-blue-600 hover:bg-blue-500 py-2 text-sm font-medium text-white transition"
//         >
//           Free Demo
//         </a>

//         <Link
//           to="/login"
//           onClick={() => setOpen(false)}
//           className="block w-full text-center rounded-lg border border-blue-500 py-2 text-sm font-medium text-white hover:bg-blue-600 transition"
//         >
//           Login / Register
//         </Link>
//       </div>
//     </header>
//   );
// }

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { MdMenu, MdClose } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { FaUser, FaKey, FaSignOutAlt } from "react-icons/fa";

/* 🔹 Profile Icon */
function ProfileIcon() {
  return (
    <FaUserCircle className="text-3xl text-slate-200 hover:text-blue-400 transition cursor-pointer" />
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // 🔐 Auth check
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  // 🔽 Profile dropdown options
  const profileOptions = [
    {
      value: "profile",
      label: (
        <>
          <FaUser className="text-blue-400" />
          Profile
        </>
      ),
    },
    {
      value: "password",
      label: (
        <>
          <FaKey className="text-yellow-400" />
          Change Password
        </>
      ),
    },
    {
      value: "logout",
      label: (
        <>
          <FaSignOutAlt className="text-red-400" />
          Logout
        </>
      ),
    },
  ];

  // 🔁 Handle profile actions
  const handleProfileAction = (option) => {
    if (!option) return;

    switch (option.value) {
      case "profile":
        navigate("/profile");
        break;

      case "password":
        navigate("/change-password");
        break;

      case "logout":
        localStorage.removeItem("token");
        window.location.href = "/";
        break;

      default:
        break;
    }
  };

  // 🎨 React-Select styles (icon-only)
  const selectStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "transparent",
      border: "none",
      boxShadow: "none",
      minHeight: "auto",
      cursor: "pointer",
      padding: 0,
    }),

    valueContainer: (base) => ({
      ...base,
      padding: 0,
    }),

    indicatorsContainer: () => ({
      display: "none",
    }),

    menu: (base) => ({
      ...base,
      background:
        "linear-gradient(180deg, rgba(15,23,42,0.95), rgba(2,6,23,0.95))",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(148,163,184,0.2)",
      borderRadius: "5px",
      padding: "6px",
      width: "200px",
      right: 0,
      left: "auto",
      boxShadow:
        "0 10px 30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
    }),

    menuList: (base) => ({
      ...base,
      padding: 0,
    }),

    option: (base, state) => ({
      ...base,
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "12px 14px",
      borderRadius: "5px",
      fontSize: "14px",
      fontWeight: 500,
      color: "#e5e7eb",
      backgroundColor: state.isFocused
        ? "rgba(59,130,246,0.25)"
        : "transparent",
      cursor: "pointer",
      transition: "all 0.2s ease",
    }),

    singleValue: () => ({
      display: "none",
    }),
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur border-b border-slate-800">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* 🔹 Logo */}
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white">
            F
          </div>
          <div>
            <p className="text-sm uppercase tracking-widest text-blue-400">
              Future40
            </p>
            <p className="text-xs text-slate-400">English Learning Studio</p>
          </div>
        </div>

        {/* 🔹 Desktop Links */}
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

        {/* 🔹 Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          {!isLoggedIn ? (
            <>
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
            </>
          ) : (
            <Select
              options={profileOptions}
              onChange={handleProfileAction}
              styles={selectStyles}
              isSearchable={false}
              openMenuOnClick
              openMenuOnFocus
              menuPlacement="bottom"
              menuPosition="absolute"
              components={{
                DropdownIndicator: null,
                IndicatorSeparator: null,
              }}
              value={null}
              placeholder={<ProfileIcon />}
              className="w-auto outline-none"
            />
          )}
        </div>

        {/* 🔹 Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-slate-200 text-2xl relative h-6 w-6"
        >
          <span
            className={`absolute inset-0 transition-all duration-300 ${
              open ? "opacity-0 rotate-90" : "opacity-100"
            }`}
          >
            <MdMenu />
          </span>
          <span
            className={`absolute inset-0 transition-all duration-300 ${
              open ? "opacity-100" : "opacity-0 -rotate-90"
            }`}
          >
            <MdClose />
          </span>
        </button>
      </nav>

      {/* 🔹 Mobile Dropdown */}
      <div
        className={`md:hidden absolute right-4 top-full mt-2 w-56 rounded-md
        bg-slate-900 border border-slate-800 p-4 space-y-2 shadow-xl
        transition-all duration-300
        ${
          open
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }
        `}
      >
        {!isLoggedIn ? (
          <>
            <a
              href="#success-form"
              onClick={() => setOpen(false)}
              className="block w-full text-center rounded-lg bg-blue-600 py-2 text-sm text-white"
            >
              Free Demo
            </a>

            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="block w-full text-center rounded-lg border border-blue-500 py-2 text-sm text-white"
            >
              Login / Register
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/profile"
              onClick={() => setOpen(false)}
              className="block text-slate-200 hover:text-blue-400"
            >
              Profile
            </Link>

            <Link
              to="/change-password"
              onClick={() => setOpen(false)}
              className="block text-slate-200 hover:text-blue-400"
            >
              Change Password
            </Link>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              className="block w-full text-left text-red-400 hover:text-red-300"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}
