import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Details = ({ isActive, header, children, height = "auto", ...rest }) => {
  //
  return (
    <div {...rest}>
      {/*  */}
      {/* render header */}
      {null != header && <div>{header}</div>}
      {/*  */}
      {/* render <Details> content */}
      <AnimatePresence initial={false}>
        {true === isActive && (
          <motion.div
            animate={{
              opacity: 1,
              height,
            }}
            initial={{ opacity: 0, height: 0 }}
            exit={{ opacity: 0, height: 0, transition: { duration: 0.12 } }}
            className="overflow-y-hidden"
          >
            <div>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Details;
