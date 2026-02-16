import { useState, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";

const API = import.meta.env.VITE_API_URL;

export default function useStudentProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  // 🔥 FETCH PROFILE -------------------------------------------------------
  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API}/api/students/profile-details`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Fetch profile response ------->", res.data.student);

      setProfile(res.data.student);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔥 UPDATE STORY --------------------------------------------------------
  const updateStory = async (formData) => {
    try {
      setUpdateLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${API}/api/success-stories/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      toast.success(res.data.message);

      await fetchProfile(); // 🔄 safe now

      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setUpdateLoading(false);
    }
  };

  return { profile, loading, fetchProfile, updateStory, updateLoading };
}
