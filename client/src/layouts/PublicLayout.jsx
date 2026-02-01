import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
import Loader from "../admin/components/loader/Loader";

const Navbar = lazy(() => import("../components/Navbar"));
const Footer = lazy(() => import("../components/Footer"));

export default function PublicLayout() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center text-white py-10">
          <Loader />
        </div>
      }
    >
      <Navbar />

      <main className="bg-slate-950 text-slate-50 min-h-screen">
        <Outlet />
      </main>

      <Footer />
    </Suspense>
  );
}
