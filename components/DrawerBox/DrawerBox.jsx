import React, { useEffect } from "react";
import PortalOverlaysEnd from "../PortalOverlaysEnd";
import moduleCss from "./DrawerBox.module.css";
import { noop } from "../../src/util";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "../icons";
//
//
const DrawerBox = ({
  // open/close
  isActive = false,

  // run callback onClose
  onClose = noop,

  // drawer postition; 1@left, -1@right[default];
  placement = -1,

  // append classes to .DraweBox-content
  classes = "",

  // content
  children,
}) => {
  //
  const isWindow = "undefined" !== typeof window;
  const keyup_ = ({ keyCode }) => 27 === keyCode && onClose();
  useEffect(() => {
    if (isWindow && isActive) window.addEventListener("keyup", keyup_);
    return () => isWindow && window.removeEventListener("keyup", keyup_);
  }, [isActive]);
  //
  return (
    <PortalOverlaysEnd>
      <AnimatePresence>
        {isActive && (
          <>
            <div
              onClick={onClose}
              className={`m-0 p-0 fixed z-40 inset-0 bg-gray-500/50 backdrop-blur-sm overflow-hidden ${moduleCss.drawerBoxBackdrop}`}
            />
            <motion.div
              key="DraweBox-content"
              initial={{ opacity: 0, x: -1 === placement ? "100%" : "-100%" }}
              exit={{
                transition: { duration: 0.1 },
                opacity: 0,
                x: -1 === placement ? "100%" : "-100%",
              }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { type: "spring", duration: 0.24 },
              }}
              className={`overflow-y-auto scrollbar-thin fixed inset-y-0 z-50 w-full sm:w-10/12 md:w-2/3 lg:w-1/2 bg-white shadow-lg ${
                -1 === placement
                  ? "right-0 sm:border-l-slate-900 sm:border-l-4"
                  : "left-0 sm:border-r-slate-900 sm:border-r-4"
              } ${classes} ${moduleCss.drawerBox}`}
            >
              <MdClose
                onClick={onClose}
                className={`icon-close top-2 ${
                  -1 === placement ? "right-2" : "left-2"
                }`}
              />
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PortalOverlaysEnd>
  );
};

export default DrawerBox;
