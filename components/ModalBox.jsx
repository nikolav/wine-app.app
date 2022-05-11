import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "./icons";

// won't work 100% if placed inside another `motion.<element>`
export default function ModalBox({ isOpen, onClose, children, ...rest }) {
  const document_ = "undefined" !== typeof document;
  const window_ = "undefined" !== typeof window;

  useEffect(() => {
    if (window_) {
      window.addEventListener("keyup", onKey_);
    }

    return () => {
      if (window_) {
        window.removeEventListener("keyup", onKey_);
      }
    };

    function onKey_({ keyCode }) {
      if (27 === keyCode) onClose();
    }
  }, []);

  return document_
    ? createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              <div
                key="ModalBox-backdrop"
                onClick={onClose}
                className="fixed z-50 inset-0 bg-slate-500/50 backdrop-blur-md"
              />

              <motion.div
                key="ModalBox-body"
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
                className="fixed z-50 inset-6 bg-white rounded-2xl shadow-md overflow-hidden"
                {...rest}
              >
                <MdClose
                  key="ModalBox-close"
                  onClick={onClose}
                  className="icon-close"
                />
                {children}
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.getElementById("overlays-end")
      )
    : null;
}
