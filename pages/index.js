// powerful-tor-wqvb45eoueqypwzbpjj1w4k6.herokudns.com
import React, { useEffect } from "react";
import DocBody from "../components/DocBody";
//
// import client from "../src/feathers";
// @stripe vanillaJS
// https://www.youtube.com/watch?v=K7PHc6QNaoc
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

import VideoBackground from "../components/VideoBackground/VideoBackground";
import GuestNavigation from "../components/GuestNavigation/GuestNavigation";
import Paper from "../components/Paper/Paper";

import { usePages, useWineReview } from "../app/store";

// import {
//   Menu,
//   Listbox,
//   Combobox,
//   Switch,
//   Disclosure,
//   Dialog,
//   Popover,
//   RadioGroup,
//   Tab,
//   Transition,
// } from "@headlessui/react";
import IconBarSharing from "../components/IconBarSharing/IconBarSharing";
import PageArticleCommandBar from "../components/PageArticleCommandBar/PageArticleCommandBar";
import PageWineReviewToolbar from "../components/PageWineReviewToolbar/PageWineReviewToolbar";
import useIsMounted from "../src/hooks/use-is-mounted";
import {
  PAGE_LOGIN,
  PAGE_REGISTER,
  PAGE_HELP,
  PAGE_WINE_REVIEW_PREVIEW,
  PAGE_SEARCH,
} from "../app/store/page";
import { bgDashboard } from "../components/HelpPage/HelpPage";
import { bgPageSearch } from "../components/PageSearch/PageSearch";

//
import Image from "next/image";
import {
  useFlags,
  IS_ACTIVE_WINE_REVIEW_TOOLBAR,
} from "../src/hooks/use-flags-global";
import {
  useGlobals,
  WR_IS_PREVIEW,
  WR_IS_PREVIEW_ID,
  WINE_REVIEW_IMAGE_DATAURL,
} from "../src/hooks/use-globals";
//
//
export default function Home() {
  const isMounted = useIsMounted();
  const globals = useGlobals();
  const { toggle: toggleFlags } = useFlags();
  //
  const { page, setPage } = usePages();
  //
  const isWRPreviewID = globals(WR_IS_PREVIEW_ID);
  const openWineReviewToolbar = () =>
    toggleFlags.on(IS_ACTIVE_WINE_REVIEW_TOOLBAR);
  const imageSrc = globals(WINE_REVIEW_IMAGE_DATAURL);
  //
  const { winereview } = useWineReview();
  //
  useEffect(() => {
    if (null != isWRPreviewID && winereview) {
      globals.set(
        WR_IS_PREVIEW,
        winereview.find((node) => isWRPreviewID === node._id)
      );
      setPage(PAGE_WINE_REVIEW_PREVIEW);
      openWineReviewToolbar();
    }
  }, [isWRPreviewID, winereview]);
  //
  return (
    <DocBody className="h-screen">
      {/* 2-col grid */}
      <div className="h-full lg:grid lg:grid-cols-12">
        {/* window-left */}
        {/* hide; show on `lg` and up */}
        <section
          id="window-left"
          className="relative z-10 hidden border-r-4 shadow-lg lg:col-span-5 lg:!block border-r-white"
        >
          {isMounted &&
            (PAGE_WINE_REVIEW_PREVIEW === page.key && imageSrc ? (
              <Image
                alt=""
                src={imageSrc}
                layout="fill"
                className="block object-cover object-center"
              />
            ) : (
              <VideoBackground video="https://nikolav.rs/etc/wine-app/mov.min2.mp4" />
            ))}
        </section>

        {/* window-right */}
        <section
          id="window-right"
          className="z-10 pr-16 lg:relative lg:col-span-7"
        >
          {/* nav right */}
          <GuestNavigation className="absolute inset-y-0 !right-0 z-10 w-16 bg-gradient-to-r from-slate-900/95 to-slate-900" />
          <IconBarSharing />
          <PageArticleCommandBar />
          <PageWineReviewToolbar />
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
              {/* @login/register add `!overflow-y-auto scrollbar-thin`  */}
              <Paper
                className={`bg-white relative h-full py-6 mx-4 mt-4 shadow-lg rounded-t-2xl bg-opacity-95 ${
                  [PAGE_LOGIN, PAGE_REGISTER].includes(page.key)
                    ? "!overflow-y-auto scrollbar-thin"
                    : "overflow-y-hidden"
                  // sets dashboard background
                } ${PAGE_HELP === page.key ? bgDashboard : ""} ${
                  PAGE_SEARCH === page.key ? bgPageSearch : ""
                }`}
              >
                <page.content />
              </Paper>
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </DocBody>
  );
}
