import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import useStateSwitch from "../../src/hooks/use-state-switch";
import { has } from "../../src/util";

//
const DEFAULT_DURATION_OPEN = 0.24;
const DEFAULT_DURATION_CLOSE = 0.12;
const DEFAULT_EFFECT = "fade";
//
const EFFECT = {
  fade: {
    initial: { opacity: 0 },
    exit: { opacity: 0, transition: { duration: DEFAULT_DURATION_CLOSE } },
    animate: { opacity: 1, transition: { duration: DEFAULT_DURATION_OPEN } },
  },
  slideTop: {
    initial: { opacity: 0, y: "100%" },
    exit: {
      opacity: 0,
      y: "100%",
      transition: { duration: DEFAULT_DURATION_CLOSE },
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: DEFAULT_DURATION_OPEN },
    },
  },
  slideLeft: {
    initial: { opacity: 0, x: "100%" },
    exit: {
      opacity: 0,
      x: "100%",
      transition: { duration: DEFAULT_DURATION_CLOSE },
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: DEFAULT_DURATION_OPEN },
    },
  },
};
//
const OverlayHover = ({
  //
  // display element
  children,
  //
  // toggle element
  // { key: string.unique, node: Node|Component }
  overlay,
  //
  effect = DEFAULT_EFFECT,
  //
  className = "",
  ...rest
}) => {
  const { isOn, toggle } = useStateSwitch();
  //
  if (!has(EFFECT, effect)) effect = DEFAULT_EFFECT;
  //
  return (
    <div
      onMouseOver={toggle.on}
      onMouseLeave={toggle.off}
      className={`w-fit h-fit overflow-hidden relative ${className}`}
      {...rest}
    >
      {children}
      <AnimatePresence>
        {isOn && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
            <motion.div
              initial={EFFECT[effect].initial}
              exit={EFFECT[effect].exit}
              animate={EFFECT[effect].animate}
              key={overlay.key}
              className="h-full grid"
            >
              {overlay.node}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OverlayHover;
