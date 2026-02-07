import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import "./styles/toast.css";
import { Toaster, toast } from "sonner";

/* Public */
import Home from "./pages/Home";
import PublicLayout from "./layouts/PublicLayout";
import ScrollToTop from "./components/ScrollToTop";

/* Admin */
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminRoute from "./admin/AdminRoute";
import SuccessStoriesAdmin from "./admin/pages/SuccessStoriesAdmin";
import StudentLogin from "./pages/StudentLogin";
import StudentSignup from "./pages/StudentSignup";
import VerifyOtp from "./pages/VerifyOtp";
import ViewAllStories from "./components/ViewAllStories";
import AdminQueries from "./admin/pages/AdminQueries";
import ContactInfoAdmin from "./admin/pages/ContactInfoAdmin";
import ChangePassword from "./pages/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminFounder from "./admin/pages/AdminFounder";
import StudentAdmin from "./admin/pages/StudentsAdmin";
import Profile from "./pages/Profile";
import AdminBanners from "./admin/pages/AdminBanners";
import AdminHero from "./admin/pages/AdminHero";
import AdminChangePassword from "./admin/pages/AdminChangePassword";

export default function App() {
  return (
    <>
      {/* 🔔 Global Toasts */}
      {/* <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      /> */}

      <Toaster
        theme="dark"
        richColors
        position="top-center"
        expand={false}
        // visibleToasts={1}
        offset={64}
        toastOptions={{
          duration: 6000,
          style: {
            fontSize: "0.75rem",
          },
        }}
      />

      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-stories" element={<ViewAllStories />} />

        <Route path="/login" element={<StudentLogin />} />
        <Route path="/signup" element={<StudentSignup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="stories" element={<SuccessStoriesAdmin />} />
          <Route path="querys" element={<AdminQueries />} />
          <Route path="contactinfo" element={<ContactInfoAdmin />} />
          <Route path="founder" element={<AdminFounder />} />
          <Route path="students" element={<StudentAdmin />} />
          <Route path="banners" element={<AdminBanners />} />
          <Route path="hero" element={<AdminHero />} />
        </Route>
      </Routes> */}

      {/* 🔝 Auto scroll on route change */}
      <ScrollToTop />

      <Routes>
        {/* 🌍 Public Website (Navbar + Footer common) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/all-stories" element={<ViewAllStories />} />
        </Route>

        {/* Auth */}
        <Route path="/login" element={<StudentLogin />} />
        <Route path="/signup" element={<StudentSignup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/profile" element={<Profile />} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* 🔐 Admin Protected */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="stories" element={<SuccessStoriesAdmin />} />
          <Route path="querys" element={<AdminQueries />} />
          <Route path="contactinfo" element={<ContactInfoAdmin />} />
          <Route path="founder" element={<AdminFounder />} />
          <Route path="students" element={<StudentAdmin />} />
          <Route path="banners" element={<AdminBanners />} />
          <Route path="hero" element={<AdminHero />} />
          <Route path="change-password" element={<AdminChangePassword />} />
        </Route>
      </Routes>
    </>
  );
}
