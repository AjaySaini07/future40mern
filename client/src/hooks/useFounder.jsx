import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
// import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function useFounder() {
  const [getFounderLoading, setGetFounderLoading] = useState(false);

  // ------------------------- GET FOUNDER -------------------------
  const getFounder = async () => {
    setGetFounderLoading(true);
    try {
      const res = await axios.get(`${API}/api/founder/founder-info`);

      console.log("Fetch founder response --------->", res.data);

      return res.data.founder;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to fetch founder");
      return null;
    } finally {
      setGetFounderLoading(false);
    }
  };

  return {
    getFounder,
    getFounderLoading,
  };
}
