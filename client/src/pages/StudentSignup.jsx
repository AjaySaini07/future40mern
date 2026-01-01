import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import useAuth from "../hooks/useAuth";

export default function StudentSignup() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { signup, signupLoading } = useAuth();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (signupLoading) return; // 🔒 double submit guard

    console.log("Signup Data:", data);

    const res = await signup(data);

    if (res?.success) {
      navigate("/verify-otp", { state: { email: data.email } });
    }
  };

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-md p-6 space-y-4 shadow-xl"
      >
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-white text-center drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]">
            Student Signup
          </h2>

          <p className="text-sm text-slate-400">
            Create your account to start learning
          </p>

          <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>
        </div>

        {/* Full Name & Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="text-xs text-slate-400">Full Name *</label>
            <input
              {...register("fullname", { required: "Full name is required" })}
              className="w-full bg-slate-950 border border-slate-700 rounded-sm px-4 py-2 text-sm text-white outline-none focus:border-blue-500 transition"
            />
            {errors.fullname && (
              <p className="text-xs text-red-500 mt-0.5">
                {errors.fullname.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-xs text-slate-400">Mobile Number *</label>
            <input
              type="tel"
              {...register("mobile", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter valid 10 digit number",
                },
              })}
              className="w-full bg-slate-950 border border-slate-700 rounded-sm px-4 py-2 text-sm text-white outline-none focus:border-blue-500 transition"
            />
            {errors.mobile && (
              <p className="text-xs text-red-500 mt-0.5">
                {errors.mobile.message}
              </p>
            )}
          </div>
        </div>

        {/* Gender & DOB */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-slate-400">Gender *</label>

            <Controller
              name="gender"
              control={control}
              rules={{ required: "Gender is required" }}
              render={({ field }) => (
                <Select
                  options={genderOptions}
                  placeholder="Select Gender"
                  isSearchable={false}
                  classNamePrefix="react-select"
                  /* 🔥 IMPORTANT FIX */
                  onChange={(option) => field.onChange(option.value)}
                  value={
                    field.value
                      ? genderOptions.find((opt) => opt.value === field.value)
                      : null
                  }
                  styles={{
                    control: (base) => ({
                      ...base,
                      backgroundColor: "#020617",
                      borderColor: "#334155",
                      minHeight: "40px",
                      boxShadow: "none",
                      ":hover": { borderColor: "#3b82f6" },
                    }),
                    menu: (base) => ({
                      ...base,
                      backgroundColor: "#020617",
                      border: "1px solid #334155",
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isFocused ? "#1e293b" : "#020617",
                      color: "#fff",
                    }),
                    singleValue: (base) => ({
                      ...base,
                      color: "#fff",
                    }),
                  }}
                />
              )}
            />

            {errors.gender && (
              <p className="text-xs text-red-500 mt-0.5">
                {errors.gender.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-xs text-slate-400">Date of Birth *</label>
            <input
              type="date"
              {...register("dob", { required: "DOB is required" })}
              className="
        w-full bg-slate-950 border border-slate-700 rounded-sm
        px-4 py-2 text-sm text-white outline-none
        focus:border-blue-500 transition
        [&::-webkit-calendar-picker-indicator]:invert
      "
            />
            {errors.dob && (
              <p className="text-xs text-red-500 mt-0.5">
                {errors.dob.message}
              </p>
            )}
          </div>
        </div>

        {/* Email & Password */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email Field */}
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

          {/* Password Field */}
          <div>
            <label className="text-xs text-slate-400">Password *</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
              className="w-full bg-slate-950 border border-slate-700 rounded-sm px-4 py-2 text-sm text-white outline-none focus:border-blue-500 transition"
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-0.5">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        {/* Create Account Button */}
        <button
          type="submit"
          disabled={signupLoading}
          aria-disabled={signupLoading}
          className={`
    w-full mt-4 py-2 text-sm font-medium rounded-sm text-white bg-blue-600 transition
    ${
      signupLoading
        ? " cursor-not-allowed opacity-70"
        : "hover:bg-blue-500 cursor-pointer"
    }
  `}
        >
          {signupLoading ? "Creating..." : "Create Account"}
        </button>

        <p className="text-sm text-center text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
