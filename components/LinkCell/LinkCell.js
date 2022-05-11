import React from "react";
import css from "./LinkCell.module.css";
import { motion } from "framer-motion";

import ModalBox from "../ModalBox";
import { useFlags } from "../../src/hooks/use-flags-global";

function LinkCell({ classes, id, title, children, ...rest }) {
  const { flags, toggle } = useFlags();
  const isOn = flags[id];
  const toggleOn = () => toggle.on(id);
  const toggleOff = () => toggle.off(id);
  return (
    <>
      <motion.div
        whileHover={{
          scale: 1.12,
        }}
        className={`${classes} hover:z-10 hover:shadow-lg m-0 p-0 cursor-pointer relative overflow-hidden link-cell`}
        id={id}
        onClick={toggleOn}
        {...rest}
      >
        <h2 className="text-white text-2xl italic text-center p-2 pb-3 absolute w-full bottom-0 bg-black/40">
          {title}
        </h2>
      </motion.div>
      <ModalBox isOpen={isOn} onClose={toggleOff}>
        {children}
      </ModalBox>
    </>
  );
}

export default LinkCell;
