import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import { motion, AnimatePresence } from "framer-motion";
import { useSuccessStory } from "../hooks/useSuccessStory";
import { BsEmojiTearFill } from "react-icons/bs";
import Loader from "../admin/components/loader/Loader";
import { AwardIcon, CrossIcon, SearchIcon, StarIcon } from "../icons/Icons";

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
    <section className="bg-slate-950 min-h-screen px-6 md:px-10 py-5">
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
          <SearchIcon
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
        className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-4 border-t border-slate-900 rounded-l-md rounded-r-md"
      >
        {fetchLoading ? (
          <div className="col-span-full flex justify-center text-center text-slate-400 text-sm">
            <Loader />
          </div>
        ) : (
          stories.map((story) => (
            <motion.div
              key={story._id || story.id}
              variants={item}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedStory(story)}
              className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-cyan-500/30 shadow-lg hover:shadow-cyan-900/20 cursor-pointer rounded-sm p-4 [@media(min-width:480px)]:p-5 duration-300"
            >
              {/* Photo */}
              <div className="flex justify-center mb-3">
                <img
                  src={story.photo.url}
                  alt={story.name}
                  className="w-20 h-20 bg-cover rounded-full border-2 border-slate-600/80"
                />
              </div>

              {/* Rating */}
              <div className="flex justify-center gap-1 mb-0.5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon
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
      bg-blue-500/10
      text-blue-400
      border border-blue-500/20
    "
                >
                  {story.name}
                </h3>
              </div>

              {/* Story */}
              <div
                className="relative mt-3 px-3.5 py-2
          bg-slate-800/10 border border-slate-900
          rounded-md backdrop-blur-sm"
              >
                <span className="absolute -top-3 left-3 text-3xl text-blue-500/40 font-serif">
                  “
                </span>

                <p
                  className="text-slate-300 text-xs sm:text-sm
            leading-normal text-center tracking-wide
            line-clamp-4"
                >
                  {story.story}
                </p>

                <span className="absolute -bottom-7 right-3 text-3xl text-blue-500/40 font-serif">
                  ”
                </span>
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
              className="relative w-full max-w-lg sm:max-w-xl rounded-md bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700 p-4 sm:p-6 shadow-2xl"
            >
              <button
                onClick={() => setSelectedStory(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-transform duration-300 hover:scale-110"
              >
                <CrossIcon className="text-xl sm:text-2xl" />
              </button>

              {/* Photo */}
              <div className="flex justify-center -mt-15 sm:-mt-20 mb-1 sm:mb-2">
                <img
                  src={selectedStory.photo.url}
                  alt={selectedStory.name}
                  className="w-20 h-20 sm:w-28 sm:h-28 bg-cover rounded-full border-4 border-slate-700 bg-slate-900"
                />
              </div>

              {/* Rating */}
              <div className="flex justify-center text-sm sm:text-base gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon
                    key={index}
                    className={
                      index < selectedStory.rating
                        ? "text-yellow-400 drop-shadow-[0_0_3px_rgba(250,204,21,0.5)]"
                        : "text-slate-600"
                    }
                  />
                ))}
              </div>

              <div className="text-center">
                {/* Name */}
                <h3
                  className="sm:mb-0.5
    text-md sm:text-lg font-semibold
    text-transparent bg-clip-text
    bg-gradient-to-r from-blue-400 to-cyan-400
    tracking-wide
  "
                >
                  {selectedStory.name}
                </h3>

                {/* Achievement Badge */}
                <div className="flex justify-center">
                  <span
                    className="flex items-center gap-2 px-4 py-1 rounded-full mb-1.5 sm:mb-2
                  text-xs sm:text-sm font-medium
                  bg-gradient-to-r from-sky-500/10 to-blue-500/10
                  text-sky-400
                  border border-sky-500/20
                "
                  >
                    <AwardIcon className="text-sky-400 text-sm drop-shadow-sm" />
                    {selectedStory.achievement}
                    <AwardIcon className="text-sky-400 text-sm drop-shadow-sm" />
                  </span>
                </div>

                {/* Accent Divider */}
                {/* <div
                  className="w-16 h-1 mx-auto rounded-full 
    bg-gradient-to-r from-blue-500 to-cyan-400"
                /> */}

                {/* Story Box */}
                <div
                  className="
    max-h-40 sm:max-h-52 overflow-y-auto scrollbar-slim
    pl-3 pr-1.5 py-2.5
    bg-slate-800/20
    border border-slate-700/30
    rounded-sm
    backdrop-blur-sm
    relative
  "
                >
                  <p
                    className="
      text-sm sm:text-base
      text-slate-300
      leading-normal tracking-wide

    "
                  >
                    {selectedStory.story}
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
