import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { motion } from "framer-motion";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { forgotPassword, forgotLoading } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const res = await forgotPassword(data.email);

    if (res?.success) {
      // ✅ email store for reset page
      sessionStorage.setItem("resetEmail", data.email);

      // ✅ redirect to reset password page
      navigate("/reset-password");
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
    w-full max-w-md
    bg-slate-900/90 backdrop-blur
    border border-slate-800
    rounded-md
    p-6 space-y-4
    shadow-[0_0_40px_rgba(0,0,0,0.6)]
  "
      >
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-semibold text-white">
            Forgot Password
          </h2>

          <div
            className="mx-auto h-1 w-20 rounded-full
    bg-gradient-to-r from-blue-500 to-indigo-500"
          />

          <p className="text-[10px] text-slate-400">
            We’ll send a one-time otp to your email
          </p>
        </div>

        {/* Email */}
        <div>
          <label className="text-xs font-medium text-slate-400">Email</label>

          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Enter your registered email"
            className="
      w-full bg-slate-900
      border border-slate-700
      px-3 py-2 rounded-sm
      text-sm text-white
      outline-none
      focus:border-slate-400
      transition-all duration-300
    "
          />

          {errors.email && (
            <p className="text-[11px] font-semibold text-red-400 mt-0.5">
              {errors.email.message}
            </p>
          )}
        </div>

        <motion.button
          type="submit"
          disabled={forgotLoading}
          whileTap={!forgotLoading ? { scale: 0.98 } : {}}
          className="
    w-full py-2 rounded-sm
    text-sm font-medium text-white
    flex items-center justify-center
    transition-all duration-300

    bg-gradient-to-r from-blue-600 to-indigo-600
    hover:brightness-110

    disabled:opacity-60
    disabled:cursor-not-allowed
  "
        >
          {forgotLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Sending OTP...
            </span>
          ) : (
            "Send OTP"
          )}
        </motion.button>
      </form>
    </div>
  );
}
