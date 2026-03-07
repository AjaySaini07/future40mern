import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthAdmin } from "../hooks/useAuthAdmin";
import { EyeIcon, EyeOffIcon } from "../../icons/Icons";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { adminLogin, loginLoading } = useAuthAdmin();

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (data) => {
    // console.log("Login form submit console ------>", data);
    await adminLogin(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-black px-4">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="
    w-full max-w-sm sm:max-w-md
    bg-slate-900/90 backdrop-blur
    border border-slate-800
    rounded-md
    shadow-[0_0_40px_rgba(0,0,0,0.6)]
    p-7 sm:p-8
  "
      >
        {/* Header */}
        <div className="text-center mb-6 space-y-1">
          <h2 className="text-xl sm:text-2xl font-semibold text-white">
            Admin Login
          </h2>

          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />

          <p className="text-[10px] text-slate-400">
            Sign in to manage Future40
          </p>
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="text-xs font-medium text-slate-400">Email</label>
          <input
            type="email"
            // placeholder="admin@future40.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Enter a valid email",
              },
            })}
            className="
      w-full bg-slate-900
      border border-slate-700
      rounded-sm px-3 py-2
      text-sm text-white
      outline-none
      focus:border-slate-400
      transition-all duration-500
    "
          />
          {errors.email && (
            <p className="text-xs font-semibold text-red-500 mt-0.5">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password with eye */}
        <div className="mb-4">
          <label className="text-xs font-medium text-slate-400">Password</label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
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
              onClick={() => setShowPassword((p) => !p)}
              className="
        absolute right-3 top-1/2 -translate-y-1/2
        text-slate-400 hover:text-white transition
      "
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>

          {errors.password && (
            <p className="text-xs font-semibold text-red-500 mt-0.5">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Button */}
        <motion.button
          type="submit"
          disabled={loginLoading}
          whileTap={!loginLoading ? { scale: 0.98 } : {}}
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
          {loginLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Logging in...
            </span>
          ) : (
            "Login"
          )}
        </motion.button>

        <div className="text-center mt-3">
          {/* Forgotten Password */}
          <Link
            to="/admin/forgot-password-admin"
            className="text-xs [@media(min-width:480px)]:text-sm text-blue-400 hover:underline"
          >
            Forgotten password?
          </Link>
        </div>
      </form>
    </div>
  );
}
