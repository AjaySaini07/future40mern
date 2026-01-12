import Reveal from "./Reveal";
import { useForm } from "react-hook-form";
import useQuery from "../hooks/useQuery";
import useContactInfo from "../hooks/useContactInfo";
import { useEffect } from "react";
import { LocationIcon, MailIcon, PhoneIcon } from "../icons/Icons";

export default function ContactSection() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const { contactInfo, fetchContactInfo, fetchLoading } = useContactInfo();

  const { submitQuery, submitLoading } = useQuery();

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const onSubmit = async (data) => {
    const res = await submitQuery(data);

    if (res?.success) {
      reset();
    }
  };

  return (
    <section id="contact" className="bg-slate-950 py-12">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8">
        {/* Left Side Content */}
        <Reveal>
          <div>
            {/* 🔹 Main Heading */}
            <div>
              <h2 className="text-2xl font-bold">
                Get in <span className="text-blue-400">Touch</span>
              </h2>
              <p className="text-sm text-slate-400 mt-0.5">
                We’d love to hear from you. Reach out for any queries or
                support.
              </p>
            </div>

            {/* 🔹 Contact Info Heading */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold">
                Contact <span className="text-blue-400">Information</span>
              </h3>
              <p className="text-xs text-slate-400">
                Use the details below to connect with the Future40 team.
              </p>
            </div>

            {/* 🔹 Contact Details */}
            <div className="mt-3 space-y-3 text-sm text-slate-200">
              {/* Emails */}
              {contactInfo?.emails?.map((email, index) => (
                <p className="flex gap-2 items-center" key={`email-${index}`}>
                  <MailIcon /> <span className="text-slate-300">{email}</span>
                </p>
              ))}

              {/* Phones */}
              {contactInfo?.phones?.map((phone, index) => (
                <p className="flex items-center gap-2" key={`phone-${index}`}>
                  <PhoneIcon /> <span className="text-slate-300">{phone}</span>
                </p>
              ))}

              {/* Address */}
              {contactInfo?.address && (
                <p className="flex gap-2">
                  <LocationIcon className="text-xl" />{" "}
                  <span className="text-slate-300">{contactInfo.address}</span>
                </p>
              )}
            </div>
          </div>
        </Reveal>

        {/* Query Form */}
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

            {/* Phone Number */}
            <div>
              <input
                type="phone"
                {...register("phone", {
                  required: "Phone number is required.",
                  pattern: {
                    value: /^(?:\+91[-\s]?|91[-\s]?|0)?[6-9]\d{9}$/,
                    message: "Enter a valid Indian mobile number.",
                  },
                })}
                className="w-full rounded-sm bg-slate-950
    border border-slate-700 outline-none
    focus:border-slate-400 transition duration-300
    px-4 py-2 text-sm text-white"
                placeholder="+91-9876543210"
              />

              {errors.phone && (
                <p className="text-xs text-red-400 mt-0.5">
                  {errors.phone.message}
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
              disabled={submitLoading}
              className={`
          w-full rounded-md py-2 text-sm font-semibold transition duration-300
          ${
            submitLoading
              ? "bg-blue-500 opacity-60 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500 cursor-pointer shadow-lg"
          }
        `}
            >
              {submitLoading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
