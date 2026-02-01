import { useEffect } from "react";
import { motion } from "framer-motion";
import useStudentProfile from "../hooks/useStudentProfile";
import { StarIcon } from "../icons/Icons";
import Loader from "../admin/components/loader/Loader";

export default function Profile() {
  const { profile, fetchProfile, loading } = useStudentProfile();

  useEffect(() => {
    fetchProfile();
  }, []);

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-400 text-sm">
          <Loader />
        </p>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8">
      <motion.div
        key={profile._id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-5xl mx-auto space-y-3"
      >
        {/* ================= HERO CARD ================= */}
        <div
          className="bg-gradient-to-br from-slate-900 to-slate-950
border border-slate-700 rounded-md p-5
flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div
              className="w-12 h-12 rounded-full
    bg-gradient-to-br from-blue-500 to-purple-500
    flex items-center justify-center text-white font-bold text-lg"
            >
              {profile.fullName.charAt(0)}
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                {profile.fullName}
              </h2>
              <p className="text-sm text-slate-400">{profile.email}</p>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Status label="Verified " active={profile.isVerified} />
            <Status label="Story " active={profile.hasSubmittedStory} />
          </div>
        </div>

        {/* ================= MAIN GRID ================= */}
        <div className="grid lg:grid-cols-3 gap-3">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-1 space-y-4">
            <CompactCard title="Personal Info">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <Info label="Mobile" value={profile.mobile} />
                <Info label="Gender" value={profile.gender} />
                <Info
                  label="DOB"
                  value={new Date(profile.dob).toLocaleDateString()}
                />
              </div>
            </CompactCard>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-2 space-y-4">
            {/* SUCCESS STORY */}
            {profile.story ? (
              <CompactCard title="My Success Story">
                <div className="grid sm:grid-cols-3 gap-4 items-start">
                  <Info label="Achievement" value={profile.story.achievement} />

                  {/* ⭐ Rating */}
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Rating</p>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <StarIcon
                          key={index}
                          className={`transition-all duration-200 text-lg ${
                            index < profile.story.rating
                              ? "text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.7)]"
                              : "text-slate-600"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <Status label="Approved " active={profile.story.approved} />
                </div>

                {/* Story Text */}
                <div
                  className="mt-4 bg-slate-800/40 border border-slate-700
      rounded-md p-3 max-h-40 overflow-y-auto scrollbar-slim"
                >
                  <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                    {profile.story.story}
                  </p>
                </div>

                <p className="text-xs text-slate-400 mt-2">
                  Submitted on{" "}
                  {new Date(profile.story.createdAt).toLocaleDateString()}
                </p>

                {!profile.story.approved && (
                  <p className="text-xs text-yellow-400 mt-1">
                    ⏳ Under review
                  </p>
                )}
              </CompactCard>
            ) : (
              <CompactCard title="My Success Story">
                <p className="text-sm text-slate-400">
                  You haven’t submitted a success story yet.
                </p>
              </CompactCard>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */
function CompactCard({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-900 border border-slate-700
      rounded-md px-5 py-4"
    >
      <h3 className="text-sm font-semibold text-slate-200 mb-3">{title}</h3>
      <div className="space-y-3">{children}</div>
    </motion.div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-slate-200 font-medium break-all">{value || "-"}</p>
    </div>
  );
}

function Status({ label, active }) {
  return (
    <span
      className={`inline-flex items-center gap-1
      px-3 py-1 rounded-full text-xs font-medium
      ${
        active
          ? "bg-emerald-500/15 text-emerald-400"
          : "bg-rose-500/15 text-rose-400"
      }`}
    >
      {label}: {active ? "Yes" : "No"}
    </span>
  );
}
