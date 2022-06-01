import React from "react";
import PortalOverlaysEnd from "../PortalOverlaysEnd";
import { motion, AnimatePresence } from "framer-motion";
import {
  useFlags,
  IS_ACTIVE_WINE_REVIEW_TOOLBAR,
  IS_PROCESSING_WINE_REVIEW_UPLOAD,
} from "../../src/hooks/use-flags-global";
import {
  TiArrowLeftThick,
  IoHelp,
  FiCamera,
  MdDeleteOutline,
  MdOutlineEditNote,
  BiCloudUpload,
} from "../icons";
import DrawerBox from "../DrawerBox/DrawerBox";
import PageWineReviewHelp from "../PageWineReviewHelp/PageWineReviewHelp";
import useStateSwitch from "../../src/hooks/use-state-switch";
import { noop, prevent } from "../../src/util";
import ChooseImage from "../ChooseImage/ChooseImage";
import {
  useGlobals,
  WINE_REVIEW_IMAGE_FILE,
  WINE_REVIEW_IMAGE_DATAURL,
  WINE_REVIEW_IMAGE_SHOW,
  WINE_REVIEW_ONSAVE,
} from "../../src/hooks/use-globals";
import ChooseImageShow from "../ChooseImageShow/ChooseImageShow";
import useHandleImageDataUrl from "../../src/hooks/use-handle-image-data-url";
import PageWineReviewDescription from "../PageWineReviewDescription/PageWineReviewDescription";

////
////
const PageWineReviewToolbar = () => {
  const { flags } = useFlags();
  const isActive = flags[IS_ACTIVE_WINE_REVIEW_TOOLBAR];
  const {
    isOn: isActiveWineReviewHelp,
    toggle: toggleIsActiveWineReviewHelp,
  } = useStateSwitch();
  const globals = useGlobals();
  //
  const image_ = useHandleImageDataUrl({
    GLOBAL_FILE: WINE_REVIEW_IMAGE_FILE,
    GLOBAL_DATAURL: WINE_REVIEW_IMAGE_DATAURL,
    GLOBAL_SHOW: WINE_REVIEW_IMAGE_SHOW,
  });
  const imageDataWineReview = image_();
  //
  const { isOn: isActiveDescription, toggle: toggleDescription } =
    useStateSwitch();
  //
  const disabledUpload = flags[IS_PROCESSING_WINE_REVIEW_UPLOAD];
  const wineReviewOnSave = () => globals.set(WINE_REVIEW_ONSAVE, Date.now());
  //
  return (
    <>
      <PortalOverlaysEnd>
        <AnimatePresence>
          {isActive && (
            <motion.div
              key={IS_ACTIVE_WINE_REVIEW_TOOLBAR}
              className="fixed inset-y-0 right-0 z-20 w-16 bg-slate-900"
              initial={{ opacity: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              animate={{ opacity: 1, transition: { duration: 0.24 } }}
            >
              <ul className="list-none space-y-8 w-full h-full flex flex-col items-center **justify-end py-6">
                <IconCommandClose className="mb-16">
                  <TiArrowLeftThick className="text-white text-5xl opacity-60 hover:scale-110 transition-transform hover:opacity-80 active:opacity-100 cursor-pointer" />
                </IconCommandClose>
                <IconCommand>
                  <ChooseImage
                    id="pageWineReviewToolbar"
                    GLOBAL_FILE={WINE_REVIEW_IMAGE_FILE}
                    GLOBAL_DATAURL={WINE_REVIEW_IMAGE_DATAURL}
                  >
                    <FiCamera className="text-white text-4xl opacity-50 hover:scale-110 transition-transform hover:opacity-80 active:opacity-100 cursor-pointer" />
                  </ChooseImage>
                </IconCommand>
                {/*  */}
                {imageDataWineReview && (
                  <>
                    <IconCommand onClick={prevent(image_.rm)}>
                      <MdDeleteOutline className="text-white text-3xl opacity-20 hover:scale-110 transition-transform hover:opacity-80 active:opacity-100 cursor-pointer" />
                    </IconCommand>
                  </>
                )}
                {/*  */}
                <IconCommand onClick={prevent(toggleDescription.on)}>
                  <MdOutlineEditNote className="pl-px text-white text-5xl opacity-50 hover:scale-110 transition-transform hover:opacity-80 active:opacity-100 cursor-pointer" />
                </IconCommand>
                {/*  */}
                <IconCommand
                  onClick={prevent(wineReviewOnSave)}
                  disabled={disabledUpload}
                >
                  <BiCloudUpload
                    className={`text-white text-5xl transition-transform ${
                      disabledUpload
                        ? "opacity-20 cursor-not-allowed"
                        : "opacity-80 hover:scale-125 hover:opacity-90 active:opacity-100 cursor-pointer"
                    }`}
                  />
                </IconCommand>

                {/*  */}
                <IconCommand
                  onClick={prevent(toggleIsActiveWineReviewHelp.on)}
                  className="!mt-auto"
                >
                  <IoHelp className="text-white text-4xl opacity-20 hover:scale-110 transition-transform hover:opacity-80 active:opacity-100 cursor-pointer" />
                </IconCommand>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </PortalOverlaysEnd>
      {/*  */}
      <DrawerBox
        isActive={isActiveWineReviewHelp}
        onClose={toggleIsActiveWineReviewHelp.off}
      >
        <PageWineReviewHelp />
      </DrawerBox>
      {/*  */}
      <ChooseImageShow
        GLOBAL_DATAURL={WINE_REVIEW_IMAGE_DATAURL}
        GLOBAL_IMAGE_SHOW={WINE_REVIEW_IMAGE_SHOW}
      >
        <article>
          <strong className="text-2xl">👏🏼</strong>
          <br />
          <strong className="text-2xl">👈🏼</strong> Izabrali ste ovu sliku.
          <br />
          Biće postavljena kada sačuvate ocenu vina ⭐.
          <br />
          <strong className="text-2xl">🍾🥳</strong>
        </article>
      </ChooseImageShow>
      {/*  */}
      <PageWineReviewDescription
        isActive={isActiveDescription}
        onClose={toggleDescription.off}
      />
    </>
  );
};

export default PageWineReviewToolbar;

function IconCommandClose({ children, ...rest }) {
  const { toggle } = useFlags();
  const closeCmdBar = () => toggle.off(IS_ACTIVE_WINE_REVIEW_TOOLBAR);
  return (
    <li onClick={prevent(closeCmdBar)} {...rest}>
      {children}
    </li>
  );
}
function IconCommand({ children, disabled = null, onClick = noop, ...rest }) {
  const handle = disabled ? prevent(noop) : onClick;
  return (
    <li onClick={handle} {...rest}>
      {children}
    </li>
  );
}

//
