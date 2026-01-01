import { useState, useRef } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import Reveal from "./Reveal";
import { RxCross1 } from "react-icons/rx";
import { useSuccessStory } from "../hooks/useSuccessStory";
import { FaStar } from "react-icons/fa";

export default function SuccessForm() {
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);

  const { submitStory, submitLoading } = useSuccessStory();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const rating = watch("rating") || 0;

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  // Form Submit Function ----------------
  const onSubmit = async (data) => {
    console.log("Body Console ----->", data);
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

    const res = await submitStory(formData);

    if (res?.success) {
      reset();
      setOpen(false);
    }
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      reset();
      setOpen(false);
    }
  };

  return (
    <section
      id="success-form"
      className="bg-slate-950 py-12 border-t border-b border-slate-800"
    >
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Heading */}
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold">
            Submit Your <span className="text-blue-400">Success Story</span>
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Inspire others by sharing your experience.
          </p>

          {/* <button
            onClick={() => setOpen(true)}
            className="
    mt-8 px-8 py-3 rounded-full
    border-2 border-blue-500
    text-blue-400 font-semibold
    cursor-pointer
    transition-all duration-300
    hover:scale-102 hover:text-white
    active:scale-95
  "
          >
            Share Your Story
          </button> */}

          <div className="flex justify-center mt-8">
            <button
              onClick={() => setOpen(true)}
              className="
                inline-flex items-center justify-center
                px-8 py-3
                rounded-full
                border-2 border-blue-500
                text-blue-400 font-semibold
                transition-all duration-300
                hover:bg-blue-500 hover:text-white
                hover:scale-100
                active:scale-95
              "
            >
              Share Your Story
            </button>
          </div>
        </Reveal>

        {/* MODAL */}
        {open && (
          <div
            onClick={handleOutsideClick}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm
                       flex items-center justify-center z-50 px-3"
          >
            <div
              ref={modalRef}
              className="bg-slate-900 border border-slate-700
                         rounded-lg w-full sm:w-[90%] md:max-w-xl
                         max-h-[90vh] overflow-y-auto
                         p-4 sm:p-6 animate-fadeInScale"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-blue-400 font-bold text-lg sm:text-xl">
                  Share Your Story
                </h3>
                <RxCross1
                  onClick={() => {
                    reset();
                    setOpen(false);
                  }}
                  className="flex items-start justify-center
                             text-2xl text-slate-400 hover:text-white cursor-pointer mt-1"
                />
              </div>

              <div className="flex-1 overflow-y-auto scrollbar-slim pr-1">
                {/* FORM */}
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-2 text-left"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                    {/* Name */}
                    <div>
                      <label className="text-xs text-slate-400">Name *</label>
                      <input
                        {...register("name", { required: true })}
                        className="w-full rounded-md bg-slate-950
                 border border-slate-700 outline-none focus:border-slate-400 transition duration-500
                 px-4 py-2 text-sm"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-0.5">
                          Name is required
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-xs text-slate-400">Email *</label>
                      <input
                        type="email"
                        {...register("email", { required: true })}
                        className="w-full rounded-md bg-slate-950
                 border border-slate-700 outline-none focus:border-slate-400 transition duration-500
                 px-4 py-2 text-sm"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-0.5">
                          Email is required
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                    {/* Gender */}
                    <div>
                      <label className="text-xs text-slate-400">Gender *</label>

                      <Controller
                        name="gender"
                        control={control}
                        rules={{ required: "Gender is required" }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={genderOptions}
                            placeholder="Select Gender"
                            isSearchable={false}
                            className="react-select-container"
                            classNamePrefix="react-select"
                            styles={{
                              control: (base, state) => ({
                                ...base,
                                backgroundColor: "#020617", // slate-950
                                borderColor: state.isFocused
                                  ? "#94a3b8"
                                  : "#334155",
                                borderRadius: "0.3rem",
                                minHeight: "40px",
                                boxShadow: "none",
                                ":hover": {
                                  borderColor: "#94a3b8",
                                },
                              }),
                              menu: (base) => ({
                                ...base,
                                backgroundColor: "#020617",
                                borderRadius: "0.75rem",
                                border: "1px solid #334155",
                                overflow: "hidden",
                              }),
                              option: (base, state) => ({
                                ...base,
                                backgroundColor: state.isFocused
                                  ? "#1e293b"
                                  : "#020617",
                                color: "#e5e7eb",
                                borderRadius: "0.3rem",
                                cursor: "pointer",
                              }),
                              singleValue: (base) => ({
                                ...base,
                                color: "#e5e7eb",
                              }),
                              placeholder: (base) => ({
                                ...base,
                                color: "#64748b",
                                fontSize: "0.875rem",
                              }),
                            }}
                            onChange={(val) => field.onChange(val?.value)}
                            value={genderOptions.find(
                              (opt) => opt.value === field.value
                            )}
                          />
                        )}
                      />

                      {errors.gender && (
                        <p className="text-red-500 text-xs mt-0.5">
                          {errors.gender.message}
                        </p>
                      )}
                    </div>

                    {/* Key Achievement */}
                    <div>
                      <label className="text-xs text-slate-400">
                        Key Achievement *
                      </label>

                      <input
                        {...register("achievement", {
                          required: "Achievement is required",
                          minLength: {
                            value: 5,
                            message:
                              "Achievement must be at least 5 characters",
                          },
                        })}
                        placeholder="e.g. Cracked Interview, Improved English fluency"
                        className="w-full rounded-md bg-slate-950
      border border-slate-700 outline-none
      focus:border-slate-400 transition duration-500
      px-4 py-2 text-sm text-white"
                      />

                      {errors.achievement && (
                        <p className="text-red-500 text-xs mt-0.5">
                          {errors.achievement.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                    {/* Photo (optional) */}
                    <div>
                      <label className="text-xs text-slate-400">
                        Upload Photo (optional)
                      </label>
                      <input
                        type="file"
                        {...register("photo")}
                        className="block w-full text-sm text-slate-400
                               file:mr-4 file:py-1 file:px-3
                               file:rounded-md file:border-0
                               file:bg-slate-800 file:text-white
                               hover:file:bg-slate-700 rounded-md bg-slate-950
                 border border-slate-700 outline-none focus:border-slate-400 transition duration-500
                 px-2 py-1.5"
                      />
                    </div>

                    {/* Rating */}
                    <div className="">
                      <label className="text-xs text-slate-400 mt-0.5">
                        Your Rating *
                      </label>

                      {/* Hidden input so RHF can validate */}
                      <input
                        type="hidden"
                        {...register("rating", {
                          required: "Rating is required",
                        })}
                      />

                      <div className="flex items-center gap-2 text-xl mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() =>
                              setValue("rating", star, { shouldValidate: true })
                            }
                            className={`transition ${
                              star <= rating
                                ? "text-yellow-400 scale-105"
                                : "text-slate-500"
                            }`}
                          >
                            {/* ★ */}
                            <FaStar />
                          </button>
                        ))}

                        {errors.rating && (
                          <p className="text-red-500 text-xs ms-1 mt-1">
                            {errors.rating.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Story */}
                  <div>
                    <label className="text-xs text-slate-400">
                      Success Story *
                    </label>

                    <textarea
                      rows={4}
                      {...register("story", {
                        required: "Success Story is required",
                        minLength: {
                          value: 20,
                          message: "Story must be at least 20 characters",
                        },
                      })}
                      className="w-full h-20 rounded-md bg-slate-950
      border border-slate-700 outline-none
      focus:border-slate-400 transition duration-500
      px-4 py-2 text-sm"
                    />

                    {errors.story && (
                      <p className="text-xs text-red-500 -mt-1">
                        {errors.story.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitLoading}
                    aria-disabled={submitLoading}
                    className={`
    w-full mt-4 py-2 text-sm font-medium rounded-sm text-white bg-blue-600 transition
    ${
      submitLoading
        ? " cursor-not-allowed opacity-70"
        : "hover:bg-blue-500 cursor-pointer"
    }
  `}
                  >
                    {submitLoading ? "Submitting..." : "Submit Story"}
                  </button>

                  <p className="text-center text-[11px] text-slate-500">
                    Your story will be reviewed before publishing.
                  </p>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
