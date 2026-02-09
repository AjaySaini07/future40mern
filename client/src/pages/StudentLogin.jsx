import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { EyeIcon, EyeOffIcon } from "../icons/Icons";
import { motion } from "framer-motion";

export default function StudentLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login, loginLoading } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    console.log("Login Data:", data);
    if (loginLoading) return; // 🔒 double submit guard

    const res = await login(data);

    if (res?.success) {
      navigate("/");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center
  bg-gradient-to-br from-slate-900 via-slate-950 to-black px-4"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm [@media(min-width:480px)]:max-w-md
          bg-slate-900/90 backdrop-blur border border-slate-800 shadow-[0_0_40px_rgba(0,0,0,0.6)]
      rounded-md p-6 space-y-2 [@media(min-width:480px)]:space-y-3"
      >
        {/* Header */}
        <div className="text-center space-y-1">
          <h2 className="text-xl [@media(min-width:480px)]:text-2xl font-bold text-white drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]">
            Student Login
          </h2>
          <div
            className="mx-auto mt-1.5 h-1 w-16 rounded-full
          bg-gradient-to-r from-blue-500 to-indigo-500"
          ></div>
        </div>

        {/* Email */}
        <div>
          <label className="text-xs text-slate-400">Email *</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="
            w-full bg-slate-900 border border-slate-700
            rounded-sm px-3 py-2 text-xs [@media(min-width:480px)]:text-sm text-white
            outline-none
            focus:border-slate-400
            transition-all duration-500
          "
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-0.5">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password with eye */}
        <div>
          <label className="text-xs text-slate-400">Password *</label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
              className="
              w-full bg-slate-900 border border-slate-700
              rounded-sm px-3 py-2 pr-10 text-xs [@media(min-width:480px)]:text-sm text-white
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
            <p className="text-xs text-red-500 mt-0.5">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Login Button */}
        <motion.button
          type="submit"
          disabled={loginLoading}
          whileTap={!loginLoading ? { scale: 0.98 } : {}}
          className={`
          w-full mt-5 py-2 rounded-sm flex items-center justify-center
          text-sm [@media(min-width:480px)]:text-sm font-semibold text-white
    transition-all duration-300
    bg-gradient-to-r from-blue-600 to-indigo-600
    hover:brightness-110
    disabled:opacity-60 disabled:cursor-not-allowed
          ${
            loginLoading
              ? "bg-blue-600/60 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500"
          }
        `}
        >
          {/* {loginLoading ? "Logging in..." : "Login"} */}
          {loginLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Logging in...
            </span>
          ) : (
            "Login"
          )}
        </motion.button>

        <div className="text-center">
          {/* Forgotten Password */}
          <Link
            to="/forgot-password"
            className="text-xs [@media(min-width:480px)]:text-sm text-blue-400 hover:underline"
          >
            Forgotten password?
          </Link>

          {/* Signup */}
          <p className="text-xs mt-2 [@media(min-width:480px)]:text-sm text-center text-slate-400">
            New user?{" "}
            <Link to="/signup" className="text-blue-400 hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
