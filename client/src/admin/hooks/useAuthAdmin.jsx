import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const useAuthAdmin = () => {
  const [loginLoading, setLoginLoading] = useState(false);
  const navigate = useNavigate();

  const adminLogin = async (payLoad) => {
    try {
      setLoginLoading(true);

      const res = await axios.post(`${API}/api/auth/login`, payLoad);

      console.log("Admin login response ---->", res.data);

      const response = res.data;

      if (response.success && response.role === "admin") {
        localStorage.setItem("token", response.token);

        toast.success(response?.message || "Admin login successful");
        navigate("/admin/dashboard");
      } else {
        toast.error("Admin access denied");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoginLoading(false);
    }
  };

  return {
    adminLogin,
    loginLoading,
  };
};
