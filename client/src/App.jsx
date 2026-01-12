import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import "./styles/toast.css";

/* Public */
import Home from "./pages/Home";

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

export default function App() {
  return (
    <>
      {/* 🔔 Global Toasts */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      />
      {/* <ToastContainer
        position="top-right"
        autoClose={2500}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
        style={{
          fontSize: "13px",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
        toastStyle={{
          background: "#020617", // slate-950
          color: "#e5e7eb", // slate-200
          border: "1px solid #334155", // slate-700
          borderRadius: "10px",
          padding: "10px 12px",
        }}
      /> */}

      <Routes>
        {/* Public Website */}
        <Route path="/" element={<Home />} />
        <Route path="/all-stories" element={<ViewAllStories />} />

        {/* Auth */}
        <Route path="/login" element={<StudentLogin />} />
        <Route path="/signup" element={<StudentSignup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
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
        </Route>
      </Routes>
    </>
  );
}
