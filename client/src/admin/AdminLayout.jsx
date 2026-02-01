import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

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

export default function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-200">
      {/* Sidebar (own scroll) */}
      <div className="h-screen overflow-y-auto scrollbar-slim">
        <Sidebar />
      </div>

      {/* Main Content Wrapper (own scroll) */}
      <div
        className="flex-1 h-screen overflow-y-auto
        scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900"
      >
        {/* Content Card */}
        <div
          className="bg-slate-900/90 backdrop-blur
          border border-slate-800 
          shadow-lg shadow-slate-900/50
          min-h-full
          p-4 sm:p-6"
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
