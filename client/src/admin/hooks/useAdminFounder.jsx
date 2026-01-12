import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL;

export default function useAdminFounder() {
  // 🔄 separate loading states
  const [getLoading, setGetLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  /* ================= GET FOUNDER ================= */
  const getFounder = async () => {
    setGetLoading(true);
    try {
      const res = await axios.get(`${API}/api/founder/founder-info`);
      return res.data.founder;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch founder");
      return null;
    } finally {
      setGetLoading(false);
    }
  };

  /* ================= UPDATE FOUNDER (ADMIN) ================= */
  const updateFounder = async (formData) => {
    if (updateLoading) return false;

    setUpdateLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API}/api/founder/admin/founder-update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data?.message || "Founder updated");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Founder update failed");
      return false;
    } finally {
      setUpdateLoading(false);
    }
  };

  return {
    // actions
    getFounder,
    updateFounder,

    // loading states
    getLoading,
    updateLoading,
  };
}
