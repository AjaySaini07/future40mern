import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAdminHero from "../hooks/useAdminHero";
import AdminLoader from "../components/loader/AdminLoader";

export default function AdminHero() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const { getHero, updateHero, getLoading, updateLoading } = useAdminHero();

  const [heroExists, setHeroExists] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    getHero().then((data) => {
      if (data) {
        reset(data);
        setHeroExists(true);
        setImagePreview(data.backgroundImage?.url);
      }
    });
  }, []);

  const imageFile = watch("backgroundImage");

  useEffect(() => {
    if (imageFile?.[0]) {
      const file = imageFile[0];
      setImagePreview(URL.createObjectURL(file));
    }
  }, [imageFile]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "backgroundImage") {
        if (value?.[0]) formData.append(key, value[0]);
      } else {
        formData.append(key, value);
      }
    });

    const success = await updateHero(formData);
    if (success && !heroExists) setHeroExists(true);
  };

  return (
    <div className="max-w-4xl bg-slate-900 border border-slate-800 rounded-md p-6">
      <h2 className="text-2xl font-semibold text-blue-400 mb-4">
        Hero Section
      </h2>

      {getLoading ? (
        // <p className="text-slate-400">Loading hero data...</p>
        <div className="w-full flex items-center justify-center">
          <AdminLoader />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-1">
            {/* Title */}
            <div>
              <label className="text-xs text-slate-400 mb-1 block">
                Title (Badge Text)
              </label>
              <input
                {...register("title", { required: "Title is required" })}
                placeholder="e.g. Trusted by 10,000+ students"
                className="input"
              />
              {errors.title && (
                <p className="text-xs text-red-400 mt-0.5">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Heading */}
            <div>
              <label className="text-xs text-slate-400 mb-1 block">
                Main Heading
              </label>
              <input
                {...register("heading", { required: "Heading is required" })}
                placeholder="Main hero heading"
                className="input"
              />
              {errors.heading && (
                <p className="text-xs text-red-400 mt-0.5">
                  {errors.heading.message}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs text-slate-400 mb-1 block">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Short hero description"
              className="input h-24"
            />
            {errors.description && (
              <p className="text-xs text-red-400 -mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Years Experience */}
            <div>
              <label className="text-xs text-slate-400 mb-1 block">
                Years of Experience
              </label>
              <input
                type="number"
                {...register("yearsExperience", {
                  required: "Years experience is required",
                  min: { value: 0, message: "Must be 0 or greater" },
                })}
                placeholder="e.g. 10"
                className="input"
              />
              {errors.yearsExperience && (
                <p className="text-xs text-red-400 mt-0.5">
                  {errors.yearsExperience.message}
                </p>
              )}
            </div>

            {/* Students Trained */}
            <div>
              <label className="text-xs text-slate-400 mb-1 block">
                Students Trained
              </label>
              <input
                type="number"
                {...register("studentsTrained", {
                  required: "Students trained is required",
                  min: { value: 0, message: "Must be 0 or greater" },
                })}
                placeholder="e.g. 12000"
                className="input"
              />
              {errors.studentsTrained && (
                <p className="text-xs text-red-400 mt-0.5">
                  {errors.studentsTrained.message}
                </p>
              )}
            </div>

            {/* Success Rate */}
            <div>
              <label className="text-xs text-slate-400 mb-1 block">
                Success Rate (%)
              </label>
              <input
                type="number"
                {...register("successRate", {
                  required: "Success rate is required",
                  min: { value: 0, message: "Min 0%" },
                  max: { value: 100, message: "Max 100%" },
                })}
                placeholder="e.g. 95"
                className="input"
              />
              {errors.successRate && (
                <p className="text-xs text-red-400 mt-0.5">
                  {errors.successRate.message}
                </p>
              )}
            </div>
          </div>

          {/* Background Image */}
          <div>
            <label className="text-xs text-slate-400 mb-1 block">
              Background Image
            </label>

            <input
              type="file"
              accept="image/*"
              {...register("backgroundImage", {
                required: !heroExists && "Background image is required",
              })}
              className="input"
            />

            {errors.backgroundImage && (
              <p className="text-xs text-red-400 mt-0.5">
                {errors.backgroundImage.message}
              </p>
            )}

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Hero Preview"
                className="mt-1 h-32 w-full object-cover rounded border border-slate-700"
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            disabled={updateLoading}
            className={`
    w-full py-1.5 mt-3 rounded
    text-white transition
    flex items-center justify-center
    ${
      updateLoading
        ? "bg-blue-600 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700"
    }
  `}
          >
            {updateLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Updating...
              </span>
            ) : heroExists ? (
              "Update Hero Section"
            ) : (
              "Create Hero Section"
            )}
          </button>
        </form>
      )}
    </div>
  );
}
