import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
// import useContactInfo from "../hooks/useAdminContactInfo";
import ConfirmModal from "../components/ConfirmModal";
import {
  DeleteIcon,
  LocationIcon,
  MailIcon,
  PhoneIcon,
  PlusIcon,
} from "../../icons/Icons";
import useAdminContactInfo from "../hooks/useAdminContactInfo";
import Loader from "../components/loader/Loader";

export default function ContactInfoAdmin() {
  const {
    contactInfo,
    fetchContactInfo,
    addEmail,
    deleteEmail,
    addPhone,
    deletePhone,
    setAddress,
    fetchLoading,
    emailLoading,
    phoneLoading,
    addressLoading,
  } = useAdminContactInfo();

  // 🔹 Separate forms (IMPORTANT FIX)
  const emailForm = useForm();
  const phoneForm = useForm();
  const addressForm = useForm();

  const emailLimitReached = contactInfo?.emails?.length >= 2;
  const phoneLimitReached = contactInfo?.phones?.length >= 2;

  // 🔹 Delete confirmation
  const [confirm, setConfirm] = useState({
    open: false,
    type: null,
    value: null,
  });

  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchContactInfo();
  }, []);

  // 🔹 Address prefill
  useEffect(() => {
    if (contactInfo?.address) {
      addressForm.reset({ address: contactInfo.address });
    }
  }, [contactInfo]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-slate-900 border border-slate-700
        rounded-md p-6 text-slate-200"
      >
        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>

        {/* Loading State */}
        {fetchLoading && (
          <div className="w-full flex justify-center">
            <Loader />
          </div>
        )}

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-6">
          {/* ================= EMAILS ================= */}
          <Card title="Emails" icon={<MailIcon />}>
            {contactInfo?.emails?.map((email) => (
              <Item
                key={email}
                text={email}
                onDelete={() =>
                  setConfirm({ open: true, type: "email", value: email })
                }
              />
            ))}

            <form
              onSubmit={emailForm.handleSubmit(async (data) => {
                const res = await addEmail(data.email);
                if (res?.success) emailForm.reset();
              })}
              className="flex gap-2 mt-2"
            >
              <Input
                placeholder="info@future40.com"
                register={emailForm.register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email",
                  },
                })}
                error={emailForm.formState.errors.email}
              />

              <div title={emailLimitReached ? "Maximum limit reached" : ""}>
                <AddButton
                  loading={emailLoading}
                  disabled={emailLimitReached}
                />
              </div>
            </form>

            {emailLimitReached && (
              <p className="text-yellow-400 text-xs mt-1">
                🔐Maximum 2 email addresses allowed
              </p>
            )}
          </Card>

          {/* ================= PHONES ================= */}
          <Card title="Phone Numbers" icon={<PhoneIcon />}>
            {contactInfo?.phones?.map((phone) => (
              <Item
                key={phone}
                text={phone}
                onDelete={() =>
                  setConfirm({ open: true, type: "phone", value: phone })
                }
              />
            ))}

            <form
              onSubmit={phoneForm.handleSubmit(async (data) => {
                const res = await addPhone(data.phone);
                if (res?.success) phoneForm.reset();
              })}
              className="flex gap-2 mt-2"
            >
              <Input
                placeholder="+91-9876543210"
                register={phoneForm.register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^(?:\+91[-\s]?|91[-\s]?|0)?[6-9]\d{9}$/,
                    message: "Enter a valid Indian mobile number",
                  },
                })}
                error={phoneForm.formState.errors.phone}
              />

              <div title={phoneLimitReached ? "Maximum limit reached" : ""}>
                <AddButton
                  loading={phoneLoading}
                  disabled={phoneLimitReached}
                />
              </div>
            </form>

            {phoneLimitReached && (
              <p className="text-yellow-400 text-xs mt-1">
                🔐Maximum 2 phone numbers allowed
              </p>
            )}
          </Card>
        </div>

        {/* ================= ADDRESS ================= */}
        <Card title="Address" icon={<LocationIcon />}>
          <form
            onSubmit={addressForm.handleSubmit((data) =>
              setAddress(data.address)
            )}
          >
            <textarea
              {...addressForm.register("address", {
                required: "Address is required",
              })}
              rows={3}
              className="w-full bg-slate-950 border border-slate-700
              rounded-md px-3 py-2 text-sm outline-none"
            />

            {addressForm.formState.errors.address && (
              <p className="text-red-400 text-xs mt-1">
                {addressForm.formState.errors.address.message}
              </p>
            )}

            <div className="flex justify-end mt-1">
              <button
                disabled={addressLoading}
                className={`px-5 py-2 rounded-md text-sm transition
        ${
          addressLoading
            ? "bg-blue-600 opacity-60 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-500 cursor-pointer"
        }
      `}
              >
                {addressLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </Card>
      </motion.div>

      {/* ================= CONFIRM MODAL ================= */}
      <ConfirmModal
        open={confirm.open}
        title="Confirm Delete..!"
        message={`Are you sure you want to delete this ${confirm.type}?`}
        loading={deleteLoading}
        onCancel={() => {
          if (deleteLoading) return; // ❌ delete ke time close mat hone do
          setConfirm({ open: false, type: null, value: null });
        }}
        onConfirm={async () => {
          try {
            setDeleteLoading(true);

            if (confirm.type === "email") {
              await deleteEmail(confirm.value);
            }

            if (confirm.type === "phone") {
              await deletePhone(confirm.value);
            }

            setConfirm({ open: false, type: null, value: null });
          } finally {
            setDeleteLoading(false);
          }
        }}
      />
    </>
  );
}

/* ================= UI COMPONENTS ================= */

const Card = ({ title, icon, children }) => (
  <div className="mb-6 bg-slate-950 border border-slate-700 rounded-md p-4">
    <h3 className="flex items-center gap-2 text-slate-300 text-sm mb-3">
      {icon} {title}
    </h3>
    {children}
  </div>
);

const Item = ({ text, onDelete }) => (
  <div
    className="flex justify-between items-center
    bg-slate-900 border border-slate-700 rounded-md
    px-3 py-2 mb-2"
  >
    <span className="text-sm">{text}</span>
    <button
      onClick={onDelete}
      className="text-red-500 hover:text-red-400 text-xl"
    >
      <DeleteIcon />
    </button>
  </div>
);

const Input = ({ placeholder, register, error }) => (
  <div className="flex-1">
    <input
      {...register}
      placeholder={placeholder}
      className="w-full bg-slate-900 border border-slate-700
      rounded-md px-3 py-2 text-sm outline-none"
    />
    {error && <p className="text-red-400 text-xs mt-1">{error.message}</p>}
  </div>
);

const AddButton = ({ loading, disabled }) => (
  <button
    type="submit"
    disabled={loading || disabled}
    className={`px-3 rounded-md text-xl py-2 flex items-center justify-center
      ${
        disabled
          ? "bg-slate-700 cursor-not-allowed"
          : "bg-green-600 hover:bg-green-500"
      }
    `}
  >
    {loading ? <PlusIcon /> : <PlusIcon />}
  </button>
);
