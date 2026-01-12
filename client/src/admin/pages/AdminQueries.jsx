import { useState } from "react";
import useAdminQueries from "../hooks/useAdminQueries";
import ConfirmModal from "../components/ConfirmModal";
import {
  CrossIcon,
  DeleteIcon,
  EyeIcon,
  QueriesIcon,
  SearchIcon,
} from "../../icons/Icons";
import { useEffect } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { motion } from "framer-motion";
import Loader from "../components/loader/Loader";

const actionBtnMotion = {
  whileHover: { scale: 1.1 },
  whileTap: { scale: 0.92 },
  transition: { type: "spring", stiffness: 400, damping: 20 },
};

const footerBtnMotion = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.95 },
  transition: { type: "spring", stiffness: 350, damping: 22 },
};

export default function AdminQueries() {
  const {
    queries,
    replyQuery,
    deleteQuery,
    fetchQueries,
    fetchLoading,
    replyLoading,
    deleteLoading,
  } = useAdminQueries();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [limit, setLimit] = useState(10);

  const [replyModal, setReplyModal] = useState(null);

  const [deleteItem, setDeleteItem] = useState(null);

  const [viewQuery, setViewQuery] = useState(null);
  const modalRef = useRef(null);

  const filterOptions = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "replied", label: "Replied" },
  ];

  useEffect(() => {
    fetchQueries(currentPage, search, filter, limit).then((res) => {
      if (res?.pagination) {
        setTotalPages(res.pagination.totalPages);
      }
    });
  }, [currentPage, search, filter, limit]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setViewQuery(null);
      }
    };

    if (viewQuery) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [viewQuery]);

  /* 📩 SEND REPLY */
  const onReplySubmit = async (data) => {
    await replyQuery(replyModal._id, data.reply);
    reset();
    setReplyModal(null);
  };

  // Handle search change function
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  // Handle filter change function
  const handleFilterChange = (selected) => {
    setFilter(selected.value);
    setCurrentPage(1);
  };

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

  const shortText = (text, words = 5) => {
    if (!text) return "";
    const arr = text.split(" ");
    return arr.length > words ? arr.slice(0, words).join(" ") + "..." : text;
  };

  return (
    <section className="p-6 bg-slate-950 min-h-screen rounded">
      <div className="flex gap-x-2 flex-wrap justify-between">
        <h1 className="text-2xl font-bold text-white mb-6">All Queries</h1>

        {/* 🔎 Searching & Filter */}
        <div className="flex flex-wrap gap-3 mb-5">
          <div className="relative w-48 sm:w-64">
            <SearchIcon
              className="absolute left-3 top-1/2 -translate-y-1/2
            text-slate-400 text-lg"
            />

            <input
              type="text"
              placeholder="Search name or email"
              value={search}
              onChange={handleSearchChange}
              className="w-full pl-10 rounded bg-slate-900 border border-slate-700 outline-none focus:border-slate-400 transition duration-500 px-4 py-2 text-sm text-white"
            />
          </div>

          <Select
            value={filterOptions.find((opt) => opt.value === filter)}
            onChange={handleFilterChange}
            options={filterOptions}
            isSearchable={false}
            className="w-40 text-sm"
            classNamePrefix="react-select"
            styles={{
              /* Control (closed select) */
              control: (base, state) => ({
                ...base,
                backgroundColor: "#0f172a", // slate-900
                borderColor: state.isFocused ? "#38bdf8" : "#334155", // blue-400 / slate-700
                boxShadow: "none",
                minHeight: "38px",
                cursor: "pointer",
                ":hover": {
                  borderColor: "#38bdf8",
                },
              }),

              /* Dropdown menu */
              menu: (base) => ({
                ...base,
                backgroundColor: "#020617", // slate-950 (slightly darker)
                border: "1px solid #334155",
                borderRadius: "0.375rem",
                marginTop: "4px",
                overflow: "hidden",
                zIndex: 50,
              }),

              /* Options */
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected
                  ? "#2563eb" // blue-600
                  : state.isFocused
                  ? "#1e293b" // slate-800
                  : "transparent",
                color: state.isSelected ? "#ffffff" : "#e5e7eb",
                cursor: "pointer",
                padding: "8px 12px",
                ":active": {
                  backgroundColor: "#2563eb",
                },
              }),

              /* Selected value text */
              singleValue: (base) => ({
                ...base,
                color: "#e5e7eb",
              }),

              /* Placeholder (if ever used) */
              placeholder: (base) => ({
                ...base,
                color: "#94a3b8",
              }),

              /* Remove separator */
              indicatorSeparator: () => ({
                display: "none",
              }),

              /* Dropdown arrow */
              dropdownIndicator: (base, state) => ({
                ...base,
                color: state.isFocused ? "#38bdf8" : "#94a3b8",
                ":hover": {
                  color: "#38bdf8",
                },
              }),
            }}
          />
        </div>
      </div>

      {/* 📋 TABLE */}
      <div className="overflow-x-auto border border-slate-800 rounded-sm">
        <table className="w-full text-sm text-slate-300">
          <thead className="bg-slate-900 text-slate-400">
            <tr>
              <th className="p-3 text-left">Sr. No.</th>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Message</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {fetchLoading ? (
              <tr>
                <td colSpan="5" className="p-3 text-center">
                  {/* Loading queries... */}
                  <div className="w-full flex justify-center">
                    <Loader />
                  </div>
                </td>
              </tr>
            ) : queries.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-slate-500">
                  No queries found.
                </td>
              </tr>
            ) : (
              queries.map((q, index) => (
                <tr
                  key={q._id}
                  className="border-t border-slate-800 hover:bg-slate-900/50 transition"
                >
                  <td className="p-3">
                    {(currentPage - 1) * limit + index + 1}
                  </td>

                  <td className="p-3">
                    <p className="font-medium text-white">{q.name}</p>
                    <p className="text-xs text-slate-500">{q.email}</p>
                  </td>

                  <td className="p-3 max-w-md text-slate-300">
                    {shortText(q.message, 5)}
                  </td>
                  {/* <td
                    title={q.message}
                    className="p-3 max-w-md text-slate-300 cursor-help"
                  >
                    {shortText(q.message, 5)}
                  </td> */}

                  <td className="p-3">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium
    ${
      q.status === "replied"
        ? "bg-green-500/10 text-green-400"
        : "bg-yellow-500/10 text-yellow-400"
    }
  `}
                    >
                      {q.status === "replied" ? "Replied" : "Pending"}
                    </span>
                  </td>

                  {/* hover:-translate-y-0.5 */}
                  <td className="p-3 text-center">
                    <div className="inline-flex gap-2">
                      {/* 👁 View */}
                      <motion.button
                        {...actionBtnMotion}
                        onClick={() => setViewQuery(q)}
                        className="
      group p-2 rounded-full
      bg-fuchsia-500/20
      text-fuchsia-400
      border border-fuchsia-500/30
      hover:bg-fuchsia-500 hover:text-white
      shadow-sm hover:shadow-fuchsia-500/40
      transition-colors
    "
                      >
                        <EyeIcon className="text-md group-hover:scale-110 transition" />
                      </motion.button>

                      {/* 💬 Reply */}
                      <motion.button
                        {...(q.status === "replied" ? {} : actionBtnMotion)}
                        disabled={q.status === "replied"}
                        onClick={() => setReplyModal(q)}
                        className={`
      group p-2 rounded-full border
      transition-colors
      ${
        q.status === "replied"
          ? "bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed"
          : "bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500 hover:text-white hover:shadow-blue-500/40"
      }
    `}
                      >
                        <QueriesIcon className="text-md group-hover:scale-110 transition" />
                      </motion.button>

                      {/* 🗑 Delete */}
                      <motion.button
                        {...actionBtnMotion}
                        onClick={() => setDeleteItem(q)}
                        className="
      group p-2 rounded-full
      bg-red-500/20
      text-red-400
      border border-red-500/30
      hover:bg-red-500 hover:text-white
      hover:shadow-red-500/40
      transition-colors
    "
                      >
                        <DeleteIcon className="text-md group-hover:scale-110 transition" />
                      </motion.button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 📄 PAGINATION */}
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
              <span key={`dots-${i}`} className="px-2 text-slate-500">
                ...
              </span>
            ) : (
              <button
                key={`page-${page}-${i}`}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-md text-sm font-medium
        ${
          currentPage === page
            ? "bg-blue-500 text-white"
            : "border border-slate-700 text-slate-400 hover:text-white"
        }`}
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

      {/* View Modal */}
      {viewQuery && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm
    flex items-center justify-center px-3 sm:px-4"
        >
          <div
            ref={modalRef}
            className="
        relative
        w-full sm:max-w-md
        bg-slate-900/95 border border-slate-700
        rounded-md
        p-4 sm:p-6
        shadow-2xl shadow-slate-900/60
      "
          >
            {/* ❌ Close Icon */}
            <button
              onClick={() => setViewQuery(null)}
              className="
          absolute top-4 right-4
          text-slate-400 hover:text-white
          transition text-xl
        "
              aria-label="Close modal"
            >
              <CrossIcon />
            </button>

            {/* Header */}
            <div className="mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-white">
                Query Details
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-1">
                {new Date(viewQuery.createdAt).toLocaleString()}
              </p>
            </div>

            {/* Info Card */}
            <div
              className="
          bg-slate-800/60
          rounded-md
          p-3
          space-y-2
          text-sm
          mb-4
        "
            >
              <div className="flex justify-between gap-2">
                <span className="text-slate-400">Name</span>
                <span className="text-slate-200 font-medium text-right">
                  {viewQuery.name}
                </span>
              </div>

              <div className="flex justify-between gap-2">
                <span className="text-slate-400">Email</span>
                <span className="text-slate-200 text-right break-all">
                  {viewQuery.email}
                </span>
              </div>

              <div className="flex justify-between gap-2">
                <span className="text-slate-400">Phone</span>
                <span className="text-slate-200 text-right break-all">
                  {viewQuery.phone}
                </span>
              </div>

              <div className="flex justify-between items-center gap-2">
                <span className="text-slate-400">Status</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] font-semibold
              ${
                viewQuery.status === "replied"
                  ? "bg-green-900/40 text-green-400"
                  : "bg-yellow-900/40 text-yellow-400"
              }`}
                >
                  {viewQuery.status}
                </span>
              </div>
            </div>

            {/* Message Section */}
            <div>
              <p className="text-sm text-slate-400 mb-1">Message :-</p>
              <div
                className="
            max-h-44 sm:max-h-40
            overflow-y-auto
            scrollbar-thin
            scrollbar-thumb-slate-700
            scrollbar-track-slate-900
            pr-2
          "
              >
                <p className="text-sm text-slate-300 leading-relaxed">
                  {viewQuery.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✉️ REPLY MODAL (INLINE) */}
      {replyModal && (
        <div
          className="fixed inset-0 z-50 bg-black/70
    flex items-center justify-center px-4"
          onClick={() => {
            reset();
            setReplyModal(null);
          }}
        >
          <div
            className="bg-slate-900 border border-slate-800
      rounded-sm w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-white italic mb-1">
              Reply to "{replyModal.name}"
            </h3>

            <form onSubmit={handleSubmit(onReplySubmit)}>
              {/* TEXTAREA */}
              <textarea
                rows={4}
                {...register("reply", {
                  required: "Reply message is required",
                  minLength: {
                    value: 5,
                    message: "Reply must be at least 5 characters",
                  },
                })}
                className="w-full bg-slate-950 border border-slate-700 outline-none focus:border-slate-400 transition duration-500 px-3 py-2 text-sm text-white rounded-sm"
                placeholder="Type your reply..."
              />

              {errors.reply && (
                <p className="text-xs text-red-500">{errors.reply.message}</p>
              )}

              {/* ACTIONS */}
              <div className="flex justify-end gap-3 mt-2">
                {/* ❌ Cancel Button */}
                <motion.button
                  type="button"
                  {...footerBtnMotion}
                  onClick={() => {
                    reset();
                    setReplyModal(null);
                  }}
                  className="
      px-4 py-1.5 rounded-sm text-sm
      bg-slate-800 text-slate-300
      hover:bg-slate-700
      transition-colors
    "
                >
                  Cancel
                </motion.button>

                {/* 📤 Reply Button */}
                <motion.button
                  type="submit"
                  disabled={replyLoading}
                  {...(!replyLoading ? footerBtnMotion : {})}
                  className={`
      px-4 py-2 rounded-sm text-sm text-white
      transition-colors
      ${
        replyLoading
          ? "bg-blue-600 opacity-60 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-500"
      }
    `}
                >
                  {replyLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Replying...
                    </span>
                  ) : (
                    "Reply"
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 🗑 DELETE CONFIRM MODAL (REUSE) */}
      <ConfirmModal
        open={!!deleteItem}
        title="Delete Query...!"
        message="Are you sure you want to delete this query?"
        loading={deleteLoading}
        onCancel={() => setDeleteItem(null)}
        onConfirm={async () => {
          const ok = await deleteQuery(deleteItem._id);
          if (ok) {
            setDeleteItem(null);
            fetchQueries(); // refresh list
          }
        }}
      />
    </section>
  );
}
