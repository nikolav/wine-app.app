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
  const isWindow = "undefined" !== typeof window;
  useEffect(() => {
    if (isWindow && isActive) window.addEventListener("keyup", keyup_);
    return () => isWindow && window.removeEventListener("keyup", keyup_);
    //
    function keyup_({ keyCode }) {
      if (27 === keyCode) onClose();
    }
  }, [isActive]);
  //
  return (
    <PortalOverlaysEnd>
      <AnimatePresence>
        {isActive && (
          <>
            <div
              onClick={onClose}
              className={`m-0 p-0 fixed z-10 inset-0 bg-gray-500/50 backdrop-blur-sm overflow-hidden ${moduleCss.drawerBoxBackdrop}`}
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
              className={`fixed inset-y-0 z-20 w-full md:w-1/2 bg-white shadow-lg ${
                -1 === placement
                  ? "right-0 border-l-slate-900 border-l-4"
                  : "left-0 border-r-slate-900 border-r-4"
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