import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  FaTachometerAlt,
  FaBook,
  FaUsers,
  FaStar,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";

import { FcManager } from "react-icons/fc";

export default function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    // <aside
    //   onMouseEnter={() => setOpen(true)}
    //   onMouseLeave={() => setOpen(false)}
    //   className={`bg-slate-900 text-white min-h-screen
    //     transition-all duration-300 ease-in-out
    //     ${open ? "w-64" : "w-16"}
    //   `}
    // >
    <aside
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className={`bg-slate-900 text-white min-h-screen flex flex-col
    transition-all duration-300 ease-in-out
    ${open ? "w-64" : "w-16"}
  `}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-center gap-3 border-b border-slate-600">
        <FcManager className="text-3xl" />
        {open && <h2 className="text-xl font-bold">Admin Panel</h2>}
      </div>

      {/* Navigation */}
      <nav className="mt-4 space-y-3 px-3">
        <SidebarItem
          to="/admin/dashboard"
          icon={<FaTachometerAlt />}
          label="Dashboard"
          open={open}
        />

        <SidebarItem
          to="/admin/courses"
          icon={<FaBook />}
          label="Courses"
          open={open}
        />

        <SidebarItem
          to="/admin/students"
          icon={<FaUsers />}
          label="Students"
          open={open}
        />

        <SidebarItem
          to="/admin/stories"
          icon={<FaStar />}
          label="Success Stories"
          open={open}
        />

        <SidebarItem
          to="/admin/enrollments"
          icon={<FaClipboardList />}
          label="Enrollments"
          open={open}
        />
      </nav>

      {/* Logout */}
      <div className="mt-3 mb-4 px-4 flex justify-center">
        <button
          onClick={handleLogout}
          className={`
      flex items-center gap-3 p-2 rounded
      hover:bg-red-600 transition
      ${open ? "justify-start w-full" : "justify-center"}
    `}
        >
          <FaSignOutAlt className="text-2xl" />
          {open && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

/* Reusable Item */
function SidebarItem({ to, icon, label, open }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-4 p-2 rounded
                 hover:bg-slate-700 transition"
    >
      <span className="text-2xl">{icon}</span>
      {open && (
        <span className="whitespace-nowrap text-sm font-medium">{label}</span>
      )}
    </Link>
  );
}
