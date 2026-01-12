import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Select from "react-select";
import useAdminStudents from "../hooks/useAdminStudents";
import ConfirmModal from "../components/ConfirmModal";
import { CrossIcon, DeleteIcon, EyeIcon, SearchIcon } from "../../icons/Icons";
import Loader from "../components/loader/Loader";

export default function StudentAdmin() {
  const {
    students,
    pagination,
    fetchStudents,
    deleteStudent,
    fetchLoading,
    deleteLoading,
  } = useAdminStudents();

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [story, setStory] = useState("");
  const [limit, setLimit] = useState(10);

  const [viewStudent, setViewStudent] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const genderOptions = [
    { value: "", label: "All Genders" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const storyOptions = [
    { value: "", label: "All Stories" },
    { value: "true", label: "Story Submitted" },
    { value: "false", label: "Not Submitted" },
  ];

  // Handle search change function
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchStudents({
      page: currentPage,
      limit,
      search,
      gender,
      story,
    });
  }, [currentPage, search, gender, story, limit]);

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

  // 🔹 Dark react-select styles
  const selectStyles = {
    control: (base, state) => ({
      ...base,
      //   backgroundColor: "#020617",
      backgroundColor: "#0f172a",
      borderColor: state.isFocused ? "#38bdf8" : "#334155",
      boxShadow: "none",
      minHeight: "35px",
      ":hover": { borderColor: "#38bdf8" },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#020617",
      border: "1px solid #334155",
      zIndex: 50,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#1e293b"
        : state.isFocused
        ? "#0f172a"
        : "#020617",
      color: "#e5e7eb",
      cursor: "pointer",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#e5e7eb",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#94a3b8",
    }),
    input: (base) => ({
      ...base,
      color: "#e5e7eb",
    }),
  };

  return (
    <div className="bg-slate-900 border border-slate-800 min-h-screen rounded-sm p-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-wrap gap-3 justify-between items-end mb-3">
        <h2 className="text-2xl font-semibold text-white">All Students</h2>

        {/* ================= FILTERS / SEARCH ================= */}
        <div className="flex flex-wrap gap-4">
          {/* Gender Filter */}
          <div className="">
            <Select
              options={genderOptions}
              styles={selectStyles}
              placeholder="Filter by Gender"
              isSearchable={false}
              value={genderOptions.find((g) => g.value === gender)}
              onChange={(opt) => {
                setGender(opt.value);
                setPage(1);
              }}
              className="text-sm"
            />
          </div>

          {/* Story Filter */}
          <div className="min-w-[160px]">
            <Select
              options={storyOptions}
              styles={selectStyles}
              placeholder="Success Story Status"
              isSearchable={false}
              value={storyOptions.find((s) => s.value === story)}
              onChange={(opt) => {
                setStory(opt.value);
                setPage(1);
              }}
              className="text-sm"
            />
          </div>

          {/* Search */}
          <div className="relative w-48 sm:w-64">
            <SearchIcon
              className="absolute left-3 top-2
                    text-slate-400 text-xl"
            />

            <input
              type="text"
              placeholder="Search name or email or mobile"
              value={search}
              onChange={handleSearchChange}
              //   onChange={(e) => {
              //     setSearch(e.target.value);
              //     setCurrentPage(1);
              //   }}
              className="w-full pl-10 rounded bg-slate-900 border border-slate-700 outline-none focus:border-slate-400 transition duration-500 px-4 py-2 text-sm text-white"
            />
          </div>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto rounded-sm border border-slate-800">
        <table className="w-full text-sm">
          {/* ================= HEADER ================= */}
          <thead className="bg-slate-700/60 text-slate-300">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Sr. No.</th>
              <th className="text-left px-4 py-3 font-medium">Student</th>
              <th className="text-left px-4 py-3 font-medium">Email</th>
              <th className="text-left px-4 py-3 font-medium">Gender</th>
              <th className="text-left px-4 py-3 font-medium">Story Status</th>
              <th className="px-4 py-3 text-center font-medium">Actions</th>
            </tr>
          </thead>

          {/* ================= BODY ================= */}
          <tbody className="divide-y divide-slate-800">
            {fetchLoading ? (
              <tr>
                <td colSpan="6" className="text-center py-5 text-slate-400">
                  {/* Loading students... */}
                  <div className="w-full flex justify-center">
                    <Loader />
                  </div>
                </td>
              </tr>
            ) : students.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center text-md py-5 text-slate-500"
                >
                  No students found.
                </td>
              </tr>
            ) : (
              students.map((s, value) => (
                <tr key={s._id} className="hover:bg-slate-800/40 transition">
                  {/* Sr. No. */}
                  <td className="px-4 py-3">
                    <div className="font-medium text-white">{value + 1}</div>
                  </td>

                  {/* Name */}
                  <td className="px-4 py-3">
                    <div className="font-medium text-white">{s.fullName}</div>
                  </td>

                  {/* Email */}
                  <td className="px-4 py-3 text-slate-300">{s.email}</td>

                  {/* Gender */}
                  <td className="px-4 py-3 capitalize text-slate-300">
                    {s.gender}
                  </td>

                  {/* Story Status */}
                  <td className="px-4 py-3">
                    {s.hasSubmittedStory ? (
                      <span
                        className="inline-flex items-center gap-1
                  px-2.5 py-0.5 rounded-full text-[10px]
                  bg-green-500/15 text-green-400"
                      >
                        Submitted
                      </span>
                    ) : (
                      <span
                        className="inline-flex items-center gap-1
                  px-2.5 py-0.5 rounded-full text-[10px]
                  bg-red-500/15 text-red-400"
                      >
                        Not Submitted
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      {/* 👁 View */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.92 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 20,
                        }}
                        onClick={() => setViewStudent(s)}
                        className="py-2 px-2.5 text-md rounded-full bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500 hover:text-white hover:shadow-blue-500/40"
                        aria-label="View Student"
                      >
                        <EyeIcon />
                      </motion.button>

                      {/* 🗑 Delete */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.92 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 20,
                        }}
                        onClick={() => setDeleteId(s._id)}
                        className="py-2 px-2.5 text-md rounded-full
      bg-red-500/20
      text-red-400
      border border-red-500/30
      hover:bg-red-500 hover:text-white
      hover:shadow-red-500/40
      transition-colors"
                        aria-label="Delete Student"
                      >
                        <DeleteIcon />
                      </motion.button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= PAGINATION ================= */}
      {pagination?.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-14 flex-wrap">
          {/* Prev */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md border border-slate-700
      text-slate-400 hover:text-white disabled:opacity-40"
          >
            Prev
          </button>

          {getVisiblePages(currentPage, pagination.totalPages).map((page, i) =>
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
            onClick={() =>
              setCurrentPage((p) => Math.min(p + 1, pagination.totalPages))
            }
            disabled={currentPage === pagination.totalPages}
            className="px-3 py-1 rounded-md border border-slate-700
      text-slate-400 hover:text-white disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

      {/* ================= VIEW STUDENT MODAL ================= */}
      <AnimatePresence>
        {viewStudent && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm
      flex items-center justify-center px-4"
            onClick={() => setViewStudent(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 30, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-xl
        bg-gradient-to-br from-slate-900 to-slate-950
        border border-slate-700/60
        rounded-md shadow-2xl p-6"
            >
              {/* Close */}
              <button
                onClick={() => setViewStudent(null)}
                className="absolute top-4 right-4
          text-slate-400 hover:text-white transition"
              >
                <CrossIcon className="text-lg" />
              </button>

              {/* Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white">
                  Student Details
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Complete student profile information
                </p>
              </div>

              {/* MAIN CONTENT */}
              <div className="space-y-2 sm:space-y-3 text-sm">
                {/* BASIC INFO */}
                <Section title="Basic Information">
                  <InfoGrid>
                    <Info label="Full Name" value={viewStudent.fullName} />
                    <Info label="Gender" value={viewStudent.gender} />
                    <Info label="Email" value={viewStudent.email} />
                    <Info label="Mobile" value={viewStudent.mobile} />
                  </InfoGrid>
                </Section>

                {/* DATES */}
                <Section title="">
                  <InfoGrid>
                    <Info
                      label="Date of Birth"
                      value={new Date(viewStudent.dob).toLocaleDateString()}
                    />
                    <Info
                      label="Account Created"
                      value={new Date(
                        viewStudent.createdAt
                      ).toLocaleDateString()}
                    />
                  </InfoGrid>

                  {/* <div className="mt-3">
                    <Info
                      label="Last Updated"
                      value={new Date(viewStudent.updatedAt).toLocaleString()}
                    />
                  </div> */}
                </Section>

                {/* STATUS */}
                <Section title="Status">
                  <div className="flex gap-3 flex-wrap">
                    <StatusBadge
                      label="Email Verified "
                      active={viewStudent.isVerified}
                    />
                    <StatusBadge
                      label="Success Story "
                      active={viewStudent.hasSubmittedStory}
                    />
                  </div>
                </Section>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= DELETE MODAL ================= */}
      <ConfirmModal
        open={!!deleteId}
        title="Delete Student...!"
        message="Are you sure you want to delete this student? This action cannot be undone."
        loading={deleteLoading}
        onCancel={() => setDeleteId(null)}
        onConfirm={async () => {
          const ok = await deleteStudent(deleteId);
          if (ok) {
            setDeleteId(null);
            fetchStudents(); // refresh list
          }
        }}
      />
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <p
        className="text-xs uppercase font-semibold tracking-wide
      text-slate-500 mb-1"
      >
        {title}
      </p>
      {children}
    </div>
  );
}

function InfoGrid({ children }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
      {children}
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div
      className="bg-slate-800/40 border border-slate-700/50 hover:border-sky-900
    rounded-sm px-3 py-2 md:px-4 md:py-3 transition"
    >
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      <p className="text-slate-200 font-medium break-all">{value || "-"}</p>
    </div>
  );
}

function StatusBadge({ label, active }) {
  return (
    <span
      className={`px-3 py-1 rounded-sm text-xs font-medium
      ${
        active
          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
          : "bg-rose-500/15 text-rose-400 border border-rose-500/30"
      }`}
    >
      {label}: {active ? "Yes" : "No"}
    </span>
  );
}
