import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL;

export const useSuccessStory = () => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);

  // ---------------- SUBMIT STORY ----------------
  const submitStory = async (payLoad) => {
    try {
      setSubmitLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API}/api/success-stories/submit`,
        payLoad,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(res?.data?.message || "Story submitted for review");
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return { success: false };
    } finally {
      setSubmitLoading(false);
    }
  };

  // ---------------- FETCH APPROVED STORIES ----------------
  const fetchStory = async ({ page = 1, limit = 8, search = "" } = {}) => {
    try {
      setFetchLoading(true);

      const res = await axios.get(`${API}/api/success-stories/approved`, {
        params: { page, limit, search },
      });

      console.log("Fetch story response ------->", res.data);
      return res.data; // { success, stories, pagination }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch stories ❌"
      );
      return { success: false, stories: [] };
    } finally {
      setFetchLoading(false);
    }
  };

  return {
    submitStory,
    fetchStory,
    submitLoading,
    fetchLoading,
  };
};
