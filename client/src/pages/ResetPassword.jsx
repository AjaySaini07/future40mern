import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const { resetPassword, resetLoading } = useAuth();
  const navigate = useNavigate();

  const newPassword = watch("newPassword");

  useEffect(() => {
    const email = sessionStorage.getItem("resetEmail");

    if (!email) {
      // direct access block
      navigate("/forgot-password");
    } else {
      setValue("email", email);
    }
  }, [navigate, setValue]);

  const onSubmit = async (data) => {
    const res = await resetPassword(data);
    if (res?.success) {
      sessionStorage.removeItem("resetEmail");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-slate-900 border rounded-sm border-slate-800 p-6 space-y-3"
      >
        <div className="text-center space-y-1 pb-4">
          <h2 className="text-center text-2xl font-bold text-white">
            Reset Password
          </h2>

          <div className="mx-auto mt-1.5 h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>
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
            className="w-full bg-slate-950 border border-slate-700 px-4 py-2 text-sm text-white rounded-sm outline-none focus:border-blue-500 transition duration-500"
          />

          {errors.otp && (
            <p className="text-xs text-red-400 mt-0.5">{errors.otp.message}</p>
          )}
        </div>

        {/* New Password */}
        <div>
          <input
            type="password"
            placeholder="New Password"
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full bg-slate-950 border border-slate-700 px-4 py-2 text-sm text-white rounded-sm outline-none focus:border-blue-500 transition duration-500"
          />
          {errors.newPassword && (
            <p className="text-xs text-red-400 mt-0.5">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (v) => v === newPassword || "Passwords do not match",
            })}
            className="w-full bg-slate-950 border border-slate-700 px-4 py-2 text-sm text-white rounded-sm outline-none focus:border-blue-500 transition duration-500"
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-400 mt-0.5">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={resetLoading}
          aria-disabled={resetLoading}
          className={`
      w-full mt-1 py-2 text-sm font-medium rounded-sm text-white bg-blue-600 transition
      ${
        resetLoading
          ? "cursor-not-allowed opacity-70"
          : "hover:bg-blue-500 cursor-pointer"
      }
    `}
        >
          {resetLoading ? "Updating..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
