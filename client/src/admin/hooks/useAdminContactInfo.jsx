import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL;

export default function useAdminContactInfo() {
  const [contactInfo, setContactInfo] = useState(null);

  // 🔄 Loading states
  const [fetchLoading, setFetchLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);

  // 🟢 FETCH – Public
  const fetchContactInfo = async () => {
    try {
      setFetchLoading(true);

      const res = await axios.get(`${API}/api/contactinfo`);
      setContactInfo(res.data.info);

      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return null;
    } finally {
      setFetchLoading(false);
    }
  };

  // 🔒 ADD EMAIL
  const addEmail = async (email) => {
    try {
      setEmailLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API}/api/contactinfo/admin/email`,
        { email },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Add email response --------->", res.data);

      toast.success(res?.data?.message);
      setContactInfo(res.data.info);

      return { success: true };
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return { success: false };
    } finally {
      setEmailLoading(false);
    }
  };

  // 🔒 DELETE EMAIL
  //   const deleteEmail = async (email) => {
  //     try {
  //       const token = localStorage.getItem("token");

  //       const res = await axios.delete(
  //         `${API}/api/contactinfo/admin/delete/${email}`,
  //         { headers: { Authorization: `Bearer ${token}` } }
  //       );

  //       console.log("Delete email response --------->", res.data);

  //       toast.success(res?.data?.message);
  //       setContactInfo(res.data.info);

  //       return { success: true };
  //     } catch (error) {
  //       toast.error(error?.response?.data?.message);
  //       return { success: false };
  //     }
  //   };
  const deleteEmail = async (email) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(`${API}/api/contactinfo/admin/delete`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { email }, // 🔥 SAFE
      });

      toast.success(res.data.message);
      setContactInfo(res.data.info);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  // 🔒 ADD PHONE
  const addPhone = async (phone) => {
    try {
      setPhoneLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API}/api/contactinfo/admin/phone`,
        { phone },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Add phone response --------->", res.data);

      toast.success(res?.data?.message);
      setContactInfo(res.data.info);

      return { success: true };
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return { success: false };
    } finally {
      setPhoneLoading(false);
    }
  };

  // 🔒 DELETE PHONE
  //   const deletePhone = async (phone) => {
  //     try {
  //       const token = localStorage.getItem("token");

  //       const res = await axios.delete(
  //         `${API}/api/contactinfo/admin/delete/${phone}`,
  //         { headers: { Authorization: `Bearer ${token}` } }
  //       );

  //       console.log("Delete phone response --------->", res.data);

  //       toast.success(res?.data?.message);
  //       setContactInfo(res.data.info);

  //       return { success: true };
  //     } catch (error) {
  //       toast.error(error?.response?.data?.message);
  //       return { success: false };
  //     }
  //   };
  const deletePhone = async (phone) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(`${API}/api/contactinfo/admin/delete`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { phone }, // 🔥 SAFE
      });

      toast.success(res.data.message);
      setContactInfo(res.data.info);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  // 🔒 SET ADDRESS (single)
  const setAddress = async (address) => {
    try {
      setAddressLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API}/api/contactinfo/admin/address`,
        { address },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Add address response --------->", res.data);

      toast.success(res?.data?.message);
      setContactInfo(res.data.info);

      return { success: true };
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return { success: false };
    } finally {
      setAddressLoading(false);
    }
  };

  return {
    contactInfo,

    fetchLoading,
    emailLoading,
    phoneLoading,
    addressLoading,

    fetchContactInfo,
    addEmail,
    deleteEmail,
    addPhone,
    deletePhone,
    setAddress,
  };
}
