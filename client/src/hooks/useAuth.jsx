import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL;

export default function useAuth() {
  const [signupLoading, setSignupLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  /* ================= SIGNUP ================= */
  const signup = async (payload) => {
    if (signupLoading) return { success: false };

    setSignupLoading(true);
    try {
      const res = await axios.post(`${API}/api/students/signup`, payload);
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
      const res = await axios.post(`${API}/api/students/verify-otp`, {
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
      const res = await axios.post(`${API}/api/students/resend-otp`, { email });

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
      const res = await axios.post(`${API}/api/students/login`, data);
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

  /* ================= CHANGE PASSWORD ================= */
  const changePassword = async (payload) => {
    if (changePasswordLoading) return { success: false };

    setChangePasswordLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API}/api/students/change-password`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message || "Password changed successfully");

      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || "Password change failed");
      return { success: false };
    } finally {
      setChangePasswordLoading(false);
    }
  };

  /* ================= FORGOT PASSWORD ================= */
  const forgotPassword = async (email) => {
    if (forgotLoading) return { success: false };

    setForgotLoading(true);
    try {
      const res = await axios.post(`${API}/api/students/forgot-password`, {
        email,
      });

      toast.success(res.data?.message || "OTP sent to email");
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
      return { success: false };
    } finally {
      setForgotLoading(false);
    }
  };

  /* ================= RESET PASSWORD ================= */
  const resetPassword = async (payload) => {
    if (resetLoading) return { success: false };

    setResetLoading(true);
    try {
      const res = await axios.post(
        `${API}/api/students/reset-password`,
        payload
      );

      toast.success(res.data?.message || "Password reset successful");
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || "Password reset failed");
      return { success: false };
    } finally {
      setResetLoading(false);
    }
  };

  return {
    // actions
    signup,
    verifyOtp,
    resendOtp,
    login,
    changePassword,
    forgotPassword,
    resetPassword,

    // loading states
    signupLoading,
    verifyLoading,
    resendLoading,
    loginLoading,
    changePasswordLoading,
    forgotLoading,
    resetLoading,
  };
}
