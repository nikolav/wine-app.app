import React, { useEffect, useState, forwardRef } from "react";
// import modcss from "./PageArticleCommandBar.module.css";
import PortalOverlaysEnd from "../PortalOverlaysEnd";
import { motion, AnimatePresence } from "framer-motion";
import {
  useFlags,
  IS_ACTIVE_ARTICLE_COMMANDS,
  IS_PROCESSING_ARTICLE_SAVE,
} from "../../src/hooks/use-flags-global";
//
import {
  TiArrowLeftThick,
  BiCloudUpload,
  FiCamera,
  IoHelp,
  BiShow,
  MdDeleteOutline,
} from "../icons";
import DrawerBox from "../DrawerBox/DrawerBox";
import PageArticleEditorHelp from "../PageArticleEditorHelp/PageArticleEditorHelp";
import useStateSwitch from "../../src/hooks/use-state-switch";
import ChooseImage from "../ChooseImage/ChooseImage";
import ChooseImageShow from "../ChooseImageShow/ChooseImageShow";
import {
  useGlobals,
  ARTICLE_ONSAVE,
  DEACTIVATE_ARTICLE_TOOLTIP_TRASH,
} from "../../src/hooks/use-globals";
import { noop, prevent } from "../../src/util";
import useHandleImageDataUrl from "../../src/hooks/use-handle-image-data-url";
import Tooltip from "../Tooltip/Tooltip";
//
const IconCommand = forwardRef(function IconCommand(
  { children, disabled = null, onClick = noop, ...rest },
  ref
) {
  const handle = disabled ? prevent(noop) : onClick;
  return (
    <li ref={ref} onClick={handle} {...rest}>
      {children}
    </li>
  );
});
// const IconCommand = ({
//   children,
//   disabled = null,
//   onClick = noop,
//   ...rest
// }) => {
//   const handle = disabled ? prevent(noop) : onClick;
//   return (
//     <li onClick={handle} {...rest}>
//       {children}
//     </li>
//   );
// };

////
////
const PageArticleCommandBar = () => {
  const globals = useGlobals();
  const { flags } = useFlags();
  const isActive = flags[IS_ACTIVE_ARTICLE_COMMANDS];
  const { isOn: isOnHelpArticleEditor, toggle: toggleHelpArticleEditor } =
    useStateSwitch();
  //
  const image_ = useHandleImageDataUrl();
  const imageData = image_();
  const articleOnSave = () => globals.set(ARTICLE_ONSAVE, Date.now());
  const disabledUpload = flags[IS_PROCESSING_ARTICLE_SAVE];
  //
  //
  const IconCommandClose = ({ children, ...rest }) => {
    const { toggle } = useFlags();
    const closeCmdBar = () => toggle.off(IS_ACTIVE_ARTICLE_COMMANDS);
    return (
      <li onClick={prevent(closeCmdBar)} {...rest}>
        {children}
      </li>
    );
  };
  //
  const [refPopperSave, setRefPopperSave] = useState(null);
  const { isOn: isActiveSave, toggle: toggleIsActiveSave } = useStateSwitch();
  const [refPopperImage, setRefPopperImage] = useState(null);
  const { isOn: isActiveImage, toggle: toggleIsActiveImage } = useStateSwitch();
  const [refPopperTrash, setRefPopperTrash] = useState(null);
  const { isOn: isActiveTrash, toggle: toggleIsActiveTrash } =
    useStateSwitch(false);
  const [refPopperImagePreview, setRefPopperImagePreview] = useState(null);
  const { isOn: isActiveImagePreview, toggle: toggleIsActiveImagePreview } =
    useStateSwitch();
  //
  const hideTooltipTrash = globals(DEACTIVATE_ARTICLE_TOOLTIP_TRASH);
  useEffect(toggleIsActiveTrash.off, [hideTooltipTrash]);
  ////
  ////
  return (
    <>
      <PortalOverlaysEnd>
        <AnimatePresence>
          {isActive && (
            <motion.div
              key={IS_ACTIVE_ARTICLE_COMMANDS}
              className="fixed inset-y-0 right-0 z-20 w-16 bg-slate-900"
              initial={{ opacity: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              animate={{ opacity: 1, transition: { duration: 0.24 } }}
            >
              <ul className="list-none space-y-8 w-full h-full flex flex-col items-center **justify-end py-6">
                <IconCommandClose className="mb-16">
                  <TiArrowLeftThick className="text-white text-5xl opacity-60 hover:scale-110 transition-transform hover:opacity-80 active:opacity-100 cursor-pointer" />
                </IconCommandClose>
                <IconCommand
                  ref={setRefPopperImage}
                  onMouseOver={toggleIsActiveImage.on}
                  onMouseLeave={toggleIsActiveImage.off}
                  onClick={() => {
                    // trash tooltip stays open when choosing image..
                    // deactivates it here
                    toggleIsActiveTrash.off();
                    toggleIsActiveImage.off();
                  }}
                >
                  <ChooseImage id="articleCommandBar">
                    <FiCamera className="text-white text-4xl opacity-50 hover:scale-110 transition-transform hover:opacity-80 active:opacity-100 cursor-pointer" />
                  </ChooseImage>
                </IconCommand>
                <Tooltip
                  refElement={refPopperImage}
                  isActive={isActiveImage}
                  offset={[0, 23]}
                >
                  📷 izaberi sliku
                </Tooltip>
                {imageData && (
                  <>
                    <IconCommand
                      ref={setRefPopperTrash}
                      onMouseOver={toggleIsActiveTrash.on}
                      onMouseLeave={toggleIsActiveTrash.off}
                      onClick={prevent(image_.rm)}
                    >
                      <MdDeleteOutline className="text-white text-3xl opacity-20 hover:scale-110 transition-transform hover:opacity-80 active:opacity-100 cursor-pointer" />
                    </IconCommand>
                    <Tooltip
                      refElement={refPopperTrash}
                      isActive={isActiveTrash}
                      offset={[0, 23]}
                    >
                      🚫 ukloni sliku
                    </Tooltip>
                    <IconCommand
                      ref={setRefPopperImagePreview}
                      onMouseOver={toggleIsActiveImagePreview.on}
                      onMouseLeave={toggleIsActiveImagePreview.off}
                      onClick={prevent(image_.show)}
                    >
                      <BiShow className="text-white text-3xl opacity-20 hover:scale-110 transition-transform hover:opacity-80 active:opacity-100 cursor-pointer" />
                    </IconCommand>
                    <Tooltip
                      refElement={refPopperImagePreview}
                      isActive={isActiveImagePreview}
                      offset={[0, 23]}
                    >
                      🔎 pogledaj sliku
                    </Tooltip>
                  </>
                )}
                <IconCommand
                  onClick={prevent(articleOnSave)}
                  disabled={disabledUpload}
                  ref={setRefPopperSave}
                  onMouseOver={toggleIsActiveSave.on}
                  onMouseLeave={toggleIsActiveSave.off}
                >
                  <BiCloudUpload
                    className={`text-white text-5xl transition-transform ${
                      disabledUpload
                        ? "opacity-20 cursor-not-allowed"
                        : "opacity-80 hover:scale-125 hover:opacity-90 active:opacity-100 cursor-pointer"
                    }`}
                  />
                </IconCommand>
                {disabledUpload || (
                  <Tooltip
                    refElement={refPopperSave}
                    isActive={isActiveSave}
                    offset={[0, 23]}
                  >
                    💾 sačuvaj
                  </Tooltip>
                )}
                <IconCommand
                  className="!mt-auto"
                  onClick={prevent(toggleHelpArticleEditor.on)}
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
        isActive={isOnHelpArticleEditor}
        onClose={toggleHelpArticleEditor.off}
      >
        <PageArticleEditorHelp />
      </DrawerBox>
      {/*  */}
      {/* <PageArticleHandleImageDisplay /> */}
      <ChooseImageShow>
        <article>
          <strong className="text-2xl">👈🏼👏🏼</strong>
          <br />
          <strong className="text-2xl">👍🏼</strong> Izabrali ste ovu sliku.
          <br />
          Biće postavljena kada sačuvate članak.
          <br />
          <strong className="text-2xl">🍾🥳</strong>
        </article>
      </ChooseImageShow>
    </>
  );
};

export default PageArticleCommandBar;
