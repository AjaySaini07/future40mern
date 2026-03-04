import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function useHero() {
  const [heroLoading, setHeroLoading] = useState(false);

  // ------------------------- Get Hero -------------------------
  const getHero = async () => {
    setHeroLoading(true);
    try {
      const res = await axios.get(`${API}/api/hero/hero-info`);

      console.log("Fetch hero response --------->", res.data);

      return res.data.hero;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to fetch hero");
      return null;
    } finally {
      setHeroLoading(false);
    }
  };

  return {
    getHero,
    heroLoading,
  };
}
