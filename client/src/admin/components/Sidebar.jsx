import { Link, useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";
import {
  ContactInfoIcon,
  CoursesIcon,
  DashboardIcon,
  EnrollmentIcon,
  FounderIcon,
  LogoutIcon,
  ProfileIcon,
  QueriesIcon,
  StarIcon,
  UsersIcon,
} from "../../icons/Icons";

export default function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <aside
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className={`bg-slate-900 text-white min-h-screen flex flex-col
    transition-all duration-300 ease-in-out overflow-y-auto scrollbar-slim
    ${open ? "w-48" : "w-16"}
  `}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-center gap-3 border-b border-slate-600">
        <ProfileIcon className="text-3xl" />
        {open && <h2 className="text-xl font-bold">Admin Panel</h2>}
      </div>

      {/* Navigation */}
      <nav className="mt-4 space-y-3 px-3">
        {/* Dashboard Icon */}
        <SidebarItem
          to="/admin/dashboard"
          icon={<DashboardIcon />}
          label="Dashboard"
          open={open}
        />

        {/* Courses Icon */}
        <SidebarItem
          to="/admin/courses"
          icon={<CoursesIcon />}
          label="Courses"
          open={open}
        />

        {/* Students Icon */}
        <SidebarItem
          to="/admin/students"
          icon={<UsersIcon />}
          label="Students"
          open={open}
        />

        {/* Success Stories Icon */}
        <SidebarItem
          to="/admin/stories"
          icon={<StarIcon />}
          label="Success Stories"
          open={open}
        />

        {/* Querys Icon */}
        <SidebarItem
          to="/admin/querys"
          icon={<QueriesIcon />}
          label="Querys"
          open={open}
        />

        {/* Founder Icon */}
        <SidebarItem
          to="/admin/founder"
          icon={<FounderIcon />}
          label="Founder"
          open={open}
        />

        {/* Contact Info Icon */}
        <SidebarItem
          to="/admin/contactinfo"
          icon={<ContactInfoIcon />}
          label="Contact Info"
          open={open}
        />

        {/* Enrollments Icon */}
        <SidebarItem
          to="/admin/enrollments"
          icon={<EnrollmentIcon />}
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
          <LogoutIcon className="text-2xl" />
          {open && <span>Logout</span>}
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
        `flex items-center gap-3 p-2 rounded-sm transition
         ${
           isActive
             ? "bg-slate-700 text-blue-400"
             : "hover:bg-slate-800 text-slate-300"
         }`
      }
    >
      <span className="text-2xl">{icon}</span>
      {open && (
        <span className="whitespace-nowrap text-sm font-medium">{label}</span>
      )}
    </NavLink>
  );
}
