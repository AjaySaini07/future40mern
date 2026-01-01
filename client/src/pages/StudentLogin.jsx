import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function StudentLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login, loginLoading } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("Login Data:", data);
    if (loginLoading) return; // 🔒 double submit guard

    const res = await login(data);

    if (res?.success) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-md p-6 space-y-3 shadow-xl"
      >
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-white text-center drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]">
            Student Login
          </h2>

          <div className="mx-auto mt-1.5 h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>
        </div>

        {/* Email */}
        <div>
          <label className="text-xs text-slate-400">Email *</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full bg-slate-950 border border-slate-700 rounded-sm px-4 py-2 text-sm text-white outline-none focus:border-blue-500 transition"
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-0.5">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="text-xs text-slate-400">Password *</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full bg-slate-950 border border-slate-700 rounded-sm px-4 py-2 text-sm text-white outline-none focus:border-blue-500 transition"
          />
          {errors.password && (
            <p className="text-xs text-red-500 mt-0.5">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-sm cursor-pointer mt-3 py-2 text-sm font-medium transition"
        >
          Login
        </button> */}
        <button
          type="submit"
          disabled={loginLoading}
          aria-disabled={loginLoading}
          className={`
    w-full mt-4 py-2 text-sm font-medium rounded-sm text-white bg-blue-600 transition
    ${
      loginLoading
        ? " cursor-not-allowed opacity-70"
        : "hover:bg-blue-500 cursor-pointer"
    }
  `}
        >
          {loginLoading ? "Loging..." : "Login"}
        </button>

        <p className="text-sm text-center mt-4 text-slate-400">
          New user?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Create account
          </Link>
        </p>
      </form>
    </div>
  );
}
