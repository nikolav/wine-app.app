import { useEffect } from "react";
import PortalOverlays from "./PortalOverlays";
import Backdrop from "./Backdrop";
import { motion, AnimatePresence } from "framer-motion";

const variants = {
  closed : { y: -12, opacity: 0, scale: 1.04 },
  open   : { y: 0,   opacity: 1, scale: 1   },
  exit   : { y: -12, opacity: 0, scale: 1.04 },
};
const noop = () => null;
export default function Modal({ onEscape = noop, isActive, children, ...rest }) {
  const escape_ = evt => {
    if (evt.keyCode === 27) onEscape();
  };
  useEffect(() => {
    window.addEventListener("keyup", escape_);
    return () => window.removeEventListener("keyup", escape_);
  }, []);
  return (
    <PortalOverlays>
      <Backdrop isActive={isActive}>
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial="closed"
              exit="exit"
              animate={isActive ? "open" : "closed"}
              variants={variants}
              transition={{ duration: 0.24 }}
              key=".Modal"
            >
              <div
                className="w-full sm:max-w-md  min-h-[256px] top-28 shadow-lg rounded-lg p-4 left-1/2 -translate-x-[50%] bg-white absolute"
                {...rest}
              >
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Backdrop>
    </PortalOverlays>
  );
}
