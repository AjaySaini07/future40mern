// import { useEffect } from "react";
// import { motion } from "framer-motion";
// import useStudentProfile from "../hooks/useStudentProfile";
// import { StarIcon } from "../icons/Icons";
// import Loader from "../admin/components/loader/Loader";

// export default function Profile() {
//   const { profile, fetchProfile, loading } = useStudentProfile();

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   /* ---------------- LOADING ---------------- */
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-slate-950 flex items-center justify-center">
//         <p className="text-slate-400 text-sm">
//           <Loader />
//         </p>
//       </div>
//     );
//   }

//   if (!profile) return null;

//   return (
//     <div className="min-h-screen bg-slate-950 px-4 py-8">
//       <motion.div
//         key={profile._id}
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         className="max-w-5xl mx-auto space-y-3"
//       >
//         {/* ================= HERO CARD ================= */}
//         <div
//           className="bg-gradient-to-br from-slate-900 to-slate-950
// border border-slate-700 rounded-md p-5
// flex items-center justify-between gap-4"
//         >
//           <div className="flex items-center gap-4">
//             {/* Avatar */}
//             <div
//               className="w-12 h-12 rounded-full
//     bg-gradient-to-br from-blue-500 to-purple-500
//     flex items-center justify-center text-white font-bold text-lg"
//             >
//               {profile.fullName.charAt(0)}
//             </div>

//             <div>
//               <h2 className="text-lg font-semibold text-white">
//                 {profile.fullName}
//               </h2>
//               <p className="text-sm text-slate-400">{profile.email}</p>
//             </div>
//           </div>

//           <div className="flex gap-2 flex-wrap">
//             <Status label="Verified " active={profile.isVerified} />
//             <Status label="Story " active={profile.hasSubmittedStory} />
//           </div>
//         </div>

//         {/* ================= MAIN GRID ================= */}
//         <div className="grid lg:grid-cols-3 gap-3">
//           {/* LEFT COLUMN */}
//           <div className="lg:col-span-1 space-y-4">
//             <CompactCard title="Personal Info">
//               <div className="grid grid-cols-2 gap-4 text-sm">
//                 <Info label="Mobile" value={profile.mobile} />
//                 <Info label="Gender" value={profile.gender} />
//                 <Info
//                   label="DOB"
//                   value={new Date(profile.dob).toLocaleDateString()}
//                 />
//               </div>
//             </CompactCard>
//           </div>

//           {/* RIGHT COLUMN */}
//           <div className="lg:col-span-2 space-y-4">
//             {/* SUCCESS STORY */}
//             {profile.story ? (
//               <CompactCard title="My Success Story">
//                 <div className="grid sm:grid-cols-3 gap-4 items-start">
//                   <Info label="Achievement" value={profile.story.achievement} />

//                   {/* ⭐ Rating */}
//                   <div>
//                     <p className="text-xs text-slate-400 mb-1">Rating</p>
//                     <div className="flex items-center gap-1">
//                       {Array.from({ length: 5 }).map((_, index) => (
//                         <StarIcon
//                           key={index}
//                           className={`transition-all duration-200 text-lg ${
//                             index < profile.story.rating
//                               ? "text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.7)]"
//                               : "text-slate-600"
//                           }`}
//                         />
//                       ))}
//                     </div>
//                   </div>

//                   <Status label="Approved " active={profile.story.approved} />
//                 </div>

//                 {/* Story Text */}
//                 <div
//                   className="mt-4 bg-slate-800/40 border border-slate-700
//       rounded-md p-3 max-h-40 overflow-y-auto scrollbar-slim"
//                 >
//                   <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-line">
//                     {profile.story.story}
//                   </p>
//                 </div>

//                 <p className="text-xs text-slate-400 mt-2">
//                   Submitted on{" "}
//                   {new Date(profile.story.createdAt).toLocaleDateString()}
//                 </p>

//                 {!profile.story.approved && (
//                   <p className="text-xs text-yellow-400 mt-1">
//                     ⏳ Under review
//                   </p>
//                 )}
//               </CompactCard>
//             ) : (
//               <CompactCard title="My Success Story">
//                 <p className="text-sm text-slate-400">
//                   You haven’t submitted a success story yet.
//                 </p>
//               </CompactCard>
//             )}
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// /* ----------------- REUSABLE COMPONENTS ----------------- */
// function CompactCard({ title, children }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       className="bg-slate-900 border border-slate-700
//       rounded-md px-5 py-4"
//     >
//       <h3 className="text-sm font-semibold text-slate-200 mb-3">{title}</h3>
//       <div className="space-y-3">{children}</div>
//     </motion.div>
//   );
// }

// function Info({ label, value }) {
//   return (
//     <div>
//       <p className="text-xs text-slate-400">{label}</p>
//       <p className="text-slate-200 font-medium break-all">{value || "-"}</p>
//     </div>
//   );
// }

// function Status({ label, active }) {
//   return (
//     <span
//       className={`inline-flex items-center gap-1
//       px-3 py-1 rounded-full text-xs font-medium
//       ${
//         active
//           ? "bg-emerald-500/15 text-emerald-400"
//           : "bg-rose-500/15 text-rose-400"
//       }`}
//     >
//       {label}: {active ? "Yes" : "No"}
//     </span>
//   );
// }

import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { StarIcon, CrossIcon, WarningIcon, TooltipIcon } from "../icons/Icons";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../utils/cropImage";
import useStudentProfile from "../hooks/useStudentProfile";
import { FaCheckCircle, FaTimesCircle, FaBook } from "react-icons/fa";

export default function Profile() {
  const { profile, fetchProfile, loading } = useStudentProfile();
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  /* ----------------------- SKELETON ----------------------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 px-4 py-10">
        <div className="max-w-5xl mx-auto space-y-3 animate-pulse">
          <div className="h-24 bg-slate-800 rounded-xl" />
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="h-40 bg-slate-800 rounded-xl" />
            <div className="lg:col-span-2 h-60 bg-slate-800 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-4">
      <div className="max-w-5xl mx-auto space-y-2">
        {/* ------------------ HERO CARD ------------------ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative w-full bg-gradient-to-br 
  from-slate-900 to-slate-950 
  border border-slate-700 
  rounded-md p-4
  flex flex-col [@media(min-width:450px)]:flex-row 
  [@media(min-width:450px)]:items-center [@media(min-width:450px)]:justify-between gap-2"
        >
          {/* Left Section */}
          <div className="flex items-center gap-2 [@media(min-width:500px)]:gap-3">
            <div
              className="
  relative h-11 w-11
  [@media(min-width:500px)]:w-13 [@media(min-width:500px)]:h-13
  rounded-full
  bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500
  flex items-center justify-center
  text-white font-bold text-2xl
  leading-none
  shadow-xl
"
            >
              <span className="drop-shadow-md -translate-y-[2px]">
                {profile.fullName?.charAt(0).toUpperCase()}
              </span>
            </div>

            <div>
              <h2 className="text-md [@media(min-width:500px)]:text-xl font-semibold text-white">
                {profile.fullName}
              </h2>
              <p className="text-xs [@media(min-width:500px)]:text-sm text-slate-400">
                {profile.email}
              </p>
            </div>
          </div>

          {/* 🔥 Badges Section */}
          <div className="flex gap-2 flex-wrap">
            <AnimatedBadge active={profile.isVerified} type="verified" />

            <AnimatedBadge active={profile.hasSubmittedStory} type="story" />
          </div>
        </motion.div>

        {/* ------------------ MAIN GRID ------------------ */}
        <div className="flex justify-between flex-wrap gap-2">
          {/* PERSONAL INFO */}
          <div className="w-full min-w-0">
            <GlassCard title="Personal Info">
              <div
                className="
      grid gap-3
      grid-cols-1
      min-[480px]:grid-cols-2
    "
              >
                <Info label="Mobile" value={profile.mobile} />

                <Info label="Email" value={profile.email} />

                {/* <Info label="Gender" value={profile.gender} /> */}
                <Info
                  label="Gender"
                  value={
                    profile.gender
                      ? profile.gender.charAt(0).toUpperCase() +
                        profile.gender.slice(1)
                      : "-"
                  }
                />

                <Info
                  label="DOB"
                  value={
                    profile.dob
                      ? new Date(profile.dob).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "-"
                  }
                />
              </div>
            </GlassCard>
          </div>

          {/* ----------- SUCCESS STORY ----------- */}
          <div className="w-full min-w-0">
            {profile.story ? (
              <GlassCard title="My Success Story">
                {/* ----------- HEADER ROW ----------- */}
                <div
                  className="
        grid gap-4
        min-[280px]:grid-cols-1
        min-[480px]:grid-cols-[1fr_auto]
        items-start
      "
                >
                  {/* LEFT SIDE */}
                  <div className="flex items-start gap-3 min-w-0">
                    {/* Profile Image */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={profile.story.photo?.url}
                        alt={profile.story.name}
                        className="
              w-16 h-16
              min-[480px]:w-21 min-[480px]:h-21
              rounded-full object-cover
              border border-slate-600
              ring-2 ring-blue-500/30
              shadow-xl
            "
                      />
                      <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl -z-10" />
                    </div>

                    {/* Info */}
                    <div className="min-w-0 pt-0 [@media(min-width:480px)]:pt-1.5">
                      <p className="text-base sm:text-lg font-semibold text-white truncate">
                        {profile.story.name}
                      </p>

                      <p className="text-sm text-slate-300 truncate">
                        {profile.story.achievement}
                      </p>

                      {/* Rating */}
                      <div className="flex gap-1 mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`text-sm [@media(min-width:480px)]:text-md transition-all duration-300 ${
                              i < profile.story.rating
                                ? "text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.7)]"
                                : "text-slate-600"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT SIDE */}
                  <div
                    className="
          grid gap-2
          justify-items-start
          min-[480px]:justify-items-end
          w-full
        "
                  >
                    <AnimatedStatus approved={profile.story.approved} />

                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setOpenEdit(true)}
                      className="
            w-full min-[480px]:w-auto
            px-4 py-1.5
            rounded-full
            text-xs sm:text-sm
            font-medium
            bg-gradient-to-r from-blue-600 to-blue-500
            hover:from-blue-500 hover:to-blue-400
            transition-all duration-300
            text-white shadow-lg
          "
                    >
                      Update Story
                    </motion.button>

                    <div className="flex gap-1 items-start text-yellow-400/90 w-full -mt-1">
                      <WarningIcon className="mt-[2px] text-[13px]" />
                      <p className="text-[10px] sm:text-xs leading-relaxed break-words">
                        Editing will send your story for review again.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Story Text */}
                <div
                  className="
        mt-5 px-3 py-2
        rounded-sm overflow-y-auto scrollbar-slim
        bg-slate-800/40 backdrop-blur
        border border-slate-700
        max-h-52 overflow-y-auto
        min-w-0
      "
                >
                  <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-line break-words">
                    {profile.story.story}
                  </p>
                </div>

                {/* Dates */}
                <div className="mt-4 flex flex-wrap gap-2 [@media(min-width:380px)]:gap-3">
                  <div
                    className="
          flex items-center gap-1 px-3 py-1.5
          bg-slate-800/60 border border-slate-700
          rounded-sm text-[10px] [@media(min-width:380px)]:text-[11px]
        "
                  >
                    <span className="text-blue-300">Submitted -</span>
                    <span className="font-medium text-slate-200">
                      {new Date(profile.story.createdAt).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </span>
                  </div>

                  <div
                    className="
          flex items-center gap-1 px-3 py-1.5
          bg-slate-800/60 border border-slate-700
          rounded-sm text-[10px] [@media(min-width:380px)]:text-[11px]
        "
                  >
                    <span className="text-blue-300">Updated -</span>
                    <span className="font-medium text-slate-200">
                      {new Date(profile.story.updatedAt).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </span>
                  </div>
                </div>
              </GlassCard>
            ) : (
              <GlassCard title="My Success Story">
                <p className="text-sm text-slate-400">
                  You haven’t submitted a success story yet.
                </p>
              </GlassCard>
            )}
          </div>
        </div>
      </div>

      {/* ---------- UPDATE MODAL ---------- */}
      <AnimatePresence>
        {openEdit && (
          <UpdateStoryModal
            story={profile?.story}
            onClose={() => setOpenEdit(false)}
            onSuccess={() => {
              fetchProfile();
              setOpenEdit(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------- Animated Badge ------------ */
function AnimatedBadge({ active, type }) {
  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`flex items-center px-3 py-1 rounded-full 
      text-[10px] [@media(min-width:555px)]:text-xs 
      font-medium border transition-all duration-300
      ${
        active
          ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
          : "bg-rose-500/15 text-rose-400 border-rose-500/30"
      }`}
    >
      {type === "verified" && (active ? "Verified" : "Not Verified")}

      {type === "story" && `Story : ${active ? "Submitted" : "Not Submitted"}`}
    </motion.span>
  );
}

/* -------------- GLASS CARD -------------- */
function GlassCard({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-br 
  from-slate-900 to-slate-950 
  border border-slate-700 rounded-md p-4 sm:p-5"
    >
      <h3 className="text-lg font-semibold text-blue-400 mb-4">{title}</h3>
      {children}
    </motion.div>
  );
}

/* ----------------- INFO ----------------- */
function Info({ label, value }) {
  return (
    <div
      className="
      px-3 py-2
      rounded-sm
      bg-slate-800/40
      border border-slate-700
      backdrop-blur
      min-w-0
    "
    >
      <p className="text-[11px] text-slate-400 uppercase tracking-wide">
        {label}
      </p>

      <p className="text-sm text-slate-200 mt-1">{value || "-"}</p>
    </div>
  );
}

/* ---------------- STATUS ---------------- */
function AnimatedStatus({ approved }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium ${
        approved
          ? "bg-emerald-500/20 text-emerald-400"
          : "bg-yellow-400/10 text-yellow-400"
      }`}
    >
      {approved ? "✅ Approved" : "⏳ Pending Review"}
    </motion.span>
  );
}

/* ----------------- Update Story Modal Form ----------------- */
function UpdateStoryModal({ story, onClose, onSuccess }) {
  const modalRef = useRef(null);

  const { updateStory, updateLoading } = useStudentProfile();

  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedPixels, setCroppedPixels] = useState(null);
  const [showCrop, setShowCrop] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: story?.name,
      email: story?.email,
      achievement: story?.achievement,
      rating: story?.rating,
      story: story?.story,
    },
  });

  const rating = watch("rating") || 0;

  /* ------------------ SUBMIT ------------------ */
  const onSubmit = async (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "photo") {
        if (value?.length > 0) {
          formData.append("photo", value[0]);
        }
      } else {
        formData.append(key, value);
      }
    });

    const res = await updateStory(formData);

    if (res?.success) {
      onSuccess();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-slate-700
        rounded-md w-[99%] sm:w-[90%] md:max-w-xl
        max-h-[90vh] overflow-y-auto scrollbar-slim
        p-4 sm:p-6"
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-blue-400 font-bold text-lg sm:text-xl">
            Update Your Story
          </h3>
          <CrossIcon
            onClick={onClose}
            className="text-xl text-slate-400 hover:text-white cursor-pointer"
          />
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-1 sm:space-y-2 text-left"
        >
          <div className="grid grid-cols-1 [@media(min-width:480px)]:grid-cols-2 gap-x-4 gap-y-1 [@media(min-width:480px)]:gap-y-2">
            {/* Name */}
            <div className="space-y-0">
              <label className="text-xs text-slate-400">Name *</label>
              <input
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                  validate: (value) =>
                    value.trim() !== "" || "Name cannot be empty spaces",
                })}
                className={`w-full rounded-sm bg-slate-900 border px-3 py-2 
    text-xs sm:text-sm outline-none text-white transition duration-300
    ${
      errors.name
        ? "border-red-500 focus:border-red-500"
        : "border-slate-700 focus:border-blue-500"
    }`}
              />
              {errors.name && (
                <p className="text-[11px] text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-xs text-slate-400">Email *</label>

              <div className="relative">
                <input
                  type="email"
                  disabled
                  {...register("email")}
                  className="w-full rounded-sm bg-slate-800 border border-slate-700 
      px-3 py-2 pr-9 text-xs sm:text-sm outline-none 
      text-slate-400 cursor-not-allowed"
                />

                {/* Info Icon */}
                <div className="absolute inset-y-0 right-2 flex items-center group">
                  <TooltipIcon className="text-slate-500 text-lg cursor-pointer hover:text-blue-400 transition duration-200" />

                  {/* Tooltip */}
                  <div
                    className="
        absolute right-0 bottom-8
        opacity-0 group-hover:opacity-100
        transition duration-300
        pointer-events-none
        bg-slate-900 border border-slate-700
        text-[11px] text-slate-300
        px-2 py-1 rounded-sm shadow-lg
        whitespace-nowrap
        z-20
      "
                  >
                    You cannot change your registered email
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 [@media(min-width:480px)]:grid-cols-2 gap-x-4 gap-y-1 [@media(min-width:480px)]:gap-y-2">
            {/* Achievement */}
            <div className="space-y-0">
              <label className="text-xs text-slate-400">
                Key Achievement *
              </label>
              <input
                {...register("achievement", {
                  required: "Achievement is required",
                  minLength: {
                    value: 5,
                    message: "Achievement must be at least 5 characters",
                  },
                })}
                className={`w-full rounded-sm bg-slate-900 border px-3 py-2 
    text-xs sm:text-sm outline-none text-white transition duration-300
    ${
      errors.achievement
        ? "border-red-500 focus:border-red-500"
        : "border-slate-700 focus:border-blue-500"
    }`}
              />
              {errors.achievement && (
                <p className="text-[11px] text-red-400">
                  {errors.achievement.message}
                </p>
              )}
            </div>

            {/* Rating */}
            <div>
              <label className="text-xs text-slate-400">Your Rating *</label>
              <input
                type="hidden"
                {...register("rating", { required: true })}
              />

              <div className="flex gap-2 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() =>
                      setValue("rating", star, { shouldValidate: true })
                    }
                    className={`text-xl transition ${
                      star <= rating
                        ? "text-yellow-400 scale-105"
                        : "text-slate-500"
                    }`}
                  >
                    <StarIcon />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Photo Upload */}
          <div>
            <label className="text-xs text-slate-400">
              Upload New Photo (optional)
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = () => {
                  setImageSrc(reader.result);
                  setShowCrop(true);
                };
                reader.readAsDataURL(file);
              }}
              className="block w-full
              file:mr-4 file:px-2 file:rounded-sm
              file:bg-slate-800 file:text-white
              rounded-sm bg-slate-900 border border-slate-700 px-3 py-2 text-xs sm:text-sm outline-none text-white focus:border-blue-500 transtion duration-500"
            />
          </div>

          {/* Story */}
          <div className="space-y-0">
            <label className="text-xs text-slate-400">Success Story *</label>

            <textarea
              rows={4}
              {...register("story", {
                required: "Story is required",
                minLength: {
                  value: 20,
                  message: "Story must be at least 20 characters",
                },
                maxLength: {
                  value: 5000,
                  message: "Story cannot exceed 5000 characters",
                },
              })}
              className={`w-full rounded-sm bg-slate-900 border px-3 py-2 
    text-xs sm:text-sm outline-none text-white h-25 [@media(min-width:480px)]:h-30
    overflow-y-auto scrollbar-slim transition duration-300
    ${
      errors.story
        ? "border-red-500 focus:border-red-500"
        : "border-slate-700 focus:border-blue-500"
    }`}
            />

            {/* Bottom Row: Error + Counter */}
            <div className="flex justify-between items-center">
              {errors.story ? (
                <p className="text-[11px] text-red-400 -mt-2">
                  {errors.story.message}
                </p>
              ) : (
                <span />
              )}

              <p
                className={`text-[11px] -mt-1 ${
                  (watch("story")?.length || 0) > 5000
                    ? "text-red-400"
                    : "text-slate-500"
                }`}
              >
                {watch("story")?.length || 0}/5000
              </p>
            </div>
          </div>

          {/* Update Button */}
          <motion.button
            type="submit"
            disabled={updateLoading}
            whileTap={{ scale: 0.98 }}
            className={`
    w-full flex items-center justify-center py-2 text-xs sm:text-sm font-medium rounded-sm text-white
    bg-blue-600 transition-all duration-300
    ${
      updateLoading
        ? "opacity-60 cursor-not-allowed"
        : "hover:bg-blue-500 cursor-pointer"
    }
  `}
          >
            {updateLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Updating...
              </span>
            ) : (
              "Update Story"
            )}
          </motion.button>
        </form>

        {/*------ Image Crop Modal ------*/}
        {showCrop && (
          <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center px-4">
            <div className="bg-slate-900 p-4 rounded-md w-full max-w-md">
              <div className="relative h-64 bg-black">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={(_, pixels) => setCroppedPixels(pixels)}
                />
              </div>

              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(e.target.value)}
                className="w-full mt-3"
              />

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  className="flex-1 text-sm sm:text-base text-white bg-slate-700 py-2 rounded hover:bg-slate-600 transition-all duration-300"
                  onClick={() => setShowCrop(false)}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="flex-1 text-sm sm:text-base text-white bg-blue-600 hover:bg-blue-800 py-2 rounded transition-all duration-300"
                  onClick={async () => {
                    const blob = await getCroppedImg(imageSrc, croppedPixels);

                    const file = new File([blob], "photo.jpg", {
                      type: "image/jpeg",
                    });

                    setValue("photo", [file], {
                      shouldValidate: true,
                    });

                    setShowCrop(false);
                  }}
                >
                  Crop & Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
