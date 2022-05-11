import { motion, AnimatePresence } from "framer-motion";

export default function Backdrop({ isActive, children }) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
          className="z-50 fixed inset-0 bg-slate-200/20 backdrop-blur-sm"
          key=".Backdrop"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
