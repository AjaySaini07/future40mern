import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL;

export default function useAuth() {
  const [signupLoading, setSignupLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  /* ================= SIGNUP ================= */
  const signup = async (payload) => {
    if (signupLoading) return { success: false };

    setSignupLoading(true);
    try {
      const res = await axios.post(`${API}/api/student/signup`, payload);
      console.log("Signup console ----->", res);

      toast.success(res.data.message || "OTP sent to email");
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
      return { success: false };
    } finally {
      setSignupLoading(false);
    }
  };

  /* ================= VERIFY OTP ================= */
  const verifyOtp = async ({ email, otp }) => {
    if (verifyLoading) return { success: false };

    setVerifyLoading(true);
    try {
      const res = await axios.post(`${API}/api/student/verify-otp`, {
        email,
        otp,
      });

      toast.success(res.data.message || "OTP verified");
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
      return { success: false };
    } finally {
      setVerifyLoading(false);
    }
  };

  /* ================= RESEND OTP ================= */
  const resendOtp = async (email) => {
    if (resendLoading) return { success: false };

    setResendLoading(true);
    try {
      const res = await axios.post(`${API}/api/student/resend-otp`, { email });

      toast.success(res.data.message || "OTP resent");
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
      return { success: false };
    } finally {
      setResendLoading(false);
    }
  };

  /* ================= LOGIN ================= */
  const login = async (data) => {
    if (loginLoading) return { success: false };

    setLoginLoading(true);
    try {
      const res = await axios.post(`${API}/api/student/login`, data);
      console.log("Login response ---->", res);

      toast.success(res.data.message || "Login successful");

      // Token Save In Local Storage
      localStorage.setItem("token", res.data.token);

      return {
        success: true,
        user: res.data.student,
      };
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      return { success: false };
    } finally {
      setLoginLoading(false);
    }
  };

  return {
    // actions
    signup,
    verifyOtp,
    resendOtp,
    login,

    // loading states
    signupLoading,
    verifyLoading,
    resendLoading,
    loginLoading,
  };
}
