import { useState, useRef, useEffect } from "react";
import useAdminStories from "../hooks/useAdminStories";
import ConfirmModal from "../components/ConfirmModal";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaStar, FaTimes } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Select from "react-select";
import { IoMdSearch } from "react-icons/io";
import UpdateConfirmModal from "../components/UpdateConfirmModal";
import { BsEmojiTearFill } from "react-icons/bs";
import { CrossIcon } from "../../icons/Icons";
import AdminLoader from "../components/loader/AdminLoader";

const cardVariant = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  hover: {
    y: -3,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const backdropVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariant = {
  hidden: { opacity: 0, scale: 0.9, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 40,
    transition: { duration: 0.2 },
  },
};

export default function SuccessStoriesAdmin() {
  const {
    fetchStories,
    updateStatus,
    deleteStory: deleteSuccessStory,
    fetchLoading,
    statusLoading,
    deleteLoading,
  } = useAdminStories();

  const [stories, setStories] = useState([]);
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [viewImage, setViewImage] = useState(null);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("all");
  const [viewStory, setViewStory] = useState(null);
  const modalRef = useRef(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [storyToDelete, setStoryToDelete] = useState(null);

  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const isCurrentlyApproved = selectedStory?.approved;

  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const filterOptions = [
    { value: "all", label: "All Stories" },
    { value: "approved", label: "Approved" },
    { value: "unapproved", label: "Unapproved" },
  ];

  const loadStories = async () => {
    const res = await fetchStories({
      page: currentPage,
      limit: 8,
      search,
      status: filter,
    });

    if (res?.success) {
      setStories(res.stories || []);
      setTotalPages(res.pagination?.totalPages || 1);
    }
  };

  useEffect(() => {
    loadStories();
  }, [currentPage, search, filter]);

  const getVisiblePages = (current, total, delta = 2) => {
    const pages = [];

    const start = Math.max(1, current - delta);
    const end = Math.min(total, current + delta);

    // First page
    if (start > 1) {
      pages.push(1);
    }

    // Left dots
    if (start > 2) {
      pages.push("...");
    }

    // Middle pages (STRICT ORDER)
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Right dots
    if (end < total - 1) {
      pages.push("...");
    }

    // Last page
    if (end < total) {
      pages.push(total);
    }

    return pages;
  };

  useEffect(() => {
    fetchStories({ page: currentPage, limit: 8, search }).then((res) => {
      if (res?.success) {
        setStories(res.stories);
        setTotalPages(res.pagination.totalPages);
      }
    });
  }, [currentPage, search]);

  // Outside click close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setViewStory(null);
      }
    };

    if (viewStory) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [viewStory]);

  // Handle apprive/unapprove function
  const handleUpdate = async () => {
    if (!selectedStory) return;

    const newStatus = !selectedStory.approved;

    await updateStatus(selectedStory._id, newStatus);

    setOpenUpdate(false);
    setSelectedStory(null);

    loadStories();
  };

  // Handle delete function
  const handleDeleteConfirm = async () => {
    if (!storyToDelete) return;

    const res = await deleteSuccessStory(storyToDelete._id);

    if (res?.success) {
      loadStories(); // refresh list
    }

    setShowDeleteModal(false);
    setStoryToDelete(null);
  };

  return (
    <>
      <div className="space-y-4 min-h-screen">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <h1 className="text-2xl font-semibold text-blue-400 pt-1">
            All Success Stories
          </h1>

          <div className="flex flex-wrap gap-3">
            {/* Search */}
            <div className="relative w-64">
              <IoMdSearch
                className="absolute left-3 top-1/2 -translate-y-1/2
    text-slate-400 text-lg"
              />

              <input
                type="text"
                placeholder="Search by name, story..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 rounded bg-slate-900 border border-slate-700 outline-none focus:border-slate-400 transition duration-500 px-4 py-2 text-sm text-white"
              />
            </div>

            {/* Filter */}
            <Select
              value={filterOptions.find((opt) => opt.value === filter)}
              onChange={(selected) => setFilter(selected.value)}
              options={filterOptions}
              isSearchable={false}
              className="w-36 text-sm"
              classNamePrefix="react-select"
              styles={{
                control: (base, state) => ({
                  ...base,
                  backgroundColor: "#0f172a", // slate-900

                  borderColor: state.isFocused ? "#94a3b8" : "#334155",

                  boxShadow: "none",
                  minHeight: "30px",
                  cursor: "pointer",

                  transition: "all 500ms ease",

                  ":hover": {
                    borderColor: state.isFocused ? "#94a3b8" : "#334155",
                  },
                }),

                menu: (base) => ({
                  ...base,
                  backgroundColor: "#020617",
                  border: "1px solid #334155",
                  marginTop: "4px",
                  zIndex: 50,
                }),

                menuList: (base) => ({
                  ...base,
                  paddingTop: "4px",
                  paddingBottom: "4px",
                }),

                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected
                    ? "#334155"
                    : state.isFocused
                      ? "#1e293b"
                      : "#020617",
                  color: "#e5e7eb",
                  cursor: "pointer",
                  padding: "6px 10px",
                }),

                singleValue: (base) => ({
                  ...base,
                  color: "#e5e7eb",
                }),

                placeholder: (base) => ({
                  ...base,
                  color: "#94a3b8",
                }),

                indicatorSeparator: () => ({
                  display: "none",
                }),

                dropdownIndicator: (base, state) => ({
                  ...base,
                  color: state.isFocused ? "#e5e7eb" : "#94a3b8",
                  transition: "color 300ms ease",
                  ":hover": {
                    color: state.isFocused ? "#e5e7eb" : "#94a3b8",
                  },
                }),
              }}
            />
          </div>
        </div>

        {/* Loading State */}
        {fetchLoading && (
          <div className="min-h-screen w-full flex justify-center">
            <AdminLoader />
          </div>
        )}

        {/* No Storie Found */}
        {!fetchLoading && stories.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="col-span-full flex justify-center py-24"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="bg-gradient-to-b from-slate-900 to-slate-950
      border border-slate-800 rounded-md
      px-8 py-6 text-center shadow-lg shadow-slate-900/50"
            >
              <BsEmojiTearFill className="text-5xl mx-auto text-blue-500 hover:text-blue-700 transition-all duration-500 cursor-pointer " />
              <p className="text-slate-400 italic text-lg font-medium mt-3">
                "No Success Stories Found..!"
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* Cards Grid */}
        {!fetchLoading && stories.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 border-t border-slate-800 pt-4 rounded-sm">
            {stories.map((story) => (
              <motion.div
                key={story._id}
                variants={cardVariant}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="relative
    bg-gradient-to-b from-slate-900 to-slate-950
    border border-slate-800 hover:border-cyan-500/30 shadow-lg hover:shadow-cyan-900/20
    rounded-md p-4 text-center"
              >
                {/* Status Badge */}
                <span
                  className={`absolute top-2 right-2
          text-[10px] px-2 py-0.5 rounded-full font-semibold
          ${
            story.approved
              ? "bg-green-900/40 text-green-400"
              : "bg-yellow-900/40 text-yellow-400"
          }`}
                >
                  {story.approved ? "Approved" : "Rejected"}
                </span>

                {/* Photo */}
                <img
                  src={story.photo.url}
                  alt="Student Photo"
                  onClick={() => setViewImage(story.photo.url)}
                  className="w-16 h-16 mx-auto rounded-full text-sm
          border-2 border-slate-700 object-cover cursor-pointer
                hover:opacity-70
                transition-all duration-300"
                />

                {/* Rating */}
                <div className="flex justify-center gap-1 mt-3">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FaStar
                      key={index}
                      className={
                        index < story.rating
                          ? "text-yellow-400 drop-shadow-[0_0_3px_rgba(250,204,21,0.5)]"
                          : "text-slate-600"
                      }
                    />
                  ))}
                </div>

                {/* Name */}
                <div className="flex justify-center mt-2">
                  <h3
                    className="
      px-4 py-0.5 rounded-full
      text-xs sm:text-sm font-semibold
      bg-blue-500/10 bg-clip-text
tracking-wide
      text-blue-400
      border border-blue-500/20
    "
                  >
                    {story.name}
                  </h3>
                </div>

                {/* Story */}
                <div
                  className="relative mt-2 px-3 py-2.5
          bg-slate-800/20 border border-slate-900
          rounded-md backdrop-blur-sm"
                >
                  <span className="absolute -top-3 left-3 text-3xl text-blue-500/40 font-serif">
                    “
                  </span>

                  <p
                    className="text-slate-300 text-xs sm:text-sm
             leading-normal text-justify tracking-wide
            line-clamp-4"
                  >
                    {story.story}
                  </p>

                  <span className="absolute -bottom-7 right-3 text-3xl text-blue-500/40 font-serif">
                    ”
                  </span>
                </div>

                {/* Actions Buttons */}
                <div className="mt-3 flex justify-center gap-2">
                  {/* Approve / Reject */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedStory(story);
                      setOpenUpdate(true);
                    }}
                    className={`px-3.5 py-1.5 rounded-xs text-xs font-medium
    ${
      story.approved
        ? "bg-yellow-700 hover:bg-yellow-600"
        : "bg-green-600 hover:bg-green-700"
    }`}
                  >
                    {story.approved ? "Reject" : "Approve"}
                  </motion.button>

                  {/* View */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    // whileHover={{ scale: 1.05 }}
                    onClick={() => setViewStory(story)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xs
            bg-slate-800 hover:bg-slate-700 text-sm text-slate-200"
                  >
                    <FaEye className="text-sm" />
                  </motion.button>

                  {/* Delete */}
                  <motion.button
                    onClick={() => {
                      setStoryToDelete(story);
                      setShowDeleteModal(true);
                    }}
                    whileTap={{ scale: 0.95 }}
                    // whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xs
            bg-red-600 hover:bg-red-500 text-sm text-white"
                  >
                    <RiDeleteBin6Line className="text-sm" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-14 flex-wrap">
            {/* Prev */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md border border-slate-700 text-slate-400 hover:text-white disabled:opacity-40"
            >
              Prev
            </button>

            {getVisiblePages(currentPage, totalPages).map((page, i) =>
              page === "..." ? (
                <span
                  key={`dots-${currentPage}-${i}`}
                  className="px-2 text-slate-500"
                >
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`
        px-3 py-1 rounded-md text-sm font-medium transition
        ${
          currentPage === page
            ? "bg-blue-500 text-white"
            : "border border-slate-700 text-slate-400 hover:text-white"
        }
      `}
                >
                  {page}
                </button>
              ),
            )}

            {/* Next */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md border border-slate-700 text-slate-400 hover:text-white disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>

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

      {/* Delete Confirm Modal */}
      <ConfirmModal
        open={showDeleteModal}
        title="Delete This Story..!"
        message="Are you sure you want to delete this success story? This action cannot be undone."
        loading={deleteLoading}
        onCancel={() => {
          setShowDeleteModal(false);
          setStoryToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
      />

      {/* Update Confirm Modal */}
      <UpdateConfirmModal
        open={openUpdate}
        title={
          isCurrentlyApproved
            ? "Unapprove Success Story"
            : "Approve Success Story"
        }
        message={`Are you sure you want to ${
          isCurrentlyApproved ? "unapprove" : "approve"
        } this success story?`}
        confirmText={isCurrentlyApproved ? "Unapprove" : "Approve"}
        loading={statusLoading}
        onConfirm={handleUpdate}
        onCancel={() => {
          setOpenUpdate(false);
          setSelectedStory(null);
        }}
      />

      {/* View Story Modal */}
      <AnimatePresence>
        {viewStory && (
          <motion.div
            variants={backdropVariant}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 z-50 bg-black/70
      flex items-center justify-center px-4"
          >
            <motion.div
              ref={modalRef}
              variants={modalVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative bg-slate-900 border border-slate-700
        rounded-md max-w-lg sm:max-w-xl w-full p-4 [@media(min-width:480px)]:p-6"
            >
              <button
                onClick={() => setViewStory(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-transform duration-300 hover:scale-105"
              >
                <CrossIcon className="text-lg [@media(min-width:400px)]:text-2xl" />
              </button>

              {/* Header */}
              <div className="w-full flex items-center gap-2 sm:gap-3">
                {/* Image */}
                <img
                  src={viewStory.photo.url}
                  className="w-13 h-13 [@media(min-width:400px)]:w-15 [@media(min-width:400px)]:h-15 rounded-full object-cover"
                />

                <div className="w-full flex-1 mb-0.5 [@media(min-width:400px)]:mb-1">
                  {/* Name */}
                  <h3 className="text-sm text-blue-200 [@media(min-width:400px)]:text-lg font-semibold">
                    {viewStory.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex-row [@media(min-width:280px)]:flex items-center gap-2">
                    <div className="flex text-sm [@media(min-width:400px)]:text-base gap-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <FaStar
                          key={index}
                          className={
                            index < viewStory.rating
                              ? "text-yellow-400 drop-shadow-[0_0_3px_rgba(250,204,21,0.5)]"
                              : "text-slate-600"
                          }
                        />
                      ))}
                    </div>

                    {/* Status */}
                    <span
                      className={`text-[9px] [@media(min-width:450px)]:text-[10px] px-2 py-0.5 rounded-full font-semibold
                ${
                  viewStory.approved
                    ? "bg-green-900/40 text-green-400"
                    : "bg-yellow-900/40 text-yellow-400"
                }`}
                    >
                      {viewStory.approved ? "Approved" : "Unapproved"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Story */}
              <div
                className="mt-4 max-h-50 overflow-y-auto scrollbar-slim
  pr-1.5 scroll-smooth"
              >
                <p className="text-xs sm:text-sm text-justify text-slate-300 tracking-wide leading-normal">
                  {viewStory.story}
                </p>
              </div>

              {/* Achievement */}
              <p className="mt-3 text-base text-blue-400 font-medium">
                🏆 {viewStory.achievement}
              </p>

              {/* Meta Info */}
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                {/* Email */}
                <div className="rounded-sm border border-slate-700 hover:border-cyan-700 bg-slate-900/60 p-2 sm:p-3 transition-all duration-500">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">
                    Email
                  </p>
                  <p className="break-all text-slate-300">{viewStory.email}</p>
                </div>

                {/* Gender */}
                <div className="rounded-sm border border-slate-700 hover:border-cyan-700 bg-slate-900/60 p-2 sm:p-3 transition-all duration-500">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">
                    Gender
                  </p>
                  <p className="text-slate-300 capitalize">
                    {viewStory.gender}
                  </p>
                </div>

                {/* Created At */}
                <div className="rounded-sm border border-slate-700 hover:border-cyan-700 bg-slate-900/60 p-2 sm:p-3 transition-all duration-500">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">
                    Created At
                  </p>

                  <p className="text-slate-300">
                    {new Date(viewStory.createdAt).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>

                {/* Updated At */}
                <div className="rounded-sm border border-slate-700 hover:border-cyan-700 bg-slate-900/60 p-2 sm:p-3 transition-all duration-500">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">
                    Updated At
                  </p>

                  <p className="text-slate-300">
                    {new Date(viewStory.updatedAt).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
