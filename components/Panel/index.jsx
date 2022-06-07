import React, { useState } from "react";
import PortalOverlays from "../PortalOverlays";
import { motion, AnimatePresence } from "framer-motion";
import { has } from "../../src/util";
// https://popper.js.org/react-popper/
import { usePopper } from "react-popper";
////
////
const Panel = ({
  refElement,
  isActive = true,
  placement = "auto",
  offset = [0, 0],
  options = {},
  children,
}) => {
  const popperConfig = {
    placement,
    modifiers: [
      {
        name: "offset",
        options: {
          offset,
        },
      },
    ],
    ...options,
  };
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(
    refElement,
    popperElement,
    popperConfig
  );
  //
  return true === isActive ? (
    <PortalOverlays>
      <div
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        className="z-10 m-0 p-0"
      >
        {children}
      </div>
    </PortalOverlays>
  ) : null;
};
//
const DEFAULT_DURATION_IN = 0.24;
const DEFAULT_DURATION_OUT = 0.1;
const APPEAR = {
  slideUp: {
    initial: { opacity: 0, y: 12 },
    exit: { opacity: 0, transition: { duration: DEFAULT_DURATION_OUT } },
    animate: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", duration: DEFAULT_DURATION_IN },
    },
  },
  _default: {
    initial: { opacity: 0 },
    exit: { opacity: 0, transition: { duration: DEFAULT_DURATION_OUT } },
    animate: { opacity: 1, transition: { duration: DEFAULT_DURATION_IN } },
  },
};
//
const PanelAppear = ({
  isActive = false,
  key = "panel",
  effect = "_default",
  children,
  ...rest
}) => {
  if (!has(APPEAR, effect)) effect = "_default";
  //
  return (
    <AnimatePresence initial={false}>
      {isActive && (
        <Panel isActive={isActive} {...rest}>
          <motion.div
            initial={APPEAR[effect].initial}
            exit={APPEAR[effect].exit}
            animate={APPEAR[effect].animate}
            key={key}
            className="m-0 p-0"
          >
            {children}
          </motion.div>
        </Panel>
      )}
    </AnimatePresence>
  );
};
//
// @@
Panel.Appear = PanelAppear;
//@@
export default Panel;

/*
<Popper
isActive
refElement={el}
placement="top"
offset={[0, 0]}
>
1.22
333
</Popper>


type Placement =
  | 'auto'
  | 'auto-start'
  | 'auto-end'
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'left'
  | 'left-start'
  | 'left-end';



*/
