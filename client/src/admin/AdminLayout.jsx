import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AdminNavbar from "./components/AdminNavbar";
import { useState } from "react";

// export default function AdminLayout() {
//   return (
//     <div className="flex min-h-screen bg-slate-950 text-slate-200">
//       <Sidebar />

//       {/* Main Content Wrapper */}
//       <div
//         className="flex-1
//         overflow-y-auto
//         scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900"
//       >
//         {/* Content Card */}
//         <div
//           className="bg-slate-900/90 backdrop-blur
//           border border-slate-800
//           shadow-lg shadow-slate-900/50
//           min-h-[calc(100vh-56px)]
//           p-4 sm:p-6"
//         >
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function AdminLayout() {
//   return (
//     <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-200">
//       {/* Sidebar (own scroll) */}
//       <div className="h-screen overflow-y-auto scrollbar-slim">
//         <Sidebar />
//       </div>

//       {/* Main Content Wrapper (own scroll) */}
//       <div
//         className="flex-1 h-screen overflow-y-auto
//         scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900"
//       >
//         {/* Content Card */}
//         <div
//           className="bg-slate-900/90 backdrop-blur
//           border border-slate-800
//           shadow-lg shadow-slate-900/50
//           min-h-full
//           p-4 sm:p-6"
//         >
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// }

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const [pinMode, setPinMode] = useState(null);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-200">
      {/* Sidebar */}
      <Sidebar
        open={open}
        setOpen={setOpen}
        pinMode={pinMode}
        setPinMode={setPinMode}
      />

      {/* Right Area */}
      <div className="flex-1 overflow-y-auto scrollbar-slim">
        {/* Navbar */}
        <AdminNavbar
          open={open}
          pinMode={pinMode}
          setPinMode={setPinMode}
          setOpen={setOpen}
        />

        {/* Main Content */}
        <div className="flex-1 ">
          <div className="bg-slate-900/90 border border-slate-800 min-h-full p-4 sm:p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
