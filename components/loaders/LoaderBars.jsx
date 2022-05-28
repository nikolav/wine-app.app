import React from "react";
import {
  useFlags,
  IS_PROCESSING_ARTICLE_SAVE,
} from "../../src/hooks/use-flags-global";
import { motion } from "framer-motion";
import PortalOverlaysEnd from "../PortalOverlaysEnd";
import { Bars } from "react-loader-spinner";

// https://mhnpd.github.io/react-loader-spinner/
// yarn add react-loader-spinner
// rgb(15, 23, 42)
// <RotatingLines width="100%" strokeColor="rgb(15, 23, 42)" />
// <Bars heigth="100%" width="100%" color="rgb(15, 23, 42)" ariaLabel="loading-indicator" />
const LoaderBars = () => {
  const { flags } = useFlags();
  const isActive = flags[IS_PROCESSING_ARTICLE_SAVE];
  //
  return (
    isActive && (
      <PortalOverlaysEnd>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{
            opacity: .55,
            y: 0,
            transition: { duration: 0.12 },
          }}
          className="fixed right-20 bottom-0 z-50"
        >
          <Bars heigth="20" width="50" color="rgb(15, 23, 42)" ariaLabel="loading-indicator" />
        </motion.div>
      </PortalOverlaysEnd>
    )
  );
};

export default LoaderBars;
