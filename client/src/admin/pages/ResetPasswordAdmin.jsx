import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthAdmin } from "../hooks/useAuthAdmin";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EyeIcon, EyeOffIcon } from "../../icons/Icons";

export default function ResetPasswordAdmin() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const { resetPassword, resetLoading } = useAuthAdmin();
  const navigate = useNavigate();

  const newPassword = watch("newPassword");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const email = sessionStorage.getItem("resetEmail");

    if (!email) {
      navigate("/admin/forgot-password-admin");
    } else {
      setValue("email", email);
    }
  }, [navigate, setValue]);

  const onSubmit = async (data) => {
    const res = await resetPassword(data);

    if (res?.success) {
      sessionStorage.removeItem("resetEmail");
      navigate("/admin/login");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center
  bg-gradient-to-br from-slate-900 via-slate-950 to-black px-4"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
    w-full max-w-sm [@media(min-width:480px)]:max-w-md
    bg-slate-900/90 backdrop-blur
    border border-slate-800
    rounded-md
    p-6 space-y-4
    shadow-[0_0_40px_rgba(0,0,0,0.6)]
  "
      >
        <div className="text-center space-y-1 pb-3">
          <h2 className="text-2xl font-semibold text-white">Reset Password</h2>

          <div
            className="mx-auto h-1 w-20 rounded-full
    bg-gradient-to-r from-blue-500 to-indigo-500"
          />

          <p className="text-[11px] text-slate-400">
            Enter OTP and set a new password
          </p>
        </div>

        {/* Hidden email */}
        <input type="hidden" {...register("email")} />

        {/* OTP */}
        <div>
          <input
            type="text"
            inputMode="numeric"
            placeholder="OTP"
            maxLength={4}
            {...register("otp", {
              required: "OTP is required",
              pattern: {
                value: /^[0-9]{4}$/,
                message: "OTP must be 4 digits",
              },
            })}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4);
            }}
            className="
      w-full bg-slate-900
      border border-slate-700
      px-3 py-2 rounded-sm tracking-[8px]
      text-sm text-center text-white
      outline-none
      focus:border-slate-400
      transition-all duration-300
    "
          />

          {errors.otp && (
            <p className="text-[11px] font-semibold text-red-400 mt-0.5">
              {errors.otp.message}
            </p>
          )}
        </div>

        {/* New Password */}
        <div>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="
        w-full bg-slate-900
        border border-slate-700
        px-3 py-2 pr-10 rounded-sm
        text-sm text-white
        outline-none
        focus:border-slate-400
        transition-all duration-300
      "
            />

            <button
              type="button"
              onClick={() => setShowNewPassword((p) => !p)}
              className="
        absolute right-3 top-1/2 -translate-y-1/2
        text-slate-400 hover:text-white transition
      "
            >
              {showNewPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>

          {errors.newPassword && (
            <p className="text-[11px] font-semibold text-red-400 mt-0.5">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (v) => v === newPassword || "Passwords do not match",
              })}
              className="
        w-full bg-slate-900
        border border-slate-700
        px-3 py-2 pr-10 rounded-sm
        text-sm text-white
        outline-none
        focus:border-slate-400
        transition-all duration-300
      "
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword((p) => !p)}
              className="
        absolute right-3 top-1/2 -translate-y-1/2
        text-slate-400 hover:text-white transition
      "
            >
              {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className="text-[11px] font-semibold text-red-400 mt-0.5">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={resetLoading}
          whileTap={!resetLoading ? { scale: 0.98 } : {}}
          className="
    w-full mt-2 py-2 rounded-sm
    text-sm font-medium text-white
    flex items-center justify-center
    transition-all duration-300

    bg-gradient-to-r from-blue-600 to-indigo-600
    hover:brightness-110

    disabled:opacity-60
    disabled:cursor-not-allowed
  "
        >
          {resetLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Updating...
            </span>
          ) : (
            "Reset Password"
          )}
        </motion.button>
      </form>
    </div>
  );
}
