import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
// import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function useContactInfo() {
  const [fetchLoading, setFetchLoading] = useState(false);
  const [contactInfo, setContactInfo] = useState(null);

  // 🟢 FETCH CONTACT INFO (Public)
  const fetchContactInfo = async () => {
    try {
      setFetchLoading(true);

      const res = await axios.get(`${API}/api/contactinfo`);

      console.log("Contact info response -------->", res.data);
      // toast.success(res.data.message);
      // toast.success("Query submitted successfully");

      setContactInfo(res.data.info);
      return res.data;
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to load contact information",
      );
      return { success: false };
    } finally {
      setFetchLoading(false);
    }
  };

  return {
    contactInfo,
    fetchContactInfo,
    fetchLoading,
  };
}
