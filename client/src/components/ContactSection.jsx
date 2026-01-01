import Reveal from "./Reveal";
import { useForm } from "react-hook-form";

export default function ContactSection() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Data:", data);

    // API call later
    await new Promise((res) => setTimeout(res, 1000));

    reset();
  };

  return (
    <section id="contact" className="bg-slate-950 py-12">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8">
        {/* Left Side Content */}
        <Reveal>
          <div>
            <h2 className="text-2xl font-bold">
              Get in <span className="text-blue-400">Touch</span>
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Have questions about batches, fees or courses? Send us a message.
            </p>

            <div className="mt-6 space-y-3 text-sm">
              <p>📩 info@future40.com</p>
              <p>📱 +91-98765-43210</p>
              <p>📱 +91-98765-43210</p>
              <p>📍 Online & Chandigarh-based training</p>
              <p>📍 Online & Chandigarh-based training</p>
            </div>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-md bg-slate-900 border border-slate-800 p-6 space-y-3"
          >
            <h2 className="text-2xl font-bold text-white">
              Send Your <span className="text-blue-400">Query</span>
            </h2>

            {/* Name */}
            <div>
              <input
                {...register("name", {
                  required: "Name is required.",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters.",
                  },
                })}
                className="w-full rounded-sm bg-slate-950
            border border-slate-700 outline-none
            focus:border-slate-400 transition duration-300
            px-4 py-2 text-sm text-white"
                placeholder="Your Name"
              />
              {errors.name && (
                <p className="text-xs text-red-400 mt-0.5">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email.",
                  },
                })}
                className="w-full rounded-sm bg-slate-950
            border border-slate-700 outline-none
            focus:border-slate-400 transition duration-300
            px-4 py-2 text-sm text-white"
                placeholder="Your Email"
              />
              {errors.email && (
                <p className="text-xs text-red-400 mt-0.5">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <textarea
                rows={3}
                {...register("message", {
                  required: "Message is required.",
                  minLength: {
                    value: 10,
                    message: "Message must be at least 10 characters.",
                  },
                })}
                className="w-full rounded-sm bg-slate-950
            border border-slate-700 outline-none
            focus:border-slate-400 transition duration-300
            px-4 py-2 text-sm text-white"
                placeholder="Your message..."
              />
              {errors.message && (
                <p className="text-xs text-red-400 -mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
          w-full rounded-md py-2 text-sm font-semibold transition duration-300
          ${
            isSubmitting
              ? "bg-blue-500 opacity-60 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500 cursor-pointer shadow-lg"
          }
        `}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
