import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import Reveal from "./Reveal";
import { useSuccessStory } from "../hooks/useSuccessStory";
import { CrossIcon, StarIcon } from "../icons/Icons";

import Cropper from "react-easy-crop";
import { getCroppedImg } from "../utils/cropImage";
import { motion } from "framer-motion";

export default function SuccessForm() {
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);

  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedPixels, setCroppedPixels] = useState(null);
  const [showCrop, setShowCrop] = useState(false);

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
        <Reveal>
          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
            Submit Your <span className="text-blue-400">Success Story</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 sm:mt-2">
            Inspire others by sharing your experience.
          </p>

          {/* Share Your Story Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setOpen(true)}
              className="
                inline-flex items-center justify-center
                px-8 py-3
                text-xs sm:text-sm md:text-base
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
                       flex items-center justify-center z-50 px-4"
          >
            <div
              ref={modalRef}
              className="bg-slate-900 border border-slate-700
                         rounded-md w-[99%] [@media(min-width:480px)]:w-[90%] md:max-w-xl
                         max-h-[90vh] overflow-y-auto scrollbar-slim pr-3 scroll-smooth
                         p-4 sm:p-6 animate-fadeInScale"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-blue-400 font-bold text-lg sm:text-xl">
                  Share Your Story
                </h3>
                <CrossIcon
                  onClick={() => {
                    reset();
                    setOpen(false);
                  }}
                  className="flex items-start justify-center 
                             text-xl sm:text-2xl text-slate-400 hover:text-white cursor-pointer mt-1"
                />
              </div>

              <div className="flex-1">
                {/* FORM */}
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-2 text-left"
                >
                  <div className="grid grid-cols-1 [@media(min-width:480px)]:grid-cols-2 gap-x-4 gap-y-1 [@media(min-width:480px)]:gap-y-2">
                    {/* Full Name */}
                    <div>
                      <label className="text-xs text-slate-400">
                        Full Name *
                      </label>
                      <input
                        {...register("name", { required: true })}
                        className="w-full rounded-sm bg-slate-900
                 border border-slate-700 outline-none focus:border-slate-400 transition duration-500
                 px-2 [@media(min-width:480px)]:px-3 py-2 [@media(min-width:480px)]:py-2 text-xs sm:text-sm"
                      />
                      {errors.name && (
                        <p className="text-red-500 sm:font-semibold text-xs">
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
                        placeholder="Enter registered email"
                        className="w-full rounded-sm bg-slate-900
                 border border-slate-700 outline-none focus:border-slate-400 transition duration-500
                 px-2 [@media(min-width:480px)]:px-3 py-2 [@media(min-width:480px)]:py-2 text-xs sm:text-sm"
                      />
                      {errors.email && (
                        <p className="text-red-500 sm:font-semibold text-xs">
                          Email is required
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 [@media(min-width:480px)]:grid-cols-2 gap-x-4 gap-y-1 [@media(min-width:480px)]:gap-y-2">
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
                        placeholder="E.g. Cracked Interview"
                        className="w-full rounded-sm bg-slate-900
      border border-slate-700 outline-none
      focus:border-slate-400 transition duration-500
      px-2 [@media(min-width:480px)]:px-3 py-2 [@media(min-width:480px)]:py-2 text-xs sm:text-sm"
                      />

                      {errors.achievement && (
                        <p className="text-red-500 sm:font-semibold text-xs">
                          {errors.achievement.message}
                        </p>
                      )}
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

                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0 text-xl mt-0.5">
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
                            <StarIcon />
                          </button>
                        ))}

                        {errors.rating && (
                          <p className="text-red-500 sm:font-semibold text-xs ms-1 mt-1">
                            {errors.rating.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Photo (optional) */}
                  <div>
                    <label className="text-xs text-slate-400">
                      Upload Photo (optional)
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
                      className="block w-full text-slate-400
                               file:mr-4 file:[@media(min-width:480px)]:py-0 file:px-2 file:[@media(min-width:480px)]:px-2
                               file:rounded-sm file:border-0
                               file:bg-slate-800 file:text-white
                               hover:file:bg-slate-700 rounded-sm bg-slate-900
                 border border-slate-700 outline-none focus:border-slate-400 transition duration-500
                px-2 [@media(min-width:480px)]:px-3 py-2 text-xs sm:text-sm"
                    />
                  </div>

                  {/* Story */}
                  <div className="space-y-0">
                    <label className="text-xs text-slate-400">
                      Success Story *
                    </label>

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
                      className="
      w-full rounded-sm bg-slate-900 
      border border-slate-700
      px-3 py-2 
      text-xs sm:text-sm 
      outline-none text-white 
      h-25 [@media(min-width:480px)]:h-30
      overflow-y-auto scrollbar-slim 
      transition duration-500
      focus:border-slate-400
    "
                    />

                    {/* Bottom Row: Error + Counter */}
                    <div className="flex justify-between items-center">
                      {errors.story ? (
                        <p className="text-red-500 sm:font-semibold text-xs -mt-2">
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

                  {/* Submit Button*/}
                  <motion.button
                    type="submit"
                    disabled={submitLoading}
                    aria-disabled={submitLoading}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15, ease: "easeInOut" }}
                    className={`
    w-full py-2 text-xs [@media(min-width:480px)]:text-sm font-medium rounded-sm text-white bg-blue-600 transition-all duration-300 flex items-center justify-center
    ${
      submitLoading
        ? " cursor-not-allowed opacity-70"
        : "hover:bg-blue-500 cursor-pointer"
    }
  `}
                  >
                    {/* {submitLoading ? "Submitting..." : "Submit Story"} */}
                    {submitLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      "Submit Story"
                    )}
                  </motion.button>

                  <p className="text-center text-[10px] [@media(min-width:480px)]:text-[11px] text-slate-400">
                    Your story will be reviewed before publishing.
                  </p>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Image Crop Modal */}
      {showCrop && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <div className="bg-slate-900 p-4 rounded-md w-[90%] max-w-md">
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
                className="flex-1 text-sm sm:text-base text-white bg-slate-700 py-2 rounded hover:bg-slate-600 transition-all duration-300"
                onClick={() => setShowCrop(false)}
              >
                Cancel
              </button>

              <button
                className="flex-1 text-sm sm:text-base text-white bg-blue-600 hover:bg-blue-800 py-2 rounded transition-all duration-300"
                onClick={async () => {
                  const blob = await getCroppedImg(imageSrc, croppedPixels);
                  const file = new File([blob], "photo.jpg", {
                    type: "image/jpeg",
                  });

                  setValue("photo", [file], { shouldValidate: true });
                  setShowCrop(false);
                }}
              >
                Crop & Save
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
