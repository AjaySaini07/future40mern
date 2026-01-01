import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaMedal, FaStar } from "react-icons/fa";
import { useSuccessStory } from "../hooks/useSuccessStory";
import { IoMdSearch } from "react-icons/io";
import { BsEmojiTearFill } from "react-icons/bs";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function ViewAllStories() {
  const [search, setSearch] = useState("");
  const [selectedStory, setSelectedStory] = useState(null);

  const [stories, setStories] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const { fetchStory, fetchLoading } = useSuccessStory();

  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);

  // 2️⃣ then pagination logic
  //   const totalPages = Math.ceil(filteredStories.length / ITEMS_PER_PAGE);

  //   const paginatedStories = filteredStories.slice(
  //     (currentPage - 1) * ITEMS_PER_PAGE,
  //     currentPage * ITEMS_PER_PAGE
  //   );

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
    fetchStory({ page: currentPage, limit: 8, search }).then((res) => {
      if (res?.success) {
        setStories(res.stories);
        setTotalPages(res.pagination.totalPages);
      }
    });
  }, [currentPage, search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <section className="bg-slate-950 min-h-screen px-6 md:px-12 py-6">
      {/* Header */}
      <Reveal>
        <div className="text-center max-w-2xl mx-auto mb-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            <span className="text-blue-400">Student</span>{" "}
            <span className="text-white">Success</span>{" "}
            <span className="text-blue-300">Stories</span>
          </h1>
          <p className="mt-2 text-xs sm:text-sm">
            <span className="text-slate-400">Short previews here.</span>{" "}
            <span className="text-sky-400">View full stories</span>{" "}
            <span className="text-slate-400">inside.</span>
          </p>
        </div>
      </Reveal>

      {/* Search – Reveal */}
      <Reveal>
        <div className="max-w-xl mx-auto relative mb-4">
          <IoMdSearch
            className="absolute left-3 top-1/2 -translate-y-1/2
            text-slate-400 text-lg"
          />
          <input
            type="text"
            placeholder="Search your story..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 rounded bg-slate-950 border border-slate-700 outline-none focus:border-slate-400 transition duration-500 px-4 py-2 text-sm text-white"
          />
        </div>
      </Reveal>

      {/* No Data State */}
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

      {/* Stories Grid – Stagger */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-4 border-t border-slate-900 rounded-l-lg rounded-r-lg"
      >
        {fetchLoading ? (
          <p className="col-span-full text-center text-slate-400 text-sm">
            Loading...
          </p>
        ) : (
          stories.map((story) => (
            <motion.div
              key={story._id || story.id}
              variants={item}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedStory(story)}
              className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-slate-600 cursor-pointer rounded-md p-6 shadow-xl duration-300"
            >
              {/* Avatar */}
              <div className="flex justify-center mb-3">
                <img
                  src={story.photo}
                  alt={story.name}
                  className="w-20 h-20 rounded-full border-4 border-slate-700"
                />
              </div>

              {/* Rating */}
              <div className="flex justify-center gap-1 mb-3">
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
              <p className="text-slate-400 text-sm font-semibold text-center italic leading-relaxed mb-2 line-clamp-3">
                “{story.story}”
              </p>

              {/* Name */}
              <div className="text-center">
                <h3 className="text-white italic font-semibold">
                  {story.name}
                </h3>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

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

      {/* Modal – Synced Reveal */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStory(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-lg bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700 p-7 shadow-2xl"
            >
              <button
                onClick={() => setSelectedStory(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-transform duration-300 hover:scale-110"
              >
                <FaTimes size={24} />
              </button>

              {/* Photo */}
              <div className="flex justify-center -mt-20 mb-2">
                <img
                  src={selectedStory.photo}
                  alt={selectedStory.name}
                  className="w-28 h-28 rounded-full border-4 border-slate-700 bg-slate-900"
                />
              </div>

              {/* Rating */}
              <div className="flex justify-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <FaStar
                    key={index}
                    className={
                      index < selectedStory.rating
                        ? "text-yellow-400"
                        : "text-slate-600"
                    }
                  />
                ))}
              </div>

              <div className="text-center">
                <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 mb-3 text-center">
                  {/* Name */}
                  <h3 className="text-sm sm:text-md md:text-lg italic font-semibold text-white">
                    {selectedStory.name}
                  </h3>

                  {/* Icon */}
                  <FaMedal className="text-red-500 drop-shadow-sm text-sm sm:text-lg md:text-xl" />

                  {/* Achievement */}
                  <p className="text-sm sm:text-md md:text-lg italic font-semibold text-sky-400">
                    {selectedStory.achievement}
                  </p>
                </div>

                {/* Story */}
                <div
                  className="mt-4 max-h-50 overflow-y-auto
  scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900
  pr-2 scroll-smooth"
                >
                  <p className="text-xs sm:text-sm text-slate-300 italic font-semibold leading-relaxed">
                    “{selectedStory.story}”
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
