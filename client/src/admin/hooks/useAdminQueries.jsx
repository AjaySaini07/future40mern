import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL;

export default function useAdminQueries() {
  const [queries, setQueries] = useState([]);

  // 🔄 Loading states
  const [fetchLoading, setFetchLoading] = useState(false);
  const [replyLoading, setReplyLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // 🔹 FETCH (pagination + search + filter)
  const fetchQueries = async (page, search, status, limit) => {
    try {
      setFetchLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API}/api/queries/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          page,
          limit,
          search,
          status,
        },
      });

      console.log("All quires response ------->", res.data);

      setQueries(res.data.queries || []);
      return res.data; // pagination info ke liye
    } catch {
      toast.error("Failed to load queries");
      return null;
    } finally {
      setFetchLoading(false);
    }
  };

  // 🔹 REPLY QUERY
  const replyQuery = async (id, reply) => {
    try {
      setReplyLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API}/api/queries/admin/reply/${id}`,
        { reply },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(res?.data?.message || "Reply sent");
      return { success: true };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send reply");
      return { success: false };
    } finally {
      setReplyLoading(false);
    }
  };

  // 🔹 DELETE QUERY
  const deleteQuery = async (id) => {
    try {
      setDeleteLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.delete(`${API}/api/queries/admin/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(res?.data?.message || "Query deleted");

      setQueries((prev) => prev.filter((q) => q._id !== id));
      return { success: true };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete query");
      return { success: false };
    } finally {
      setDeleteLoading(false);
    }
  };

  return {
    queries,
    fetchLoading,
    replyLoading,
    deleteLoading,
    fetchQueries,
    replyQuery,
    deleteQuery,
  };
}
