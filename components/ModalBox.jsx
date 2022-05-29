import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "./icons";
import PortalOverlays from "./PortalOverlays";
//
// won't work 100% if placed inside another `motion.<element>`
export default function ModalBox({ isOpen, onClose, children, ...rest }) {
  const isWindow = "undefined" !== typeof window;
  const keyup_ = ({ keyCode }) => 27 === keyCode && onClose();
  useEffect(() => {
    if (isOpen && isWindow) window.addEventListener("keyup", keyup_);

    return () => {
      if (isWindow) {
        window.removeEventListener("keyup", keyup_);
      }
    };
  }, [isOpen]);
  //
  return (
    <PortalOverlays>
      <AnimatePresence>
        {isOpen && (
          <>
            <div
              onClick={onClose}
              className="fixed inset-0 z-40 bg-slate-500/50 backdrop-blur-md"
            />

            <motion.div
              key="ModalBox-content"
              initial={{
                opacity: 0,
                scale: 1,
                y: 122,
              }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  duration: 0.24,
                },
              }}
              exit={{
                opacity: 0,
                scale: 1.24,
                transition: {
                  duration: 0.12,
                },
              }}
              className="fixed z-50 overflow-hidden bg-white shadow-md inset-6 rounded-2xl"
              {...rest}
            >
              <MdClose onClick={onClose} className="icon-close" />
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PortalOverlays>
  );
}
