import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

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
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-sm p-6 space-y-4 shadow-xl"
      >
        <div className="text-center space-y-1">
          <h2 className="text-center text-2xl font-bold text-white">
            Forgot Password
          </h2>

          <div className="mx-auto mt-1.5 h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>
        </div>

        <div>
          <label className="text-xs text-slate-400">Email *</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full bg-slate-950 border border-slate-700 px-4 py-2 text-sm rounded-sm text-white outline-none focus:border-blue-500 transition duration-500"
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={forgotLoading}
          aria-disabled={forgotLoading}
          className={`
    w-full py-2 text-sm font-medium rounded-sm text-white bg-blue-600 transition
    ${
      forgotLoading
        ? " cursor-not-allowed opacity-70"
        : "hover:bg-blue-500 cursor-pointer"
    }
  `}
        >
          {forgotLoading ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
}
