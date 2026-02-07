import { jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  BellIcon,
  LockedIcon,
  LogoutIcon,
  PinIcon,
  ProfileIcon,
  SattingIcon,
  UnLockedIcon,
} from "../../icons/Icons";
import { Link } from "react-router-dom";

function AdminNavbar({ open, pinMode, setPinMode, setOpen }) {
  const [adminName, setAdminName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setAdminName(decoded.name || "Admin");
      } catch (error) {
        console.error("Invalid token");
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // return (
  //   <header className="h-14 flex items-center justify-between px-4 sticky top-0 z-40 bg-slate-950/80 backdrop-blur border-l border-b border-slate-800">
  //     {/* Left: Sidebar Pin */}
  //     <button
  //       onClick={() => {
  //         if (pinMode === "closed") {
  //           setPinMode(null);
  //         } else {
  //           setPinMode("closed");
  //           setOpen(false);
  //         }
  //       }}
  //       title={pinMode === "closed" ? "Unlock sidebar" : "Lock closed sidebar"}
  //     >
  //       {pinMode === "closed" ? (
  //         <LockedIcon
  //           className="
  //     text-2xl text-red-500
  //     cursor-pointer
  //     transition-transform duration-300
  //     scale-110
  //   "
  //         />
  //       ) : (
  //         <UnLockedIcon
  //           className="
  //     text-2xl text-slate-400
  //     cursor-pointer
  //     transition-transform duration-300
  //     hover:scale-105 hover:text-white
  //   "
  //         />
  //       )}
  //     </button>

  //     {/* Right: Admin info */}
  //     <div className="text-sm text-slate-300 font-medium">
  //       Welcome, <span className="text-white">{adminName}</span>
  //     </div>
  //   </header>
  // );

  return (
    <header className="h-14 flex items-center justify-between px-6 sticky top-0 z-40 bg-slate-950/80 backdrop-blur border-l border-b border-slate-800">
      {/* LEFT : Lock closed sidebar */}
      <button
        onClick={() => {
          if (pinMode === "closed") {
            setPinMode(null);
          } else {
            setPinMode("closed");
            setOpen(false);
          }
        }}
        title={pinMode === "closed" ? "Unlock sidebar" : "Lock closed sidebar"}
      >
        {pinMode === "closed" ? (
          <LockedIcon className="text-2xl text-red-500 cursor-pointer transition-transform duration-300 scale-110" />
        ) : (
          <UnLockedIcon className="text-2xl text-slate-400 cursor-pointer transition-transform duration-300 hover:scale-105 hover:text-white" />
        )}
      </button>

      {/* RIGHT : Notifications + Profile */}
      <div className="relative flex items-center gap-6" ref={menuRef}>
        {/* Notification */}
        <button className="relative text-slate-400 hover:text-white transition">
          <BellIcon className="text-xl" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Profile */}
        <motion.button
          onClick={() => setMenuOpen((p) => !p)}
          className="flex items-center gap-2 p-0.5 rounded-full hover:bg-slate-800 transition"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.div
            className="w-9 h-9 cursor-pointer rounded-full bg-blue-500/20
               flex items-center justify-center text-blue-400
               text-sm font-bold"
            animate={{
              rotate: menuOpen ? 360 : 0,
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {adminName.charAt(0)}
          </motion.div>
        </motion.button>

        {/* Dropdown */}
        {menuOpen && (
          <div className="absolute right-0 top-11 w-56 bg-slate-950 border border-slate-700 rounded-md shadow-xl overflow-hidden z-50">
            <div className="flex items-center gap-1 px-4 py-3 border-b border-slate-800">
              <p className="text-sm text-blue-400 font-medium">
                {adminName}
                {/* {"- (Admin)"} */}
              </p>
              <p className="text-xs text-slate-400">- (Admin)</p>
            </div>

            <div className="py-1">
              <DropdownItem icon={<ProfileIcon />} label="Profile" />
              <Link to="/admin/change-password">
                <DropdownItem icon={<LockedIcon />} label="Change Password" />
              </Link>
              <DropdownItem icon={<SattingIcon />} label="Settings" />
            </div>

            <div className="border-t border-slate-800 py-1">
              <DropdownItem
                icon={<LogoutIcon />}
                label="Logout"
                danger
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/admin/login";
                }}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );

  function DropdownItem({ icon, label, onClick, danger }) {
    return (
      <button
        onClick={onClick}
        className={`
        w-full flex items-center gap-3 px-4 py-2 text-sm transition
        ${
          danger
            ? "text-red-400 hover:bg-red-500/10"
            : "text-slate-300 hover:bg-slate-800"
        }
      `}
      >
        <span className="text-lg">{icon}</span>
        <span>{label}</span>
      </button>
    );
  }
}

export default AdminNavbar;
