import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
// import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL;

export default function useAdminFounder() {
  const [getLoading, setGetLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  // ------------------------- GET FOUNDER -------------------------
  const getFounder = async () => {
    setGetLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API}/api/founder/admin/founder-info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.founder;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch founder");
      return null;
    } finally {
      setGetLoading(false);
    }
  };

  // ------------------------ UPDATE FOUNDER -----------------------
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
        },
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
    getFounder,
    updateFounder,

    getLoading,
    updateLoading,
  };
}
