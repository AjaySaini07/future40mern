import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { changePassword, changePasswordLoading } = useAuth();
  const navigate = useNavigate();

  const newPassword = watch("newPassword");

  const onSubmit = async (data) => {
    if (changePasswordLoading) return;

    const res = await changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });

    if (res?.success) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-sm p-6 space-y-2 shadow-xl"
      >
        {/* Header */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]">
            Change Password
          </h2>
          <div className="mx-auto mt-1.5 h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>
        </div>

        {/* Current Password */}
        <div>
          <label className="text-xs text-slate-400">Current Password *</label>
          <input
            type="password"
            {...register("currentPassword", {
              required: "Current password is required",
            })}
            className="w-full bg-slate-950 border border-slate-700 rounded-sm px-4 py-2 text-sm text-white outline-none focus:border-blue-500 transition"
          />
          {errors.currentPassword && (
            <p className="text-xs text-red-500 mt-0.5">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label className="text-xs text-slate-400">New Password *</label>
          <input
            type="password"
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full bg-slate-950 border border-slate-700 rounded-sm px-4 py-2 text-sm text-white outline-none focus:border-blue-500 transition"
          />
          {errors.newPassword && (
            <p className="text-xs text-red-500 mt-0.5">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        {/* Confirm New Password */}
        <div>
          <label className="text-xs text-slate-400">
            Confirm New Password *
          </label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === newPassword || "Passwords do not match",
            })}
            className="w-full bg-slate-950 border border-slate-700 rounded-sm px-4 py-2 text-sm text-white outline-none focus:border-blue-500 transition"
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-500 mt-0.5">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={changePasswordLoading}
          aria-disabled={changePasswordLoading}
          className={`
            w-full mt-2 py-2 text-sm font-medium rounded-sm text-white bg-blue-600 transition
            ${
              changePasswordLoading
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-blue-500 cursor-pointer"
            }
          `}
        >
          {changePasswordLoading ? "Updating..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}
