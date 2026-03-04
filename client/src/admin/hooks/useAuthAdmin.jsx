import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const useAuthAdmin = () => {
  const navigate = useNavigate();

  const [loginLoading, setLoginLoading] = useState(false);
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  // const [resendLoading, setResendLoading] = useState(false);

  // -------------------------- ADMIN LOGIN --------------------------
  const adminLogin = async (payload) => {
    try {
      setLoginLoading(true);

      const { data } = await axios.post(`${API}/api/auth/admin/login`, payload);

      if (data.success) {
        localStorage.setItem("token", data.token);
        toast.success(data.message || "Admin login successful");
        navigate("/admin/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoginLoading(false);
    }
  };

  // ------------------------ CHANGE PASSWORD ------------------------
  const changePassword = async (payload) => {
    try {
      setChangePasswordLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        `${API}/api/auth/admin/change-password`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }

      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Password change failed");
    } finally {
      setChangePasswordLoading(false);
    }
  };

  // ------------------------- FORGOT PASSWORD -----------------------
  const forgotPassword = async (payload) => {
    try {
      setForgotLoading(true);

      const { data } = await axios.post(
        `${API}/api/auth/admin/forgot-password`,
        payload,
      );

      if (data.success) {
        toast.success(data.message || "OTP sent to email");
      } else {
        toast.error(data.message);
      }

      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send OTP");
    } finally {
      setForgotLoading(false);
    }
  };

  // -------------------------- RESEND OTP ---------------------------
  // const resendOtp = async (payload) => {
  //   try {
  //     setResendLoading(true);

  //     const { data } = await axios.post(
  //       `${API}/api/auth/admin/resend-otp`,
  //       payload,
  //     );

  //     if (data.success) {
  //       toast.success(data.message);
  //     } else {
  //       toast.error(data.message);
  //     }

  //     return data;
  //   } catch (error) {
  //     toast.error(error?.response?.data?.message || "Resend OTP failed");
  //   } finally {
  //     setResendLoading(false);
  //   }
  // };

  // ------------------------- RESET PASSWORD ------------------------
  const resetPassword = async (payload) => {
    try {
      setResetLoading(true);

      const { data } = await axios.post(
        `${API}/api/auth/admin/reset-password`,
        payload,
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/admin/login");
      } else {
        toast.error(data.message);
      }

      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Reset password failed");
    } finally {
      setResetLoading(false);
    }
  };

  return {
    adminLogin,
    changePassword,
    forgotPassword,
    // resendOtp,
    resetPassword,

    loginLoading,
    changePasswordLoading,
    forgotLoading,
    // resendLoading,
    resetLoading,
  };
};
