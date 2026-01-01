import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

export default function VerifyOtp() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const email = state?.email;

  const [message, setMessage] = useState("");

  /* 🔥 TIMER STATE */
  const [timer, setTimer] = useState(50);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { verifyOtp, resendOtp, verifyLoading, resendLoading } = useAuth();

  /* 🔥 COUNTDOWN EFFECT */
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  /* VERIFY OTP */
  const onSubmit = async (data) => {
    if (verifyLoading) return; // 🔒 double submit guard

    console.log("Form Console ---->", data);

    const res = await verifyOtp({ email, otp: data.otp });

    if (res.success) {
      navigate("/login");
    }
  };

  /* RESEND OTP */
  const handleResend = async () => {
    if (timer > 0) return;

    const res = await resendOtp(email);
    if (res.success) {
      setTimer(40); // 🔥 RESET TIMER
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-red-500">
        Invalid access
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-md p-6 space-y-4 shadow-xl"
      >
        {/* Header */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]">
            Verify OTP
          </h2>
          <p className="text-sm text-slate-400">
            Enter the 4-digit code sent to your email
          </p>
          <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>
        </div>

        {/* OTP INPUT */}
        <div>
          <label className="text-xs text-slate-400">OTP Code *</label>
          <input
            maxLength={4}
            {...register("otp", {
              required: "OTP is required.",
              pattern: {
                value: /^[0-9]{4}$/,
                message: "Enter valid 4 digit OTP",
              },
            })}
            className="w-full mt-0.5 text-center tracking-[10px]
                       bg-slate-950 border border-slate-700
                       rounded-md py-2.5 text-xl text-white
                       outline-none focus:border-blue-500 transition"
          />
          {errors.otp && (
            <p className="text-xs text-red-500 mt-0.5">{errors.otp.message}</p>
          )}
        </div>

        {/* MESSAGE */}
        {message && (
          <p className="text-sm text-center text-blue-400">{message}</p>
        )}

        {/* VERIFY BUTTON */}
        <button
          type="submit"
          disabled={verifyLoading}
          aria-disabled={verifyLoading}
          className={`
    w-full rounded-md py-2 text-sm text-white font-medium bg-blue-600 transition
    ${
      verifyLoading
        ? "opacity-60 cursor-not-allowed"
        : "hover:bg-blue-500 cursor-pointer"
    }
  `}
        >
          {verifyLoading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* 🔥 RESEND WITH TIMER */}
        <p className="text-sm text-center text-slate-400">
          Didn’t receive OTP?{" "}
          {timer > 0 ? (
            <span className="text-slate-500 ml-1">
              Resend in <span className="text-blue-400">{timer}s</span>
            </span>
          ) : (
            // <button
            //   type="button"
            //   onClick={handleResend}
            //   disabled={resendLoading}
            //   className="text-blue-400 hover:underline ml-1 disabled:opacity-60 cursor-pointer"
            // >
            //   {resendLoading ? "Sending..." : "Resend"}
            // </button>
            <button
              type="button"
              onClick={handleResend}
              disabled={resendLoading}
              aria-disabled={resendLoading}
              className={`
    ml-1 transition
    ${
      resendLoading
        ? "text-blue-400 opacity-60 cursor-not-allowed"
        : "text-blue-400 hover:underline cursor-pointer"
    }
  `}
            >
              {resendLoading ? "Sending..." : "Resend"}
            </button>
          )}
        </p>
      </form>
    </div>
  );
}
