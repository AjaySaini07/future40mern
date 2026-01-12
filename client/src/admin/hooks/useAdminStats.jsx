import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL;

export const useAdminStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAdminStats = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      console.log("Token", token);

      const res = await axios.get(`${API}/api/admin/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Dashboard stats response ----->", res.data);

      setStats(res.data.stats);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load stats");
    } finally {
      setLoading(false);
    }
  };

  return {
    stats,
    loading,
    fetchAdminStats,
  };
};
