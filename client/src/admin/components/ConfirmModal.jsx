// import { motion, AnimatePresence } from "framer-motion";
// import { RiDeleteBin6Line } from "react-icons/ri";

// export default function ConfirmModal({
//   open,
//   title = "Confirm Delete",
//   message,
//   onConfirm,
//   onCancel,
// }) {
//   if (!open) return null;

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 z-50 bg-black/70
//         flex items-center justify-center px-4"
//         onClick={onCancel}
//       >
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0, y: 30 }}
//           animate={{ scale: 1, opacity: 1, y: 0 }}
//           exit={{ scale: 0.9, opacity: 0, y: 30 }}
//           transition={{ duration: 0.25, ease: "easeOut" }}
//           onClick={(e) => e.stopPropagation()}
//           className="bg-slate-900/90 backdrop-blur
//           border border-slate-800
//           rounded-md w-full max-w-md p-6
//           shadow-lg shadow-slate-900/50"
//         >
//           {/* Header */}
//           <div className="flex items-center gap-3 mb-3">
//             <div className="py-2 px-3 rounded bg-red-900/30 text-red-500">
//               <RiDeleteBin6Line />
//             </div>
//             <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
//           </div>

//           {/* Message */}
//           <p className="text-sm text-slate-400 mb-5">{message}</p>

//           {/* Actions */}
//           <div className="flex justify-end gap-3">
//             <motion.button
//               whileTap={{ scale: 0.95 }}
//               onClick={onCancel}
//               className="px-4 py-1.5 rounded-sm
//               bg-slate-800 text-slate-300
//               hover:bg-slate-700 text-sm"
//             >
//               Cancel
//             </motion.button>

//             <motion.button
//               whileTap={{ scale: 0.95 }}
//               onClick={onConfirm}
//               className="flex items-center gap-2
//               px-4 py-1.5 rounded-sm
//               bg-red-600 hover:bg-red-500
//               text-white text-sm"
//             >
//               Delete
//             </motion.button>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// }

import { motion, AnimatePresence } from "framer-motion";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function ConfirmModal({
  open,
  title = "Confirm Delete",
  message,
  onConfirm,
  onCancel,
  loading = false, // ✅ add this
}) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/70
        flex items-center justify-center px-4"
        onClick={onCancel}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="bg-slate-900/90 backdrop-blur
          border border-slate-800
          rounded-md w-full max-w-md p-6
          shadow-lg shadow-slate-900/50"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-3">
            <div className="py-2 px-3 rounded bg-red-900/30 text-red-500">
              <RiDeleteBin6Line />
            </div>
            <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
          </div>

          {/* Message */}
          <p className="text-sm text-slate-400 mb-5">{message}</p>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onCancel}
              className="px-4 py-1.5 rounded-sm
              bg-slate-800 text-slate-300
              hover:bg-slate-700 text-sm"
            >
              Cancel
            </motion.button>

            <motion.button
              disabled={loading}
              aria-disabled={loading}
              whileTap={!loading ? { scale: 0.95 } : {}}
              onClick={onConfirm}
              className={`flex items-center gap-2
              px-4 py-1.5 rounded-sm text-sm text-white transition
              ${
                loading
                  ? "bg-red-600 opacity-70 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-500 cursor-pointer"
              }`}
            >
              Delete
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
