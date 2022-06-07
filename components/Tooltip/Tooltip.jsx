import React, { useState } from "react";
import PortalOverlays from "../PortalOverlays";
import { motion, AnimatePresence } from "framer-motion";
import cssmod from "./Tooltip.module.css";
// https://popper.js.org/react-popper/
import { usePopper } from "react-popper";
//
const arrowClasses = {
  left: cssmod.arrowLeft,
  right: cssmod.arrowRight,
  top: cssmod.arrowTop,
  bottom: cssmod.arrowBottom,
  _default: cssmod.arrow,
};
////
////
export default function Tooltip({
  refElement,
  isActive,
  placement = "left",
  offset = [0, 8],
  classes = "",
  children,
}) {
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(refElement, popperElement, {
    placement,
    modifiers: [
      {
        name: "offset",
        options: {
          offset,
        },
      },
      { name: "arrow", options: { element: arrowElement } },
    ],
  });
  //
  return (
    <AnimatePresence>
      {isActive && (
        <PortalOverlays end={true}>
          {/*  */}
          {/* position */}
          <div
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
            className="z-50"
          >
            {/*  */}
            {/* animate in-out */}
            <motion.div
              initial={{ opacity: 0, y: 2 }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.24 } }}
              className={`bg-slate-900 p-2 text-slate-200 shadow rounded text-xs ${classes}`}
            >
              {/*  */}
              {/* tooltip content */}
              <div>{children}</div>
              {/*  */}
              {/* arrow */}
              <div
                ref={setArrowElement}
                style={styles.arrow}
                className={arrowClasses[placement] || arrowClasses._default}
              />
            </motion.div>
          </div>
        </PortalOverlays>
      )}
    </AnimatePresence>
  );
}

/**
 *
 * <button
 * type="button"
 * className="button"
 * ref={setRefButton}>
 * ok
 * </button>
 * <Tooltip
 *   isActive = true
 *   refElement={refButton}>
 * in a tooltip</Tooltip>
 *
 */
