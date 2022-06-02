import React from "react";
import modcss from "./IconBarSharing.module.css";
import PortalOverlaysEnd from "../PortalOverlaysEnd";
import { motion, AnimatePresence } from "framer-motion";
import { useFlags, IS_ACTIVE_SHARING } from "../../src/hooks/use-flags-global";
import { prevent } from "../../src/util";
//
import {
  RiTwitterLine,
  TiArrowLeftThick,
  FaFacebookF,
  MdOutlineMail,
  FaViber,
  RiMessengerLine,
  AiOutlineWhatsApp,
} from "../icons";
import {
  TwitterShareButton,
  FacebookShareButton,
  EmailShareButton,
  ViberShareButton,
  FacebookMessengerShareButton,
  WhatsappShareButton,
} from "react-share";
//
// export const SHARE_URL = "https://nikolav.rs/";
// export const SHARE_URL = "https://wine-app0.herokuapp.com/";
export const SHARE_URL = "http://ljubiteljvina.xyz/";
//
const IconBarSharing = () => {
  const { flags } = useFlags();
  const isActive = flags[IS_ACTIVE_SHARING];
  //
  return (
    <PortalOverlaysEnd>
      <AnimatePresence>
        {isActive && (
          <motion.div
            key={IS_ACTIVE_SHARING}
            className="fixed inset-y-0 right-0 z-20 w-16 bg-slate-900"
            initial={{ opacity: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            animate={{ opacity: 1, transition: { duration: 0.24 } }}
          >
            <ul className="list-none ***space-y-8 w-full h-full flex flex-col items-center justify-between py-4">
              <IconShare className="mb-20">
                <TiArrowLeftThick className="text-5xl text-white transition-transform cursor-pointer opacity-60 hover:scale-110 hover:opacity-80 active:opacity-100" />
              </IconShare>
              <div className="flex flex-col items-center justify-between grow">
                <IconShare>
                  <TwitterShareButton url={SHARE_URL}>
                    <RiTwitterLine className="text-4xl text-white transition-transform opacity-50 cursor-pointer hover:scale-110 hover:opacity-80 active:opacity-100" />
                  </TwitterShareButton>
                </IconShare>
                <IconShare>
                  <FacebookShareButton url={SHARE_URL}>
                    <FaFacebookF className="text-3xl text-white transition-transform opacity-50 cursor-pointer hover:scale-110 hover:opacity-80 active:opacity-100" />
                  </FacebookShareButton>
                </IconShare>
                <IconShare>
                  <ViberShareButton url={SHARE_URL} title={SHARE_URL}>
                    <FaViber className="text-3xl text-white transition-transform opacity-50 cursor-pointer hover:scale-110 hover:opacity-80 active:opacity-100" />
                  </ViberShareButton>
                </IconShare>
                <IconShare>
                  <FacebookMessengerShareButton url={SHARE_URL}>
                    <RiMessengerLine className="text-3xl text-white transition-transform opacity-50 cursor-pointer hover:scale-110 hover:opacity-80 active:opacity-100" />
                  </FacebookMessengerShareButton>
                </IconShare>
                <IconShare>
                  <WhatsappShareButton url={SHARE_URL} title={SHARE_URL}>
                    <AiOutlineWhatsApp className="text-3xl text-white transition-transform opacity-50 cursor-pointer hover:scale-110 hover:opacity-80 active:opacity-100" />
                  </WhatsappShareButton>
                </IconShare>
                <IconShare>
                  <EmailShareButton url={SHARE_URL} subject={`@: ${SHARE_URL}`}>
                    <MdOutlineMail className="text-3xl text-white transition-transform opacity-50 cursor-pointer hover:scale-110 hover:opacity-80 active:opacity-100" />
                  </EmailShareButton>
                </IconShare>
              </div>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </PortalOverlaysEnd>
  );
};

export default IconBarSharing;

function IconShare({ children, ...rest }) {
  const { toggle } = useFlags();
  const closeSharing = () => toggle.off(IS_ACTIVE_SHARING);
  return (
    <li onClick={prevent(closeSharing)} {...rest}>
      {children}
    </li>
  );
}
