import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

// export default function AdminLayout() {
//   return (
//     <div className="flex min-h-screen bg-slate-100">
//       <Sidebar />

//       {/* Main Content Wrapper */}
//       <div className="flex-1 p-2">
//         {/* Content Card */}
//         <div className="bg-slate-100 rounded-lg shadow-sm min-h-[calc(100vh-48px)] p-6">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// }
export default function AdminLayout() {
  // return (
  //   <div className="flex min-h-screen bg-slate-950 text-slate-200">
  //     <Sidebar />

  //     {/* Main Content Wrapper */}
  //     <div className="flex-1 pl-1">
  //       {/* Content Card */}
  //       <div
  //         className="bg-slate-900 border border-slate-800
  //          shadow-lg min-h-[calc(100vh-56px)]
  //         p-4 sm:p-6"
  //       >
  //         <Outlet />
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200">
      <Sidebar />

      {/* Main Content Wrapper */}
      <div
        className="flex-1 pl-1
        overflow-y-auto
        scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900"
      >
        {/* Content Card */}
        <div
          className="bg-slate-900/90 backdrop-blur
          border border-slate-800 rounded
          shadow-lg shadow-slate-900/50
          min-h-[calc(100vh-56px)]
          p-4 sm:p-6"
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
