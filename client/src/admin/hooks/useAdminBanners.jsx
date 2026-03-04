import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
// import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function useAdminBanners() {
  const [getLoading, setGetLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [toggleLoading, setToggleLoading] = useState(false);

  // ------------------------- GET ALL BANNERS -------------------------
  const getBanners = async () => {
    setGetLoading(true);
    try {
      const res = await axios.get(`${API}/api/banner/admin/all-banners`);

      console.log("Fetch banner response ------->", res.data);

      return res.data.banners || [];
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch banners");
      return [];
    } finally {
      setGetLoading(false);
    }
  };

  // ------------------------ ADD BANNER (ADMIN) ------------------------
  const addBanner = async (formData) => {
    if (addLoading) return false;
    setAddLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API}/api/banner/admin/add-banner`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Add banner response ------->", res.data);

      toast.success(res?.data?.message || "Banner added successfully");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Banner upload failed");
      return false;
    } finally {
      setAddLoading(false);
    }
  };

  // --------------------- ACTIVE / INACTIVE (ADMIN) ---------------------
  const toggleBanner = async (id) => {
    if (toggleLoading) return false;

    setToggleLoading(id);
    try {
      const token = localStorage.getItem("token");

      const res = await axios.patch(
        `${API}/api/banner/admin/toggle/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(res.data.message);
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to toggle banner");
      return false;
    } finally {
      setToggleLoading(null);
    }
  };

  // --------------------------- DELETE BANNER ---------------------------
  const deleteBanner = async (id) => {
    if (deleteLoading) return false;
    setDeleteLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(
        `${API}/api/banner/admin/delete-banner/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Delete banner response ------->", res.data);

      toast.success(res?.data?.message || "Banner deleted");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete banner");
      return false;
    } finally {
      setDeleteLoading(false);
    }
  };

  return {
    getBanners,
    addBanner,
    deleteBanner,
    toggleBanner,

    getLoading,
    addLoading,
    deleteLoading,
    toggleLoading,
  };
}
