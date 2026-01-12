import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL;

export default function useAdminStudents() {
  const [students, setStudents] = useState([]);
  const [pagination, setPagination] = useState({});
  const [fetchLoading, setFetchLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // 🔹 FETCH STUDENTS --------------------------------------
  const fetchStudents = async ({
    page = 1,
    limit = 10,
    search = "",
    gender = "",
    story = "",
  }) => {
    try {
      setFetchLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(`${API}/api/students/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, limit, search, gender, story },
      });

      console.log("Fetch students response -------->", res.data);

      setStudents(res.data.students || []);
      setPagination(res.data.pagination || {});
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load students");
      return null;
    } finally {
      setFetchLoading(false);
    }
  };

  // 🔹 DELETE STUDENT ----------------------------------------------------
  const deleteStudent = async (id) => {
    try {
      setDeleteLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.delete(`${API}/api/students/admin/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(res?.data?.message || "Student deleted");

      setStudents((prev) => prev.filter((s) => s._id !== id));
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
      return false;
    } finally {
      setDeleteLoading(false);
    }
  };

  return {
    students,
    pagination,
    fetchLoading,
    deleteLoading,
    fetchStudents,
    deleteStudent,
  };
}
