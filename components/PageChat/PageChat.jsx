import React, { useEffect, useState } from "react";
import modcss from "./PageChat.module.css";
import cli from "../../src/feathers";
import useIsMounted from "../../src/hooks/use-is-mounted";
import {
  useFlags,
  IS_LOADING_CHAT,
  IS_ACTIVE_HELP_CHAT,
} from "../../src/hooks/use-flags-global";
import ArticleEnd from "../ArticleEnd";
import PortalOverlaysEnd from "../PortalOverlaysEnd";
import { motion, AnimatePresence } from "framer-motion";
import { prevent, dateFormated } from "../../src/util";
import useInputSynced from "../../src/hooks/use-input-synced";
import { useAuth } from "../../app/store";
import escapeHtml from "escape-html";
import Effect from "../Effect";
import useStateSwitch from "../../src/hooks/use-state-switch";
import { SpinnerRotatingLines } from "../loaders";
import { IoHelp, MdDeleteOutline } from "../icons";
import DrawerBox from "../DrawerBox/DrawerBox";
import PageChatHelp from "../PageChatHelp/PageChatHelp";
////
////
const PageChat = () => {
  const isMounted = useIsMounted();
  const { user } = useAuth();
  //
  const { flags, toggle: toggleFlags } = useFlags();
  const isLoadingChat = flags[IS_LOADING_CHAT];
  const isActiveHelpChat = flags[IS_ACTIVE_HELP_CHAT];
  //
  const [messages, setMessages] = useState(null);
  const onCreated = (payload) => {
    setMessages((messages_) => [payload, ...(messages_ || [])]);
  };
  const onMessageRemoved = ({ _id: ID }) => {
    // console.log(`@onMessageRemoved`);
    // filter out from messsages[]
    setMessages((messages) => messages.filter((msg) => ID !== msg._id));
  };
  //
  // stop listening on unmount
  useEffect(() => {
    return () => {
      cli
        .service("chat")
        .removeListener("created", onCreated)
        .removeListener("removed", onMessageRemoved);
    };
  }, []);
  //
  // attach feathers events when chat is done fetching messages
  useEffect(() => {
    if (false === isLoadingChat) {
      cli
        .service("chat")
        .on("created", onCreated)
        .on("removed", onMessageRemoved);
    }
  }, [isLoadingChat]);
  useEffect(() => {
    if (isMounted) {
      cli
        .service("chat")
        .find({
          query: {
            // limit.max 1000
            $limit: 123,
            $sort: { createdAt: -1 },
          },
        })
        .then(({ data }) => {
          setMessages(data);
        })
        .finally(() => toggleFlags.off(IS_LOADING_CHAT));
    }
  }, [isMounted]);
  //
  const onClickMessageRemove = ({ _id }) => {
    // message{ _id author author_id text .timestamps }
    if (isMounted) {
      cli.service("chat").remove(_id);
    }
  };
  //
  return (
    <>
      <div
        className={`${modcss.bgChat} ${modcss.pageChat} h-full overflow-y-auto scrollbar-thin m-0 p-0`}
      >
        <div className="prose !pb-32">
          <ul className="flex flex-col list-none !text-sm">
            <AnimatePresence initial={false}>
              {messages ? (
                messages.map((message) => (
                  <motion.li
                    initial={{ x: 122, opacity: 0 }}
                    animate={{
                      x: 0,
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                      x: 122,
                      transition: { duration: 0.12 },
                    }}
                    key={message._id}
                    className="p-4 rounded-lg shadow bg-slate-50/20 hover:bg-slate-50/50"
                  >
                    <div className="flex flex-row items-start">
                      <div className="text-center opacity-40 min-w-max grow-0">
                        <h5>{escapeHtml(message.author)}</h5>
                        <small className="!text-xs italic">
                          {dateFormated(message.createdAt)}
                        </small>
                      </div>
                      <article className="px-4 grow">
                        {escapeHtml(message.text)}
                      </article>
                      <aside className="flex flex-row items-start justify-end w-8">
                        {user && user.uid === message.author_id && (
                          <MdDeleteOutline
                            onClick={() => onClickMessageRemove(message)}
                            className="text-lg transition-transform duration-75 cursor-pointer opacity-40 hover:opacity-100 hover:scale-110 text-danger"
                          />
                        )}
                      </aside>
                    </div>
                  </motion.li>
                ))
              ) : (
                <div className="flex flex-row items-center justify-center p-12">
                  <SpinnerRotatingLines width="122" />
                </div>
              )}
            </AnimatePresence>
          </ul>
          {messages && <ArticleEnd />}
        </div>
      </div>
      {/*  */}
      <ChatControll />
      <DrawerBox
        isActive={isActiveHelpChat}
        onClose={() => toggleFlags.off(IS_ACTIVE_HELP_CHAT)}
      >
        <PageChatHelp />
      </DrawerBox>
    </>
  );
};

export default PageChat;

////
////
function ChatControll() {
  const { user } = useAuth();
  const { sync, inputs, setInput } = useInputSynced({ text: "" });
  const { isOn: isActiveEffect, toggle: toggleIsActiveEffect } =
    useStateSwitch();
  //
  const onMessage = (message) => {
    cli.service("chat").create(message);
  };
  const onSubmit = () => {
    const text = inputs.text.trim();
    if (0 === text.length) return toggleIsActiveEffect.on();
    //
    onMessage({
      text,
      author: user?.displayName || "👤",
      author_id: user?.uid || null,
    });
    setInput({ text: "" });
  };
  const { toggle: toggleFlags } = useFlags();
  const onChatHelp = () => toggleFlags.on(IS_ACTIVE_HELP_CHAT);
  //
  //
  return (
    <PortalOverlaysEnd>
      <Effect
        isActive={isActiveEffect}
        onEnd={toggleIsActiveEffect.off}
        className="fixed inset-x-0 bottom-0 z-20"
      >
        {/* framer container */}
        <motion.div
          key="PageChat"
          //// $width-right-window[w-7/12] - $width-right-navbar[w-16]
          className={`***z-10 !text-slate-100 lg:absolute bottom-0 right-16 p-4 !pr-2 bg-gradient-to-b from-slate-900/80 to-slate-900 rounded-tl-2xl ${modcss.chatControllResponsive}`}
          initial={{ opacity: 0, x: 56 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex flex-row items-center">
            {/* username */}
            <div className="text-sm italic opacity-40 min-w-fit grow-0">
              {escapeHtml(user?.displayName || "👤")}
            </div>
            {/* message input */}
            <form onSubmit={prevent(onSubmit)} noValidate className="pl-4 grow">
              <input
                name="text"
                value={inputs.text}
                onChange={sync}
                type="text"
                className="!bg-transparent input-underline"
                placeholder="poruka..."
                autoComplete="off"
                autoFocus
              />
            </form>
            {/* actions */}
            <div className="flex flex-row gap-0 min-w-fit grow-0">
              <button
                type="button"
                className="px-6 sm:px-8 bg-opacity-20 button sm:!rounded-r-none font-bold"
                onClick={onSubmit}
              >
                ok
              </button>
              <button
                onClick={onChatHelp}
                type="button"
                className="hidden sm:!inline-block px-4 bg-opacity-20 button !rounded-l-none"
              >
                <IoHelp className="text-2xl text-slate-50/50" />
              </button>
            </div>
          </div>
        </motion.div>
      </Effect>
    </PortalOverlaysEnd>
  );
}
