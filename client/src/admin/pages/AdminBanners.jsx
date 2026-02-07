import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";

import useAdminBanners from "../hooks/useAdminBanners";
import ConfirmModal from "../components/ConfirmModal";
import UpdateConfirmModal from "../components/UpdateConfirmModal";
import { CrossIcon, DeleteIcon } from "../../icons/Icons";
import Loader from "../components/loader/Loader";

export default function AdminBanners() {
  const {
    getBanners,
    addBanner,
    deleteBanner,
    toggleBanner,
    getLoading,
    addLoading,
    deleteLoading,
    toggleLoading,
  } = useAdminBanners();

  const [banners, setBanners] = useState([]);
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [viewImage, setViewImage] = useState(null);

  const [deleteItem, setDeleteItem] = useState(null);

  const [fileKey, setFileKey] = useState(Date.now());

  // 🔄 toggle confirmation
  const [openUpdate, setOpenUpdate] = useState(false);
  const [updateItem, setUpdateItem] = useState(null);
  const [nextStatus, setNextStatus] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm();

  /* ================= FETCH ================= */
  const fetchBanners = async () => {
    const data = await getBanners();
    setBanners(data);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  /* ================= ADD ================= */
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    const ok = await addBanner(formData);

    if (ok) {
      fetchBanners();
    }

    closeModal();
  };

  /* ================= TOGGLE CONFIRM ================= */
  const openToggleConfirm = (banner) => {
    setUpdateItem(banner);
    setNextStatus(!banner.isActive);
    setOpenUpdate(true);
  };

  const handleToggleConfirm = async () => {
    if (!updateItem) return;

    const ok = await toggleBanner(updateItem._id);
    if (ok) {
      setOpenUpdate(false);
      setUpdateItem(null);
      fetchBanners();
    }
  };

  const closeModal = () => {
    // close modal first
    setOpen(false);

    // reset react-hook-form
    reset({
      image: null,
    });

    // clear validation
    clearErrors();

    // clear preview
    setPreview(null);

    // hard reset file input
    setFileKey(Date.now());
  };

  return (
    <div className="text-slate-200 min-h-screen">
      {/* -------------- HEADER -------------- */}
      <div className="flex justify-between items-end mb-6">
        <h1 className="text-2xl font-semibold">All Banners</h1>

        <motion.button
          whileTap={{ scale: 0.92 }}
          // whileHover={{ scale: 1.02 }}
          onClick={() => setOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 font-semibold rounded-sm transition-all duration-300"
        >
          Add Banner
        </motion.button>
      </div>

      {/* --------------- BANNER LIST --------------- */}
      {getLoading ? (
        <div className="w-full flex justify-center">
          <Loader />
        </div>
      ) : banners.length === 0 ? (
        <div className="py-8 bg-slate-800 rounded-sm flex flex-col items-center justify-center text-center">
          <p className="text-slate-400 text-lg">No banner found...!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 border border-slate-700 rounded-md p-6">
          <AnimatePresence>
            {banners.map((banner) => (
              <motion.div
                key={banner._id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                whileHover={{ y: -2 }}
                className="
            bg-slate-800 rounded-md overflow-hidden shadow-md
            flex flex-col
            transition
          "
              >
                {/* IMAGE */}
                <div className="relative group">
                  <img
                    src={banner.image.url}
                    alt="Banner"
                    onClick={() => setViewImage(banner.image.url)}
                    className="
                w-full h-44 sm:h-40 md:h-44
                object-cover cursor-pointer
                group-hover:opacity-90
                transition
              "
                  />

                  {/* POSITION BADGE */}
                  <span
                    className="
                absolute top-2 left-2
                bg-black/70 text-white
                text-xs px-2 py-0.5 rounded-sm
              "
                  >
                    #{banner.order}
                  </span>
                </div>

                {/* ACTIONS BUTTONS */}
                <div className="p-4 flex flex-col gap-3 flex-1">
                  <div className="flex justify-between items-center">
                    {/* ACTIVE / INACTIVE */}
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      // whileHover={{ scale: 1.05 }}
                      disabled={toggleLoading === banner._id}
                      onClick={() => openToggleConfirm(banner)}
                      className={`px-3.5 py-1.5 rounded-sm text-sm font-semibold transition
                  ${
                    banner.isActive
                      ? "bg-green-600/90 text-white"
                      : "bg-yellow-500/90 text-white"
                  }
                  ${
                    toggleLoading === banner._id
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:opacity-80"
                  }
                `}
                    >
                      {toggleLoading === banner._id
                        ? "Updating..."
                        : banner.isActive
                          ? "Active"
                          : "Inactive"}
                    </motion.button>

                    {/* DELETE */}
                    <motion.button
                      // whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => setDeleteItem(banner)}
                      className="
                  py-2 px-2.5 rounded-sm
                  text-white bg-red-600/80
                  hover:bg-red-600
                  transition
                "
                    >
                      <DeleteIcon />
                    </motion.button>
                  </div>

                  {/* META INFO */}
                  <div className="text-xs text-slate-400 break-all">
                    ID: {banner._id}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/*--------------- ADD BANNER MODAL--------------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/90 shadow-2xl flex items-center justify-center z-50"
          >
            <motion.form
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-1.5 relative bg-slate-900/90 backdrop-blur
          border border-slate-800
          rounded-sm w-full max-w-md p-6
          shadow-lg shadow-slate-900/50"
            >
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-3 right-3 text-slate-400 hover:text-white"
              >
                <CrossIcon size={20} />
              </button>

              <h2 className="text-lg font-semibold">Add Banner</h2>

              <input
                key={fileKey}
                type="file"
                accept="image/*"
                {...register("image", {
                  required: "Banner image required",
                  validate: {
                    size: (files) =>
                      files[0]?.size < 5 * 1024 * 1024 || "Max 5MB allowed",
                    type: (files) =>
                      ["image/jpeg", "image/png", "image/webp"].includes(
                        files[0]?.type,
                      ) || "Only JPG / PNG / WEBP allowed",
                  },
                })}
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  clearErrors("image");

                  if (!file) {
                    setPreview(null);
                    return;
                  }

                  setPreview(URL.createObjectURL(file));
                }}
                className="block w-full text-sm text-slate-400
                               file:mr-4 file:py-1 file:px-3
                               file:rounded-sm file:border-0
                               file:bg-slate-800 file:text-white
                               hover:file:bg-slate-700 rounded-sm bg-slate-950
                 border border-slate-700 outline-none focus:border-blue-600 transition duration-500
                 px-2 py-1.5"
              />

              {errors.image && (
                <p className="text-xs text-red-500 -mt-1">
                  {errors.image.message}
                </p>
              )}

              {preview && (
                <img
                  src={preview}
                  alt=""
                  className="h-40 w-full object-cover rounded-sm"
                />
              )}

              <div className="flex justify-end gap-3 pt-4">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={closeModal}
                  className="px-3 py-1.5 text-sm font-semibold rounded-sm text-white bg-slate-600 hover:bg-slate-700 transition"
                >
                  Cancel
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  disabled={addLoading}
                  className={`px-3 py-1.5 text-sm font-semibold rounded-sm transition
    ${
      addLoading
        ? "bg-indigo-600 opacity-60 cursor-not-allowed"
        : "bg-indigo-600 hover:bg-indigo-800 cursor-pointer"
    }
  `}
                >
                  {addLoading ? "Adding..." : "Add Banner"}
                </motion.button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {/*--------------- IMAGE PREVIEW--------------- */}
      <AnimatePresence>
        {viewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewImage(null)}
            className="
        fixed inset-0 z-50
        bg-black/90
        flex items-center justify-center
        px-3 sm:px-6 md:px-10
      "
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              src={viewImage}
              alt="Banner Preview"
              className="
          w-auto h-auto
          max-h-[85vh] sm:max-h-[90vh]
          max-w-full sm:max-w-[90vw]
          rounded-md
          object-contain
          shadow-2xl
        "
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* --------------- DELETE CONFIRM --------------- */}
      <ConfirmModal
        open={!!deleteItem}
        title="Delete Banner?"
        message="Are you sure you want to delete this banner?"
        loading={deleteLoading}
        onCancel={() => setDeleteItem(null)}
        onConfirm={async () => {
          const ok = await deleteBanner(deleteItem._id);
          if (ok) {
            setDeleteItem(null);
            fetchBanners();
          }
        }}
      />

      {/*--------------- TOGGLE CONFIRM--------------- */}
      <UpdateConfirmModal
        open={openUpdate}
        title={nextStatus ? "Activate Banner" : "Inactivate Banner"}
        message={`Are you sure you want to ${
          nextStatus ? "activate" : "inactivate"
        } this banner?`}
        confirmText={nextStatus ? "Activate" : "Inactivate"}
        loading={toggleLoading === updateItem?._id}
        onConfirm={handleToggleConfirm}
        onCancel={() => setOpenUpdate(false)}
      />
    </div>
  );
}
