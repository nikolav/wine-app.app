import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import useTimer from "../../src/hooks/use-timer";
import { arrayRand } from "../../src/util";
import useStateSwitch from "../../src/hooks/use-state-switch";
//
export const DEFAULT_TIMEOUT = 10;
const SlideshowImages = ({
  // url[]
  images = [],

  // css size unit
  width = "100%",

  // css size unit
  height = "100%",

  // string
  classes = "",

  // number[sec]
  timeout = DEFAULT_TIMEOUT,
}) => {
  //
  const { isOn: isMounted, toggle: toggleMounted } = useStateSwitch();
  useEffect(() => {
    toggleMounted.on();
    return toggleMounted.off;
  }, []);
  //
  const timeoutSec = parseInt(timeout, 10) * 1000;
  const Images = images.map((imgSrc) => (
    <Image
      layout="fill"
      src={imgSrc}
      key={imgSrc}
      alt=""
      className="block object-cover object-center w-full h-full"
    />
  ));
  const [image, setImage] = useState(arrayRand(Images));
  //
  const nextImage = () => {
    let img = image;

    if (1 < Images.length) {
      while (img === image) {
        img = arrayRand(Images);
      }
    }

    setImage(img);
  };
  // { start(), stop(), .running }
  const timerControls = useTimer(nextImage);
  const slideshowStart = timerControls.start.bind(null, timeoutSec);
  //
  useEffect(() => {
    if (isMounted) {
      slideshowStart();
    }
    return timerControls.stop;
  }, [isMounted]);

  return (
    <>
      <AnimatePresence>
        <div
          style={{
            width,
            height,
          }}
          className={`bg-slate-200 m-0 p-0 relative z-10 overflow-hidden ${classes}`}
          onMouseOver={timerControls.stop}
          onMouseOut={slideshowStart}
        >
          <motion.div
            key={image.key}
            className="absolute inset-0 z-10"
            initial={{ opacity: 0, y: -12 }}
            exit={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {image}
          </motion.div>
        </div>
      </AnimatePresence>
    </>
  );
};

export default SlideshowImages;
