import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL;

export default function useQuery() {
  const [submitLoading, setSubmitLoading] = useState(false);

  const submitQuery = async (payload) => {
    try {
      setSubmitLoading(true);

      const res = await axios.post(`${API}/api/queries/submit`, payload);

      console.log("Submit querie response -------->", res.data);

      toast.success(res?.data?.message || "Query sent successfully");
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send query");
      return { success: false };
    } finally {
      setSubmitLoading(false);
    }
  };

  return {
    submitQuery,
    submitLoading,
  };
}
