import React from "react";
import modcss from "./PageArticleCommandBar.module.css";
import PortalOverlaysEnd from "../PortalOverlaysEnd";
import { motion, AnimatePresence } from "framer-motion";
import {
  useFlags,
  IS_ACTIVE_ARTICLE_COMMANDS,
} from "../../src/hooks/use-flags-global";
import { prevent } from "../../src/util";
//
import { TiArrowLeftThick, BiCloudUpload, FiCamera, IoHelp } from "../icons";
import DrawerBox from "../DrawerBox/DrawerBox";
import PageArticleEditorHelp from "../PageArticleEditorHelp/PageArticleEditorHelp";
import useStateSwitch from "../../src/hooks/use-state-switch";
//
const PageArticleCommandBar = () => {
  const { flags } = useFlags();
  const isActive = flags[IS_ACTIVE_ARTICLE_COMMANDS];
  const { isOn: isOnHelpArticleEditor, toggle: toggleHelpArticleEditor } =
    useStateSwitch();
  //
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
                <IconCommand>
                  <FiCamera className="text-white text-4xl opacity-50 hover:scale-110 transition-transform hover:opacity-80 active:opacity-100 cursor-pointer" />
                </IconCommand>
                <IconCommand>
                  <BiCloudUpload className="text-white text-5xl opacity-80 hover:scale-125 transition-transform hover:opacity-90 active:opacity-100 cursor-pointer" />
                </IconCommand>
                <IconCommand
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
    </>
  );
};

export default PageArticleCommandBar;

function IconCommandClose({ children, ...rest }) {
  const { toggle } = useFlags();
  const closeCmdBar = () => toggle.off(IS_ACTIVE_ARTICLE_COMMANDS);
  return (
    <li onClick={prevent(closeCmdBar)} {...rest}>
      {children}
    </li>
  );
}
function IconCommand({ children, onClick = prevent, ...rest }) {
  return (
    <li onClick={onClick} {...rest}>
      {children}
    </li>
  );
}
