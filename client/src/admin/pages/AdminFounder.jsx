import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAdminFounder from "../hooks/useAdminFounder";
import { CrossIcon } from "../../icons/Icons";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Loader from "../components/loader/Loader";

export default function AdminFounder() {
  const { getFounder, updateFounder, getLoading, updateLoading } =
    useAdminFounder();

  const [founder, setFounder] = useState(null);
  const [open, setOpen] = useState(false);

  const fetchFounder = async () => {
    const data = await getFounder();
    setFounder(data); // can be null (first time)
  };

  useEffect(() => {
    fetchFounder();
  }, []);

  return (
    <div className="px-2 min-h-screen">
      <h2 className="text-xl font-semibold text-white mb-4">Founder Section</h2>

      {/* Preview Card */}
      <div
        className="
    relative bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950
    border border-slate-800 rounded-md p-5 md:p-6
    overflow-hidden
  "
      >
        {/* subtle glow */}
        <div className="absolute inset-0 rounded-md ring-1 ring-blue-500/10 pointer-events-none" />

        <div className="relative z-10 space-y-8">
          {getLoading ? (
            <div className="w-full flex items-center justify-center">
              <Loader />
            </div>
          ) : founder ? (
            <div className="flex flex-col md:flex-row gap-5 md:gap-6">
              {/* ===== Image ===== */}
              <div className="shrink-0 flex justify-center md:justify-start">
                {founder.image?.url ? (
                  <img
                    src={founder.image.url}
                    alt={founder.name}
                    className="
                h-42 w-42 md:h-54 md:w-54
    rounded-md p-2 object-cover
    border border-slate-800
    shadow-sm shadow-blue-500/10
    transition-transform duration-500 ease-out
    hover:scale-[1.03] hover:shadow-blue-500/30
              "
                  />
                ) : (
                  <div
                    className="
                h-28 w-28 rounded-sm
                bg-slate-800 flex items-center justify-center
                text-slate-500 text-xs
                border border-slate-700
              "
                  >
                    No Image
                  </div>
                )}
              </div>

              {/* ===== Content ===== */}
              <div className="flex-1 space-y-3">
                {/* Name & Title */}
                <div>
                  <h3 className="text-lg font-semibold text-white tracking-wide text-center md:text-start">
                    {founder.name}
                  </h3>
                  <p className="text-sm font-medium text-blue-400 text-center md:text-start">
                    {founder.title}
                  </p>
                </div>

                {/* Bio */}
                <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                  {founder.bio}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap justify-evenly md:justify-start gap-2">
                  <span
                    className="
                px-3 py-1 rounded-full text-xs font-medium
                bg-blue-500/10 text-blue-400
                border border-blue-500/20
              "
                  >
                    {founder.specialization}
                  </span>

                  <span
                    className="
                px-3 py-1 rounded-full text-xs font-medium
                bg-emerald-500/10 text-emerald-400
                border border-emerald-500/20
              "
                  >
                    {founder.teachingStyle}
                  </span>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap justify-around md:justify-start gap-x-8 gap-y-4 pt-1 text-xs">
                  <div>
                    <p className="text-slate-400">Experience</p>
                    <p className="text-white font-medium">
                      {founder.experienceYears}+ yrs
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-400">Students Trained</p>
                    <p className="text-white font-medium">
                      {founder.studentsTrained}+
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-400">Last updated</p>
                    <p className="text-white font-medium">
                      {new Date(founder.updatedAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ✅ EMPTY STATE (as requested) */
            <p className="text-sm text-slate-400">
              Founder details not added yet.
            </p>
          )}

          {/* ===== Buttons ===== */}
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              onClick={() => setOpen(true)}
              className="
        inline-flex items-center gap-2
        px-4 py-2 rounded-md text-sm font-medium
        bg-blue-600 hover:bg-blue-500
        text-white shadow-md shadow-blue-600/20
        focus:outline-none
      "
            >
              {founder ? "Edit Founder" : "Add Founder"}
            </motion.button>

            {founder && (
              <Link
                to="/"
                target="_blank"
                rel="noopener noreferrer"
                className="
        inline-flex items-center gap-2
        px-3 py-2 rounded-md text-sm font-medium
        bg-slate-800 hover:bg-slate-700
        text-slate-200 border border-slate-700
        transition
      "
              >
                Public Preview
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {open && (
        <EditFounderModal
          founder={founder}
          onClose={() => setOpen(false)}
          onSuccess={fetchFounder}
          updateFounder={updateFounder}
          loading={updateLoading}
        />
      )}
    </div>
  );
}

/* ================= MODAL COMPONENT ================= */
function EditFounderModal({
  founder,
  onClose,
  onSuccess,
  updateFounder,
  loading,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  useEffect(() => {
    if (founder) reset(founder);
  }, [founder, reset]);

  const [preview, setPreview] = useState(founder?.image?.url || null);

  useEffect(() => {
    setPreview(founder?.image?.url || null);
  }, [founder]);

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key !== "image") formData.append(key, data[key] ?? "");
    });

    if (data.image?.[0]) {
      formData.append("image", data.image[0]);
    }

    const success = await updateFounder(formData);
    if (success) {
      onSuccess();
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur px-3 sm:px-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-slate-900 border border-slate-800
        rounded-md shadow-xl p-4 sm:p-6
        max-h-[90vh] overflow-y-auto scrollbar-slim"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base sm:text-lg font-semibold text-white">
            {founder ? "Edit Founder Details" : "Add Founder Details"}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <CrossIcon />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {/* Name */}
          <Field
            placeholder="Name"
            register={register("name", { required: "Name is required" })}
            error={errors.name}
          />

          {/* Title */}
          <Field
            placeholder="Title"
            register={register("title", { required: "Title is required" })}
            error={errors.title}
          />

          {/* Experience */}
          <Field
            type="number"
            placeholder="Experience (Years)"
            register={register("experienceYears", {
              required: "Experience is required",
              min: { value: 1, message: "At least 1 year" },
            })}
            error={errors.experienceYears}
          />

          {/* Students */}
          <Field
            type="number"
            placeholder="Students Trained"
            register={register("studentsTrained", {
              required: "Required",
              min: { value: 1, message: "Must be greater than 0" },
            })}
            error={errors.studentsTrained}
          />

          {/* Specialization */}
          <Field
            // className="sm:col-span-2"
            placeholder="Specialization"
            register={register("specialization", {
              required: "Specialization is required",
            })}
            error={errors.specialization}
          />

          {/* Teaching Style */}
          <Field
            // className="sm:col-span-2"
            placeholder="Teaching Style"
            register={register("teachingStyle", {
              required: "Teaching style is required",
            })}
            error={errors.teachingStyle}
          />

          {/* Bio */}
          <div className="sm:col-span-2">
            <textarea
              {...register("bio", {
                required: "Bio is required",
                minLength: {
                  value: 20,
                  message: "Minimum 20 characters",
                },
              })}
              rows={4}
              placeholder="Bio"
              className="input resize-none"
            />
            {errors.bio && (
              <p className="text-xs text-red-500 -mt-1">{errors.bio.message}</p>
            )}
          </div>

          {/* Image */}
          <div className="sm:col-span-2 -mt-1">
            <input
              type="file"
              accept="image/*"
              {...register("image", {
                required: !founder ? "Image is required" : false,
                validate: {
                  size: (files) =>
                    !files?.[0] ||
                    files[0].size < 5 * 1024 * 1024 ||
                    "Max 5MB allowed",
                  type: (files) =>
                    !files?.[0] ||
                    ["image/jpeg", "image/png", "image/webp"].includes(
                      files[0].type
                    ) ||
                    "Only JPG, PNG, WEBP allowed",
                },
              })}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const url = URL.createObjectURL(file);
                  setPreview(url);
                }
              }}
              className="block w-full text-sm text-slate-400
                               file:mr-4 file:py-1 file:px-3
                               file:rounded-sm file:border-0
                               file:bg-slate-800 file:text-white
                               hover:file:bg-slate-700 rounded-sm bg-slate-950
                 border border-slate-700 outline-none focus:border-slate-400 transition duration-500
                 px-2 py-1.5"
            />

            {preview && (
              <div className="mt-1 flex items-center gap-2">
                <img
                  src={preview}
                  alt="Preview"
                  className="h-16 w-16 object-cover rounded-sm
      border border-slate-700 shadow-sm"
                />
                <p className="text-xs text-slate-500">
                  {founder ? "<- Current image" : "<- Selected image"}
                </p>
              </div>
            )}

            {errors.image && (
              <p className="text-xs text-red-500 mt-0.5">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Actions Buttons */}
          <div
            className="sm:col-span-2 flex flex-col sm:flex-row
            justify-end gap-3 mt-3"
          >
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 rounded-sm text-sm
              bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              Cancel
            </motion.button>

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={!loading ? { scale: 0.95 } : {}}
              className={`w-full sm:w-auto px-5 py-2 rounded-sm text-sm
              font-medium text-white
              ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-500"
              }`}
            >
              {loading ? "Saving..." : "Save Changes"}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ================= SMALL FIELD COMPONENT ================= */
function Field({ register, error, placeholder, type = "text", className }) {
  return (
    <div className={className}>
      <input
        type={type}
        {...register}
        placeholder={placeholder}
        className="input"
      />
      {error && <p className="text-xs text-red-500 mt-0.5">{error.message}</p>}
    </div>
  );
}
