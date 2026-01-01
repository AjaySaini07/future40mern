import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL;

export default function useAdminStories() {
  const token = localStorage.getItem("token");

  const [fetchLoading, setFetchLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // 🔹 FETCH STORIES (search + filter + pagination)
  const fetchStories = async ({
    page = 1,
    limit = 8,
    search = "",
    status = "all",
  } = {}) => {
    try {
      setFetchLoading(true);

      const res = await axios.get(`${API}/api/admin/all-stories`, {
        params: { page, limit, search, status },
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      console.log("Fetch all stories ----->", res.data);

      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch stories");
      return { success: false, stories: [] };
    } finally {
      setFetchLoading(false);
    }
  };

  // 🔹 APPROVE / UNAPPROVE (BOOLEAN BASED)
  const updateStatus = async (id, approved) => {
    try {
      setStatusLoading(true);

      const res = await axios.put(
        `${API}/api/admin/approve/${id}`,
        { approved }, // ✅ boolean
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log("Approve/Unapprove response -------->", res.data);

      if (res?.data?.success) {
        toast.success(res.data.message);
      }

      return res.data;
    } catch (error) {
      const msg = error?.response?.data?.message || "Status update failed";
      toast.error(msg);
      return { success: false };
    } finally {
      setStatusLoading(false);
    }
  };

  // 🔹 DELETE STORY
  const deleteStory = async (id) => {
    try {
      setDeleteLoading(true);

      const res = await axios.delete(`${API}/api/admin/delete/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      console.log("Delete storie response ------>", res.data);

      if (res?.data?.success) {
        toast.success(res.data.message);
      }

      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
      return { success: false };
    } finally {
      setDeleteLoading(false);
    }
  };

  return {
    fetchLoading,
    statusLoading,
    deleteLoading,
    fetchStories,
    updateStatus,
    deleteStory,
  };
}
