// import { useState, useRef, useEffect } from "react";
// import useAdminStories from "../hooks/useAdminStories";
// import ConfirmModal from "../components/ConfirmModal";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaEye, FaStar } from "react-icons/fa";
// import { RiDeleteBin6Line } from "react-icons/ri";

// const adminStories = [
//   {
//     _id: "1",
//     name: "Ajay Saini",
//     profession: "Working Professional",
//     course: "Communication Skills",
//     rating: 5,
//     story:
//       "Future40 helped me present confidently in meetings. My manager noticed the change and I got promoted helped me present confidently in meetings. My manager noticed the change and I got promoted.",
//     status: "Approved",
//     tag: "Got Promoted",
//     avatar: "https://avatar.iran.liara.run/public/girl",
//   },
//   {
//     _id: "2",
//     name: "Nishant Saini",
//     profession: "Student",
//     course: "MERN Stack",
//     rating: 4,
//     story:
//       "The structured roadmap and projects helped me crack my first internship.",
//     status: "Unapproved",
//     tag: "Placed",
//     avatar: "https://avatar.iran.liara.run/public/boy",
//   },
//   {
//     _id: "3",
//     name: "Anuragh Saini",
//     profession: "Frontend Developer",
//     course: "React Mastery",
//     rating: 3,
//     story:
//       "React hooks and real projects improved my confidence as a developer.",
//     status: "Approved",
//     tag: "Skill Boost",
//     avatar: "https://avatar.iran.liara.run/public/girl",
//   },
//   {
//     _id: "4",
//     name: "Raman Saini",
//     profession: "Frontend Developer",
//     course: "React Mastery",
//     rating: 2,
//     story:
//       "React hooks and real projects improved my confidence as a developer.",
//     status: "Approved",
//     tag: "Skill Boost",
//     avatar: "https://avatar.iran.liara.run/public/girl",
//   },
// ];

// const cardVariant = {
//   hidden: {
//     opacity: 0,
//     y: 30,
//     scale: 0.95,
//   },
//   visible: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       duration: 0.6,
//       ease: "easeOut",
//     },
//   },
// };

// const backdropVariant = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1 },
// };

// const modalVariant = {
//   hidden: { opacity: 0, scale: 0.9, y: 40 },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     y: 0,
//     transition: { duration: 0.3, ease: "easeOut" },
//   },
//   exit: {
//     opacity: 0,
//     scale: 0.9,
//     y: 40,
//     transition: { duration: 0.2 },
//   },
// };

// export default function SuccessStoriesAdmin() {
//   const { loading, fetchStories, updateStatus } = useAdminStories();

//   const [stories, setStories] = useState([]);
//   const [page, setPage] = useState(1);
//   const [pages, setPages] = useState(1);
//   const [search, setSearch] = useState("");
//   const [modal, setModal] = useState(null);

//   const [filter, setFilter] = useState("all");
//   const [viewStory, setViewStory] = useState(null);
//   const modalRef = useRef(null);

//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [deleteStory, setDeleteStory] = useState(null);

//   // const loadStories = async () => {
//   //   const data = await fetchStories({ page, search });
//   //   setStories(data.stories || []);
//   //   setPages(data.totalPages || 1);
//   // };

//   // useEffect(() => {
//   //   loadStories();
//   // }, [page, search]);

//   useEffect(() => {
//     // pagination simulation
//     const limit = 5;
//     const start = (page - 1) * limit;
//     const end = start + limit;

//     const filtered = adminStories.filter(
//       (s) =>
//         s.name.toLowerCase().includes(search.toLowerCase()) ||
//         s.course.toLowerCase().includes(search.toLowerCase())
//     );

//     setStories(filtered.slice(start, end));
//     setPages(Math.ceil(filtered.length / limit));
//   }, [page, search]);

//   // const handleConfirm = async () => {
//   //   if (modal.type === "delete") {
//   //     await deleteStory(modal.id);
//   //   } else {
//   //     await updateStatus(modal.id, modal.status);
//   //   }

//   //   setModal(null);
//   //   loadStories();
//   // };

//   // Outside click close
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (modalRef.current && !modalRef.current.contains(e.target)) {
//         setViewStory(null);
//       }
//     };

//     if (viewStory) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [viewStory]);

//   // 🔍 Search + Filter
//   const filteredStories = adminStories.filter((story) => {
//     const matchFilter = filter === "all" || story.status === filter;

//     const matchSearch =
//       story.name.toLowerCase().includes(search.toLowerCase()) ||
//       story.course.toLowerCase().includes(search.toLowerCase()) ||
//       story.story.toLowerCase().includes(search.toLowerCase());

//     return matchFilter && matchSearch;
//   });

//   const handleConfirm = () => {
//     if (modal.type === "delete") {
//       setStories((prev) => prev.filter((s) => s._id !== modal.id));
//     } else {
//       setStories((prev) =>
//         prev.map((s) =>
//           s._id === modal.id ? { ...s, status: modal.status } : s
//         )
//       );
//     }

//     setModal(null);
//   };

//   const handleDelete = (id) => {
//     setStories((prev) => prev.filter((story) => story.id !== id));
//   };

//   // const handleDelete = async (id) => {
//   //   try {
//   //     await fetch(`/api/stories/${id}`, {
//   //       method: "DELETE",
//   //       headers: {
//   //         Authorization: "Bearer " + localStorage.getItem("token"),
//   //       },
//   //     });

//   //     setStories((prev) => prev.filter((story) => story._id !== id));
//   //   } catch (error) {
//   //     console.error("Delete failed", error);
//   //   }
//   // };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between gap-4">
//         <h1 className="text-2xl font-bold">All Success Stories</h1>

//         <div className="flex gap-3">
//           {/* 🔍 Search */}
//           <input
//             type="text"
//             placeholder="Search by name, course..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="bg-slate-900 border border-slate-700 rounded-md
//             px-4 py-2 text-sm text-white outline-none
//             focus:border-slate-400"
//           />

//           {/* Filter */}
//           <select
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//             className="bg-slate-900 border border-slate-700 rounded-md
//             px-3 py-2 text-sm text-white"
//           >
//             <option value="all">All</option>
//             <option value="approved">Approved</option>
//             <option value="unapproved">Unapproved</option>
//           </select>
//         </div>
//       </div>

//       {/* Cards Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {filteredStories.map((story) => (
//           <motion.div
//             key={story._id}
//             variants={cardVariant}
//             initial="hidden"
//             animate="visible"
//             whileHover={{ scale: 1.03 }}
//             className="relative min-h-[300] hover:border-slate-700
//   bg-gradient-to-b from-slate-900 to-slate-950
//   border border-slate-800 rounded-lg p-5 text-center"
//           >
//             {/* Status Label */}
//             <span
//               className={`absolute
//   top-2 right-2
//   sm:top-2 sm:right-2
//   text-[10px] sm:text-xxs
//   px-2 sm:px-2 font-semibold
//   py-0.5 sm:py-1
//   rounded-full
//   whitespace-nowrap
//   ${
//     story.status === "Approved"
//       ? "bg-green-900/40 text-green-400"
//       : "bg-yellow-900/40 text-yellow-400"
//   }`}
//             >
//               {story.status}
//             </span>

//             {/* Avatar */}
//             <img
//               src={story.avatar}
//               className="w-16 h-16 mx-auto rounded-full
//               border-2 border-slate-700"
//             />

//             {/* Rating */}
//             <div className="flex justify-center gap-1 mt-3">
//               {Array.from({ length: 5 }).map((_, index) => (
//                 <FaStar
//                   key={index}
//                   className={
//                     index < story.rating ? "text-yellow-400" : "text-slate-600"
//                   }
//                 />
//               ))}
//             </div>

//             {/* Story Preview */}
//             <p className="text-sm text-slate-300 mt-3 italic font-semibold line-clamp-3">
//               "{story.story}"
//             </p>

//             {/* Name */}
//             <h4 className="mt-3 text-white italic font-semibold">
//               {story.name}
//             </h4>
//             {/* <p className="text-xs text-blue-400">{story.tag}</p> */}

//             {/* Actions */}
//             <div className="mt-4 flex justify-center gap-2">
//               {/* Approve / Unapprove */}
//               <motion.button
//                 whileTap={{ scale: 0.95 }}
//                 whileHover={{ scale: 1.05 }}
//                 className={`px-3 py-1.5 rounded-sm text-sm font-medium
//     ${
//       story.status === "Approved"
//         ? "bg-yellow-600 hover:bg-yellow-500"
//         : "bg-green-600 hover:bg-green-500"
//     }`}
//               >
//                 {story.status === "Approved" ? "Unapprove" : "Approve"}
//               </motion.button>

//               {/* View */}
//               <motion.button
//                 whileTap={{ scale: 0.95 }}
//                 whileHover={{ scale: 1.05 }}
//                 onClick={() => setViewStory(story)}
//                 className="flex items-center gap-2 px-3 py-1.5 rounded-sm
//     bg-slate-800 hover:bg-slate-700 text-sm text-slate-200"
//               >
//                 <FaEye className="text-sm" />
//               </motion.button>

//               {/* Delete */}
//               <motion.button
//                 onClick={() => {
//                   setDeleteStory(story);
//                   setShowDeleteModal(true);
//                 }}
//                 whileTap={{ scale: 0.95 }}
//                 whileHover={{ scale: 1.05 }}
//                 className="flex items-center gap-2 px-3 py-1.5 rounded-sm
//   bg-red-600 hover:bg-red-500 text-sm text-white"
//               >
//                 <RiDeleteBin6Line className="text-sm" />
//               </motion.button>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* ConfirmModal */}
//       <ConfirmModal
//         open={showDeleteModal}
//         title="Delete This Story.."
//         message="Are you sure you want to delete this success story? This action cannot be undone."
//         onCancel={() => {
//           setShowDeleteModal(false);
//           setDeleteStory(null);
//         }}
//         onConfirm={() => {
//           handleDelete(deleteStory.id);
//           setShowDeleteModal(false);
//           setDeleteStory(null);
//         }}
//       />

//       {/* Inline View Modal */}
//       <AnimatePresence>
//         {viewStory && (
//           <motion.div
//             variants={backdropVariant}
//             initial="hidden"
//             animate="visible"
//             exit="hidden"
//             className="fixed inset-0 z-50 bg-black/70
//       flex items-center justify-center px-4"
//           >
//             <motion.div
//               ref={modalRef}
//               variants={modalVariant}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="bg-slate-900 border border-slate-700
//         rounded-md max-w-lg w-full p-6"
//             >
//               <div className="flex items-center gap-4">
//                 <img
//                   src={viewStory.avatar}
//                   className="w-14 h-14 rounded-full"
//                 />
//                 <div className="place-items-center">
//                   <h3 className="text-lg font-semibold">{viewStory.name}</h3>
//                   <div className="flex justify-start gap-1 mt-0.5 text-sm">
//                     {Array.from({ length: 5 }).map((_, index) => (
//                       <FaStar
//                         key={index}
//                         className={
//                           index < viewStory.rating
//                             ? "text-yellow-400"
//                             : "text-slate-600"
//                         }
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <p className="text-sm text-slate-300 mt-4 italic font-semibold leading-relaxed">
//                 "{viewStory.story}"
//               </p>

//               <div className="mt-4 flex justify-between text-xs text-slate-400">
//                 {/* <span>Status: {viewStory.status}</span> */}
//                 <span
//                   className={`
//   sm:top-2 sm:right-2
//   text-[10px] sm:text-xs
//   px-2 sm:px-2 font-semibold
//   py-0.5 sm:py-1
//   rounded-full
//   whitespace-nowrap
//   ${
//     viewStory.status === "Approved"
//       ? "bg-green-900/40 text-green-400"
//       : "bg-yellow-900/40 text-yellow-400"
//   }`}
//                 >
//                   {viewStory.status}
//                 </span>
//                 {/* <span>{viewStory.tag}</span> */}
//                 <p className="text-sm mt-0.5 text-blue-400">{viewStory.tag}</p>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

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
      duration: 0.6,
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
  console.log("stories --------", stories);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("all");
  const [viewStory, setViewStory] = useState(null);
  const modalRef = useRef(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [storyToDelete, setStoryToDelete] = useState(null);

  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [nextStatus, setNextStatus] = useState(null);

  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const filterOptions = [
    { value: "all", label: "All" },
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

    if (typeof nextStatus !== "boolean") {
      console.error("Invalid approved value:", nextStatus);
      return;
    }

    await updateStatus(selectedStory._id, nextStatus);
    setOpenUpdate(false);
    setSelectedStory(null);
    setNextStatus(null);
    loadStories();
  };

  //Handle delete function
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
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <h1 className="text-xl sm:text-2xl font-bold">All Success Stories</h1>

          <div className="flex gap-3">
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
                className="w-full bg-slate-900 border border-slate-700 rounded-sm
    pl-10 pr-4 py-2 text-sm text-white outline-none
    focus:border-slate-400 placeholder:text-slate-500"
              />
            </div>

            {/* Filter */}
            <Select
              value={filterOptions.find((opt) => opt.value === filter)}
              onChange={(selected) => setFilter(selected.value)}
              options={filterOptions}
              isSearchable={false}
              className="w-31 text-xs"
              classNamePrefix="react-select"
              styles={{
                control: (base, state) => ({
                  ...base,
                  backgroundColor: "#0f172a", // slate-950
                  borderColor: state.isFocused ? "#94a3b8" : "#334155",
                  boxShadow: "none",
                  minHeight: "30px",
                  cursor: "pointer",
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: "#0f172a",
                  border: "1px solid #334155",
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
                }),
                singleValue: (base) => ({
                  ...base,
                  color: "#e5e7eb",
                }),
                indicatorSeparator: () => ({ display: "none" }),
                dropdownIndicator: (base) => ({
                  ...base,
                  color: "#94a3b8",
                  ":hover": { color: "#e5e7eb" },
                }),
              }}
            />
          </div>
        </div>

        {/* Loading State */}
        {fetchLoading && (
          <div className="text-center text-slate-400 py-20 text-sm">
            Loading...
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {stories.map((story) => (
              <motion.div
                key={story._id}
                variants={cardVariant}
                initial="hidden"
                animate="visible"
                // whileHover={{ scale: 1.02 }}
                whileHover={{ y: -4 }}
                className="relative
        bg-gradient-to-b from-slate-900 to-slate-950
        border border-slate-800 rounded-lg p-5 text-center"
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
                  {story.approved ? "Approved" : "Unapproved"}
                </span>

                {/* Avatar */}
                <img
                  src={story.photo.url}
                  className="w-16 h-16 mx-auto rounded-full
          border-2 border-slate-700 object-cover"
                />

                {/* Rating */}
                <div className="flex justify-center gap-1 mt-3">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FaStar
                      key={index}
                      className={
                        index < story.rating
                          ? "text-yellow-400"
                          : "text-slate-600"
                      }
                    />
                  ))}
                </div>

                {/* Story */}
                <p className="text-sm text-slate-300 mt-3 italic line-clamp-3">
                  “{story.story}”
                </p>

                {/* Name */}
                <h4 className="mt-3 text-white italic font-semibold">
                  {story.name}
                </h4>

                {/* Actions */}
                <div className="mt-4 flex justify-center gap-2">
                  {/* Approve / Unapprove */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => {
                      setSelectedStory(story);
                      setNextStatus(!story.approved);
                      setOpenUpdate(true);
                    }}
                    className={`px-3 py-1.5 rounded-sm text-xs font-medium
    ${
      story.approved
        ? "bg-yellow-700 hover:bg-yellow-600"
        : "bg-green-600 hover:bg-green-700"
    }`}
                  >
                    {story.approved ? "Unapprove" : "Approve"}
                  </motion.button>

                  {/* View */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setViewStory(story)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-sm
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
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-sm
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
              )
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

      {/* Delete Confirm Modal */}
      {/* <ConfirmModal
        open={showDeleteModal}
        title="Delete This Story..!"
        message="Are you sure you want to delete this success story? This action cannot be undone."
        onCancel={() => {
          setShowDeleteModal(false);
          setStoryToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
      /> */}
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
      {/* <UpdateConfirmModal
        open={openUpdate}
        title={
          nextStatus === "approved"
            ? "Approve Success Story"
            : "Unapprove Success Story"
        }
        message={`Are you sure you want to ${
          nextStatus === "approved" ? "approve" : "unapprove"
        } this success story?`}
        confirmText={nextStatus ? "Approve" : "Unapprove"}
        onConfirm={handleUpdate}
        onCancel={() => setOpenUpdate(false)}
      /> */}
      <UpdateConfirmModal
        open={openUpdate}
        title={nextStatus ? "Approve Success Story" : "Unapprove Success Story"}
        message={`Are you sure you want to ${
          nextStatus ? "approve" : "unapprove"
        } this success story?`}
        confirmText={nextStatus ? "Approve" : "Unapprove"}
        loading={statusLoading}
        onConfirm={handleUpdate}
        onCancel={() => setOpenUpdate(false)}
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
        rounded-md max-w-lg w-full p-6"
            >
              <button
                onClick={() => setViewStory(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-transform duration-300 hover:scale-110"
              >
                <FaTimes size={24} />
              </button>

              {/* Header */}
              <div className="flex items-center gap-4">
                <img
                  src={viewStory.photo.url}
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{viewStory.name}</h3>

                  <div className="block xs:flex xs:flex-row xs:items-center gap-2 mt-0.5">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <FaStar
                          key={index}
                          className={
                            index < viewStory.rating
                              ? "text-yellow-400"
                              : "text-slate-600"
                          }
                        />
                      ))}
                    </div>

                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-semibold
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
                className="mt-4 max-h-50 overflow-y-auto
  scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900
  pr-2 scroll-smooth"
              >
                <p className="text-xs sm:text-sm text-slate-300 italic font-semibold leading-relaxed">
                  “{viewStory.story}”
                </p>
              </div>

              {/* Achievement */}
              <p className="mt-3 text-sm text-blue-400 font-medium">
                🏆 {viewStory.achievement}
              </p>

              {/* Meta Info */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-400">
                <div>
                  <span className="text-slate-500">Email:</span>
                  <p className="break-all">{viewStory.email}</p>
                </div>

                <div>
                  <span className="text-slate-500">Gender:</span>
                  <p>{viewStory.gender}</p>
                </div>

                <div>
                  <span className="text-slate-500">Created At:</span>
                  <p>{new Date(viewStory.createdAt).toLocaleString()}</p>
                </div>

                <div>
                  <span className="text-slate-500">Updated At:</span>
                  <p>{new Date(viewStory.updatedAt).toLocaleString()}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
