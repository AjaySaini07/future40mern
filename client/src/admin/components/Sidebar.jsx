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

// export default function Sidebar() {
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/admin/login");
//   };

//   return (
//     <aside
//       onMouseEnter={() => setOpen(true)}
//       onMouseLeave={() => setOpen(false)}
//       className={`bg-slate-950 text-white min-h-screen flex flex-col
//     transition-all duration-300 ease-in-out overflow-y-auto scrollbar-slim
//     ${open ? "w-48" : "w-16"}
//   `}
//     >
//       {/* Header */}
//       <div className="p-4 flex items-center justify-center gap-3 border-b border-slate-600">
//         <ProfileIcon className="text-3xl" />
//         {open && <h2 className="text-lg font-bold">Admin Panel</h2>}
//       </div>

//       {/* Navigation */}
//       <nav className="mt-4 space-y-2 px-3 overflow-y-auto scrollbar-slim">
//         {/* Dashboard Icon */}
//         <SidebarItem
//           to="/admin/dashboard"
//           icon={<DashboardIcon />}
//           label="Dashboard"
//           open={open}
//         />

//         {/* Hero Icon */}
//         <SidebarItem
//           to="/admin/hero"
//           icon={<HeroIcon />}
//           label="Hero Section"
//           open={open}
//         />

//         {/* Banners Icon */}
//         <SidebarItem
//           to="/admin/banners"
//           icon={<BannersIcon />}
//           label="Banners"
//           open={open}
//         />

//         {/* Courses Icon */}
//         <SidebarItem
//           to="/admin/courses"
//           icon={<CoursesIcon />}
//           label="Courses"
//           open={open}
//         />

//         {/* Students Icon */}
//         <SidebarItem
//           to="/admin/students"
//           icon={<UsersIcon />}
//           label="Students"
//           open={open}
//         />

//         {/* Success Stories Icon */}
//         <SidebarItem
//           to="/admin/stories"
//           icon={<StarIcon />}
//           label="Success Stories"
//           open={open}
//         />

//         {/* Querys Icon */}
//         <SidebarItem
//           to="/admin/querys"
//           icon={<QueriesIcon />}
//           label="Querys"
//           open={open}
//         />

//         {/* Founder Icon */}
//         <SidebarItem
//           to="/admin/founder"
//           icon={<FounderIcon />}
//           label="Founder"
//           open={open}
//         />

//         {/* Contact Info Icon */}
//         <SidebarItem
//           to="/admin/contactinfo"
//           icon={<ContactInfoIcon />}
//           label="Contact Info"
//           open={open}
//         />

//         {/* Enrollments Icon */}
//         <SidebarItem
//           to="/admin/enrollments"
//           icon={<EnrollmentIcon />}
//           label="Enrollments"
//           open={open}
//         />
//       </nav>

//       {/* Logout */}
//       <div className="mt-3 mb-4 px-4 flex justify-center">
//         <button
//           onClick={handleLogout}
//           className={`
//       flex items-center gap-3 p-2 rounded
//       hover:bg-red-600 transition
//       ${open ? "justify-start w-full" : "justify-center"}
//     `}
//         >
//           <LogoutIcon className="text-xl" />
//           {open && <span>Logout</span>}
//         </button>
//       </div>
//     </aside>
//   );
// }

// export default function Sidebar() {
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

        {/* <ProfileIcon
          className={`text-2xl
      ${open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"}
    `}
        /> */}

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
// function SidebarItem({ to, icon, label, open }) {
//   return (
//     <NavLink
//       to={to}
//       className={({ isActive }) =>
//         `flex items-center gap-1 px-2 py-0 rounded-sm transition
//          ${
//            isActive
//              ? "bg-slate-700 text-blue-400"
//              : "hover:bg-slate-800 text-slate-300"
//          }`
//       }
//     >
//       {/* ICON CONTAINER */}
//       <span
//         className="
//           w-10 h-10
//           flex items-center justify-center
//           rounded-sm
//         "
//       >
//         <span className="text-xl">{icon}</span>
//       </span>

//       {/* LABEL */}
//       {open && (
//         <span className="whitespace-nowrap text-sm font-medium">{label}</span>
//       )}
//     </NavLink>
//   );
// }
function SidebarItem({ to, icon, label, open }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        flex items-center rounded-sm transition-all duration-200
        ${open ? "gap-0 px-1 py-0" : "justify-center"}
          ${
            isActive
              ? "bg-slate-700 text-blue-400"
              : "hover:bg-slate-800 text-slate-300"
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
