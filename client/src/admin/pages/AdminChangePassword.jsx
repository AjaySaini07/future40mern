import { useForm } from "react-hook-form";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuthAdmin } from "../hooks/useAuthAdmin";
import { EyeIcon, EyeOffIcon } from "../../icons/Icons";

export default function AdminChangePassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { changePassword, changePasswordLoading } = useAuthAdmin();
  const navigate = useNavigate();

  const newPassword = watch("newPassword");

  // 👁️ visibility states
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onSubmit = async (data) => {
    if (changePasswordLoading) return;

    const res = await changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });

    if (res?.success) {
      localStorage.removeItem("token");
      navigate("/admin/login");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-slate-900 to-slate-950 rounded-sm"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm sm:max-w-md
        bg-slate-900 border border-slate-800
        rounded-md p-6 space-y-3 shadow-2xl"
      >
        {/* Header */}
        <div className="text-center">
          <h2 className="text-lg sm:text-2xl font-semibold text-white">
            Change Password
          </h2>
          <div
            className="mx-auto mt-2 h-1 w-20 rounded-full
            bg-gradient-to-r from-blue-500 to-indigo-500"
          />
          <p className="text-[10px] sm:text-xs text-slate-400 mt-1">
            Change your admin account password
          </p>
        </div>

        {/* Current Password */}
        <Field
          label="Current Password"
          error={errors.currentPassword?.message}
          type={showCurrent ? "text" : "password"}
          toggle={() => setShowCurrent((p) => !p)}
          show={showCurrent}
          register={register("currentPassword", {
            required: "Current password is required",
          })}
        />

        {/* New Password */}
        <Field
          label="New Password"
          error={errors.newPassword?.message}
          type={showNew ? "text" : "password"}
          toggle={() => setShowNew((p) => !p)}
          show={showNew}
          register={register("newPassword", {
            required: "New password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />

        {/* Confirm Password */}
        <Field
          label="Confirm New Password"
          error={errors.confirmPassword?.message}
          type={showConfirm ? "text" : "password"}
          toggle={() => setShowConfirm((p) => !p)}
          show={showConfirm}
          register={register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === newPassword || "Passwords do not match",
          })}
        />

        {/* Button */}
        <motion.button
          type="submit"
          disabled={changePasswordLoading}
          whileTap={!changePasswordLoading ? { scale: 0.98 } : {}}
          className="
    w-full mt-4 py-2 rounded-sm
    text-sm font-semibold text-white
    flex items-center justify-center
    transition-all duration-300
    bg-gradient-to-r from-blue-600 to-indigo-600
    hover:brightness-110
    disabled:opacity-60 disabled:cursor-not-allowed
  "
        >
          {changePasswordLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Changing...
            </span>
          ) : (
            "Change Password"
          )}
        </motion.button>
      </form>
    </div>
  );
}

function Field({ label, error, type, toggle, show, register }) {
  return (
    <div>
      <label className="text-xs text-slate-400">{label} *</label>

      <div className="relative">
        <input
          type={type}
          {...register}
          className="
            w-full bg-slate-900 border border-slate-700
            rounded-sm px-3 py-2 pr-10
            text-sm text-white
            outline-none
            focus:border-slate-400
            transition-all duration-500
          "
        />

        <button
          type="button"
          onClick={toggle}
          className="absolute right-3 top-1/2 -translate-y-1/2
            text-slate-400 hover:text-white transition"
        >
          {show ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
