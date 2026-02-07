// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Select from "react-select";
// import { MdMenu, MdClose } from "react-icons/md";
// import { FaUserCircle } from "react-icons/fa";
// import { FaUser, FaKey, FaSignOutAlt } from "react-icons/fa";

// /* 🔹 Profile Icon */
// function ProfileIcon() {
//   return (
//     <FaUserCircle className="text-3xl text-slate-200 hover:text-blue-400 transition cursor-pointer" />
//   );
// }

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();

//   // 🔐 Auth check
//   const token = localStorage.getItem("token");
//   const isLoggedIn = !!token;

//   // 🔽 Profile dropdown options
//   const profileOptions = [
//     {
//       value: "profile",
//       label: (
//         <>
//           <FaUser className="text-blue-400" />
//           Profile
//         </>
//       ),
//     },
//     {
//       value: "password",
//       label: (
//         <>
//           <FaKey className="text-yellow-400" />
//           Change Password
//         </>
//       ),
//     },
//     {
//       value: "logout",
//       label: (
//         <>
//           <FaSignOutAlt className="text-red-400 text-lg" />
//           Logout
//         </>
//       ),
//     },
//   ];

//   // 🔁 Handle profile actions
//   const handleProfileAction = (option) => {
//     if (!option) return;

//     switch (option.value) {
//       case "profile":
//         navigate("/profile");
//         break;

//       case "password":
//         navigate("/change-password");
//         break;

//       case "logout":
//         localStorage.removeItem("token");
//         window.location.href = "/";
//         break;

//       default:
//         break;
//     }
//   };

//   // 🎨 React-Select styles (icon-only)
//   const selectStyles = {
//     control: (base) => ({
//       ...base,
//       backgroundColor: "transparent",
//       border: "none",
//       boxShadow: "none",
//       minHeight: "auto",
//       cursor: "pointer",
//       padding: 0,
//     }),

//     valueContainer: (base) => ({
//       ...base,
//       padding: 0,
//     }),

//     indicatorsContainer: () => ({
//       display: "none",
//     }),

//     menu: (base) => ({
//       ...base,
//       background:
//         "linear-gradient(180deg, rgba(15,23,42,0.95), rgba(2,6,23,0.95))",
//       backdropFilter: "blur(10px)",
//       border: "1px solid rgba(148,163,184,0.2)",
//       borderRadius: "5px",
//       padding: "6px",
//       width: "200px",
//       right: 0,
//       left: "auto",
//       boxShadow:
//         "0 10px 30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
//     }),

//     menuList: (base) => ({
//       ...base,
//       padding: 0,
//     }),

//     option: (base, state) => ({
//       ...base,
//       display: "flex",
//       alignItems: "center",
//       gap: "10px",
//       padding: "12px 14px",
//       borderRadius: "5px",
//       fontSize: "14px",
//       fontWeight: 500,
//       color: "#e5e7eb",
//       backgroundColor: state.isFocused
//         ? "rgba(59,130,246,0.25)"
//         : "transparent",
//       cursor: "pointer",
//       transition: "all 0.2s ease",
//     }),

//     singleValue: () => ({
//       display: "none",
//     }),
//   };

//   return (
//     <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur border-b border-slate-800">
//       <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
//         {/* 🔹 Logo */}
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

//         {/* 🔹 Desktop Links */}
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

//         {/* 🔹 Desktop Auth */}
//         <div className="hidden md:flex items-center gap-3">
//           {!isLoggedIn ? (
//             <>
//               <a
//                 href="#success-form"
//                 className="text-white rounded-full bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-medium transition"
//               >
//                 Free Demo
//               </a>

//               <Link
//                 to="/login"
//                 className="text-white rounded-full border border-blue-500 px-4 py-2 text-sm font-medium hover:bg-blue-600 transition"
//               >
//                 Login / Register
//               </Link>
//             </>
//           ) : (
//             <Select
//               options={profileOptions}
//               onChange={handleProfileAction}
//               styles={selectStyles}
//               isSearchable={false}
//               openMenuOnClick
//               openMenuOnFocus
//               menuPlacement="bottom"
//               menuPosition="absolute"
//               components={{
//                 DropdownIndicator: null,
//                 IndicatorSeparator: null,
//               }}
//               value={null}
//               placeholder={<ProfileIcon />}
//               className="w-auto outline-none"
//             />
//           )}
//         </div>

//         {/* 🔹 Mobile Toggle */}
//         <button
//           onClick={() => setOpen(!open)}
//           className="md:hidden text-slate-200 text-2xl relative h-6 w-6"
//         >
//           <span
//             className={`absolute inset-0 transition-all duration-300 ${
//               open ? "opacity-0 rotate-90" : "opacity-100"
//             }`}
//           >
//             <MdMenu />
//           </span>
//           <span
//             className={`absolute inset-0 transition-all duration-300 ${
//               open ? "opacity-100" : "opacity-0 -rotate-90"
//             }`}
//           >
//             <MdClose />
//           </span>
//         </button>
//       </nav>

//       {/* 🔹 Mobile Dropdown */}
//       <div
//         className={`md:hidden absolute right-4 top-full mt-2 w-56 rounded-md
//         bg-slate-900 border border-slate-800 p-4 space-y-2 shadow-xl
//         transition-all duration-300
//         ${
//           open
//             ? "opacity-100 scale-100"
//             : "opacity-0 scale-95 pointer-events-none"
//         }
//         `}
//       >
//         {!isLoggedIn ? (
//           <>
//             <a
//               href="#success-form"
//               onClick={() => setOpen(false)}
//               className="block w-full text-center rounded-md bg-blue-600 hover:bg-blue-700 transition py-2 text-sm text-white"
//             >
//               Free Demo
//             </a>

//             <Link
//               to="/login"
//               onClick={() => setOpen(false)}
//               className="block w-full text-center rounded-md border border-blue-500 hover:border-blue-400 transition py-2 text-sm text-white"
//             >
//               Login / Register
//             </Link>
//           </>
//         ) : (
//           <>
//             <Link
//               to="/profile"
//               onClick={() => setOpen(false)}
//               className="block text-slate-200 hover:text-blue-400"
//             >
//               Profile
//             </Link>

//             <Link
//               to="/change-password"
//               onClick={() => setOpen(false)}
//               className="block text-slate-200 hover:text-blue-400"
//             >
//               Change Password
//             </Link>

//             <button
//               onClick={() => {
//                 localStorage.removeItem("token");
//                 window.location.href = "/";
//               }}
//               className="block w-full text-left text-red-400 hover:text-red-300"
//             >
//               Logout
//             </button>
//           </>
//         )}
//       </div>
//     </header>
//   );
// }

import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { MdMenu, MdClose } from "react-icons/md";
import { FaUserCircle, FaUser, FaKey, FaSignOutAlt } from "react-icons/fa";

/* 🔹 Profile Icon */
function ProfileIcon() {
  return (
    <FaUserCircle className="text-2xl [@media(min-width:480px)]:text-3xl text-slate-200 hover:text-blue-400 transition cursor-pointer" />
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const dropdownRef = useRef(null);
  const toggleBtnRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        open &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  /* 🔽 Profile dropdown options */
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

  const handleProfileAction = (option) => {
    if (!option) return;

    if (option.value === "profile") navigate("/profile");
    if (option.value === "password") navigate("/change-password");
    if (option.value === "logout") {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  };

  /* 🎨 react-select styles */
  // const selectStyles = {
  //   control: (base) => ({
  //     ...base,
  //     backgroundColor: "transparent",
  //     border: "none",
  //     boxShadow: "none",
  //     minHeight: "auto",
  //     cursor: "pointer",
  //     padding: 0,
  //   }),
  //   valueContainer: (base) => ({ ...base, padding: 0 }),
  //   indicatorsContainer: () => ({ display: "none" }),
  //   singleValue: () => ({ display: "none" }),
  //   menu: (base) => ({
  //     ...base,
  //     background:
  //       "linear-gradient(180deg, rgba(15,23,42,0.95), rgba(2,6,23,0.95))",
  //     border: "1px solid rgba(148,163,184,0.2)",
  //     borderRadius: "6px",
  //     width: "200px",
  //     right: 0,
  //     left: "auto",
  //   }),
  //   option: (base, state) => ({
  //     ...base,
  //     display: "flex",
  //     alignItems: "center",
  //     gap: "10px",
  //     padding: "12px 14px",
  //     color: "#e5e7eb",
  //     backgroundColor: state.isFocused
  //       ? "rgba(59,130,246,0.25)"
  //       : "transparent",
  //     cursor: "pointer",
  //   }),
  // };
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
      padding: "3px",
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
      borderRadius: "4px",
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
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-2 [@media(min-width:480px)]:py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 [@media(min-width:480px)]:h-9 [@media(min-width:480px)]:w-9 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white">
            F
          </div>

          {/* Hide text on mobile */}
          <div className="hidden sm:block">
            <p className="text-sm uppercase tracking-widest text-blue-400">
              Future40
            </p>
            <p className="text-xs text-slate-400">English Learning Studio</p>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-slate-200">
          <a href="/" className="hover:text-blue-400">
            Home
          </a>
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

        {/* Auth (Desktop + Mobile) */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <Select
              options={profileOptions}
              onChange={handleProfileAction}
              styles={selectStyles}
              isSearchable={false}
              value={null}
              placeholder={<ProfileIcon />}
            />
          ) : (
            <Link
              to="/login"
              className="hidden md:inline-block text-white rounded-full
      border border-blue-500 px-4 py-2 text-sm font-medium
      hover:bg-blue-600 transition"
            >
              Login / Register
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            ref={toggleBtnRef}
            onClick={() => setOpen((prev) => !prev)}
            className="
    md:hidden relative h-6 w-8 [@media(min-width:480px)]:h-8 [@media(min-width:480px)]:w-10
    flex items-center justify-center
    rounded-sm
    bg-slate-800 hover:bg-slate-700
    transition-colors duration-200
  "
          >
            {/* Menu Icon */}
            <span
              className={`absolute flex items-center justify-center
      transition-all duration-300 ease-in-out
      ${
        open ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
      }`}
            >
              <MdMenu className="twxt-xl [@media(min-width:480px)]:text-2xl text-slate-200" />
            </span>

            {/* Close Icon */}
            <span
              className={`absolute flex items-center justify-center
      transition-all duration-300 ease-in-out
      ${
        open
          ? "opacity-100 rotate-0 scale-100"
          : "opacity-0 -rotate-90 scale-75"
      }`}
            >
              <MdClose className="twxt-xl [@media(min-width:480px)]:text-2xl text-slate-200" />
            </span>
          </button>
        </div>
      </nav>

      {/* 🔹 Mobile Dropdown (Nav Links) */}
      <div
        ref={dropdownRef}
        className={`
    md:hidden absolute right-3 top-8
    [@media(min-width:480px)]:top-12
    mt-2 w-56 rounded-md

    bg-slate-900/95 backdrop-blur
    border border-slate-800
    shadow-2xl

    p-2 space-y-1
    text-sm [@media(min-width:480px)]:text-base

    origin-top-right
    transition-all duration-200 ease-out
    ${
      open
        ? "opacity-100 scale-100 translate-y-0"
        : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
    }
  `}
      >
        {/* Nav links */}
        {[
          { label: "Home", href: "/" },
          { label: "Courses", href: "#courses" },
          { label: "Success Stories", href: "#success" },
          { label: "Founder", href: "#founder" },
          { label: "Contact", href: "#contact" },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={() => setOpen(false)}
            className="
  block rounded-sm px-2 py-1.5
  text-slate-200

  border border-transparent
  transition-all duration-200 ease-out

  hover:border-cyan-400/60
  hover:bg-slate-800
  hover:text-cyan-300
  hover:shadow-[0_0_0_1px_rgba(34,211,238,0.3)]

  active:scale-[0.98]
"
          >
            {item.label}
          </a>
        ))}

        {/* Auth section */}
        {!isLoggedIn && (
          <>
            <div className="my-2 h-px bg-slate-700/60" />

            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="
          block rounded-sm text-center
          border border-cyan-500/70
          px-4 py-2

          text-xs [@media(min-width:480px)]:text-sm
          font-medium text-white

          transition
          hover:bg-cyan-600 hover:border-cyan-600
          active:scale-[0.98]
        "
            >
              Login / Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
