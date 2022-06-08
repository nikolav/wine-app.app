import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { arrayRand, has } from "../../src/util";
import useTimer from "../../src/hooks/use-timer";
import useIsMounted from "../../src/hooks/use-is-mounted";

const DEFAULT_ROTATION_TIMEOUT = 3; // [sec]
const DEFAULT_ROTATION_EFFECT = "fade";
const ROTATION_EFFECT = {
  fade: {
    initial: { opacity: 0 },
    exit: { opacity: 0 },
    animate: { opacity: 1 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 34 },
    exit: { opacity: 0, x: -12, transition: { duration: 0.1 } },
    animate: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", duration: 0.24 },
    },
  },
};

export default function Rotation({
  //
  // [{ key: string.unique, node: Node|Component }]
  nodes = [],

  //
  // [sec]
  timeout = DEFAULT_ROTATION_TIMEOUT,
  //
  //
  effect = DEFAULT_ROTATION_EFFECT,
  //
  ...rest
}) {
  const isMounted = useIsMounted();
  const [active, setActive] = useState(arrayRand(nodes));
  const nextNode = () => {
    let node = active;

    if (1 < nodes.length) {
      while (node === active) {
        node = arrayRand(nodes);
      }
    }
    setActive(node);
  };
  //
  const timerControls = useTimer(nextNode);
  const slideshowStart = timerControls.start.bind(
    null,
    parseInt(timeout, 10) * 1000
  );
  //
  useEffect(() => {
    if (isMounted) slideshowStart();
    return timerControls.stop;
  }, [isMounted]);
  if (!has(ROTATION_EFFECT, effect)) effect = DEFAULT_ROTATION_EFFECT;
  //
  //
  return (
    <AnimatePresence initial={false}>
      <div
        style={{
          position: "relative",
          margin: 0,
          padding: 0,
        }}
        onMouseOver={timerControls.stop}
        onMouseOut={slideshowStart}
        {...rest}
      >
        <motion.div
          key={active.key}
          className="absolute inset-0"
          initial={ROTATION_EFFECT[effect].initial}
          exit={ROTATION_EFFECT[effect].exit}
          animate={ROTATION_EFFECT[effect].animate}
        >
          {active.node}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
