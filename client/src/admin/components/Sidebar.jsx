import { Link, useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";
import {
  BannersIcon,
  ContactInfoIcon,
  CoursesIcon,
  DashboardIcon,
  EnrollmentIcon,
  FounderIcon,
  HeroIcon,
  LogoutIcon,
  PinIcon,
  ProfileIcon,
  QueriesIcon,
  StarIcon,
  UsersIcon,
} from "../../icons/Icons";

export default function Sidebar({ open, setOpen, pinMode, setPinMode }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <aside
      onMouseEnter={() => {
        if (pinMode === null) {
          setOpen(true);
        }
      }}
      onMouseLeave={() => {
        if (pinMode === null) {
          setOpen(false);
        }
      }}
      className={`
    group
    bg-slate-950 text-white h-screen flex flex-col
    transition-[width] duration-300 ease-in-out
    overflow-hidden
    ${open ? "w-[192px]" : "w-[64px]"}
  `}
    >
      {/* Header */}
      <div className="h-14 flex items-center gap-3 px-4 border-b border-slate-700">
        {/* Pin Button */}
        <button
          onClick={() => {
            if (pinMode === "open") {
              setPinMode(null);
              setOpen(false);
            } else {
              setPinMode("open");
              setOpen(true);
            }
          }}
          title={pinMode === "open" ? "Unpin sidebar" : "Pin open sidebar"}
        >
          <PinIcon
            className={`
    text-2xl cursor-pointer hover:scale-110
    transition-transform duration-300
    ${
      pinMode === "open"
        ? "-rotate-45 text-red-500 scale-110"
        : "text-slate-400 hover:text-white"
    }
  `}
          />
        </button>

        <span
          className={`
      text-lg font-bold whitespace-nowrap text-blue-400
      transition-all duration-300
      ${open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"}
    `}
        >
          Admin Panel
        </span>
      </div>

      {/* Navigation (ONLY scroll here) */}
      <nav
        className="
    flex-1 mt-2 px-2 space-y-1
    overflow-y-hidden
    group-hover:overflow-y-auto
    scrollbar-slim
  "
      >
        <SidebarItem
          to="/admin/dashboard"
          icon={<DashboardIcon />}
          label="Dashboard"
          open={open}
        />

        <SidebarItem
          to="/admin/hero"
          icon={<HeroIcon />}
          label="Hero Section"
          open={open}
        />

        <SidebarItem
          to="/admin/banners"
          icon={<BannersIcon />}
          label="Banners"
          open={open}
        />

        <SidebarItem
          to="/admin/courses"
          icon={<CoursesIcon />}
          label="Courses"
          open={open}
        />

        <SidebarItem
          to="/admin/students"
          icon={<UsersIcon />}
          label="Students"
          open={open}
        />

        <SidebarItem
          to="/admin/stories"
          icon={<StarIcon />}
          label="Success Stories"
          open={open}
        />

        <SidebarItem
          to="/admin/querys"
          icon={<QueriesIcon />}
          label="Querys"
          open={open}
        />

        <SidebarItem
          to="/admin/founder"
          icon={<FounderIcon />}
          label="Founder"
          open={open}
        />

        <SidebarItem
          to="/admin/contactinfo"
          icon={<ContactInfoIcon />}
          label="Contact Info"
          open={open}
        />

        <SidebarItem
          to="/admin/enrollments"
          icon={<EnrollmentIcon />}
          label="Enrollments"
          open={open}
        />
      </nav>

      {/* Logout */}
      <div className="p-2 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full p-2 rounded
          text-red-400 hover:bg-red-500/10 transition"
        >
          <LogoutIcon className="text-xl shrink-0" />

          <span
            className={`
              transition-all duration-300 whitespace-nowrap
              ${open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"}
            `}
          >
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
}

/* Reusable Item */
function SidebarItem({ to, icon, label, open }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        flex items-center rounded-sm transition-all duration-200
        ${open ? "px-1" : "justify-center"}
          ${
            isActive
              ? "bg-slate-800 text-cyan-400"
              : "hover:bg-slate-900 text-slate-300"
          }`
      }
    >
      {/* Icon */}
      <span className="w-10 h-10 flex items-center justify-center shrink-0">
        <span className="text-xl">{icon}</span>
      </span>

      {/* Label (animate, but no space when closed) */}
      <span
        className={`
          text-sm font-medium whitespace-nowrap
          transition-all duration-300
          ${open ? "opacity-100 translate-x-0" : "opacity-0 w-0 overflow-hidden"}
        `}
      >
        {label}
      </span>
    </NavLink>
  );
}
