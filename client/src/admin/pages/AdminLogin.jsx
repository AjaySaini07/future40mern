import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthAdmin } from "../hooks/useAuthAdmin";

export default function AdminLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { adminLogin, loginLoading } = useAuthAdmin();

  const navigate = useNavigate();

  const handleLogin = async (data) => {
    console.log("Login form console ------>", data);
    await adminLogin(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="
      w-full max-w-sm
      bg-slate-900
      border border-slate-700
      rounded-md
      shadow-2xl
      p-8
    "
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white">Admin Login</h2>
          <p className="text-sm text-slate-400 mt-1">
            Access Future40 Admin Panel
          </p>
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="text-xs text-slate-400">Email</label>
          <input
            type="email"
            placeholder="admin@future40.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Enter a valid email",
              },
            })}
            className="
      w-full rounded-md bg-slate-950
      border border-slate-700
      px-4 py-2 text-sm text-white
      outline-none focus:border-slate-400
    "
          />

          {errors.email && (
            <p className="text-xs text-red-500 mt-0.5">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mb-5">
          <label className="text-xs text-slate-400">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="
      w-full rounded-md bg-slate-950
      border border-slate-700
      px-4 py-2 text-sm text-white
      outline-none focus:border-slate-400
    "
          />

          {errors.password && (
            <p className="text-xs text-red-500 mt-0.5">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loginLoading}
          className="
    w-full
    bg-blue-600
    hover:bg-blue-500
    text-white
    py-2
    rounded-md
    font-semibold
    transition
    active:scale-95
    disabled:opacity-60
    disabled:cursor-not-allowed
  "
        >
          {loginLoading ? "Loging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
