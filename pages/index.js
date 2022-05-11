import React from "react";
import DocBody from "../components/DocBody";

// import client from "../src/feathers";

// @stripe vanillaJS
// https://www.youtube.com/watch?v=K7PHc6QNaoc

import {
  motion,
  AnimatePresence,

  //   // • wraps related-connected components, with the same `layoutId`
  //   //   that `morph` into each other, from "screen-A" to "screen-B"
  //   // • wrap <AnimatePresence> around component that is mounting in and out
  //   // • add `layoutId` prop to elements that are "shared/same" on both screens
  //   //   to make them connected btw. screens
  //   // ..like <heading> morphing from header to overlay screen
  //   // https://drive.google.com/file/d/1_4sUmo4ERMJeB8Ew0CSrT9u_eLn50i0A/view?usp=sharing
  //   // https://drive.google.com/file/d/1_91ayUY1aEVsmUBLYDvkbsL_Tl7Mr3FS/view?usp=sharing
  //   AnimateSharedLayout,

  //   useMotionValue,
  //   useViewportScroll,
  //   useTransform,
  //   useSpring,
  //   useTime,
  //   useCycle,
  //   useMotionTemplate,
  //   useElementScroll,
  //   useVelocity,
  //   animate,
} from "framer-motion";

// import VideoBackground from "../components/VideoBackground/VideoBackground";
import GuestNavigation from "../components/GuestNavigation/GuestNavigation";
import Paper from "../components/Paper/Paper";

import { usePages } from "../app/store";

// import { Menu, Listbox, Combobox, Switch } from "@headlessui/react";

//
export default function Home() {
  const { page } = usePages();
  return (
    <>
      <DocBody className="h-screen overflow-y-hidden">
        {/* 2-col grid */}
        <div className="grid grid-cols-12 h-full">
          {/* window-left */}
          <section
            id="window-left"
            className="col-span-5 relative z-10 shadow-lg border-r-4 border-r-white"
          >
            {/* <VideoBackground /> */}
          </section>

          {/* window-right */}
          <section id="window-right" className="col-span-7 relative z-10 pr-16">

            {/* nav right */}
            <GuestNavigation className="absolute z-10 right-0 inset-y-0 w-16 bg-slate-900" />

            {/* `framer` page toggle; change `key` and `content` to set page */}
            <AnimatePresence>
              <motion.div
                key={page.key}
                style={{
                  width: "calc(100% - 4rem)",
                }}
                className="h-full"
                initial={{ y: -12, opacity: 0.12 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  position: "absolute",
                  transition: { stiffness: 12 },
                }}
                exit={{ y: 48, opacity: 0, transition: { stiffness: 12 } }}
              >
                <Paper className="bg-white h-full rounded-t-2xl shadow-lg py-6 mx-4 mt-4 opacity-95 **backdrop-blur-md relative overflow-hidden">
                  <page.content />
                </Paper>
              </motion.div>
            </AnimatePresence>
          </section>
        </div>
      </DocBody>
    </>
  );
}
