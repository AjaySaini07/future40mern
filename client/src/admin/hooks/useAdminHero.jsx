import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
// import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL;

export default function useAdminHero() {
  const [getLoading, setGetLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  // -------------------------- GET HERO --------------------------
  const getHero = async () => {
    setGetLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API}/api/hero/admin/hero-info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Fetch Hero Response ------->", res.data);

      return res.data.hero;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch hero");
      return null;
    } finally {
      setGetLoading(false);
    }
  };

  // -------------------------- UPDATE HERO --------------------------
  const updateHero = async (formData) => {
    if (updateLoading) return false;

    setUpdateLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API}/api/hero/admin/hero-update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Add/Update Hero Response ------->", res.data);

      toast.success(res.data?.message || "Hero updated successfully");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Hero update failed");
      return false;
    } finally {
      setUpdateLoading(false);
    }
  };

  return {
    getHero,
    updateHero,
    getLoading,
    updateLoading,
  };
}
