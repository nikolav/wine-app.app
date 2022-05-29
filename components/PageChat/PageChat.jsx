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
import {
  motion,
  // AnimatePresence,
} from "framer-motion";
import { prevent, dateFormated } from "../../src/util";
import useInputSynced from "../../src/hooks/use-input-synced";
import { useAuth } from "../../app/store";
import escapeHtml from "escape-html";
import Effect from "../Effect";
import useStateSwitch from "../../src/hooks/use-state-switch";
import { SpinnerRotatingLines } from "../loaders";
import { IoHelp } from "../icons";
import DrawerBox from "../DrawerBox/DrawerBox";
import PageChatHelp from "../PageChatHelp/PageChatHelp";
////
////
const PageChat = () => {
  const isMounted = useIsMounted();
  //
  const { flags, toggle: toggleFlags } = useFlags();
  const isLoadingChat = flags[IS_LOADING_CHAT];
  const isActiveHelpChat = flags[IS_ACTIVE_HELP_CHAT];
  //
  const [messages, setMessages] = useState(null);
  const onCreated = (payload) => {
    setMessages((messages_) => [payload, ...(messages_ || [])]);
  };
  //
  useEffect(() => {
    return () => cli.service("chat").removeListener("created", onCreated);
  }, []);
  //
  useEffect(() => {
    if (false === isLoadingChat) {
      cli.service("chat").on("created", onCreated);
    }
  }, [isLoadingChat]);
  useEffect(() => {
    if (isMounted) {
      cli
        .service("chat")
        .find({
          query: {
            $limit: 1234,
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
  return (
    <>
      <div
        className={`${modcss.bgChat} ${modcss.pageChat} h-full overflow-y-auto scrollbar-thin m-0 p-0`}
      >
        <div className="prose !pb-32">
          <ul className="flex flex-col list-none !text-sm">
            {messages ? (
              messages.map((msg) => (
                <li
                  key={msg._id}
                  className="p-4 rounded-lg shadow bg-slate-50/20 hover:bg-slate-50/50"
                >
                  <div className="flex flex-row items-start">
                    <div className="text-center opacity-40 min-w-max grow-0">
                      <h5>{escapeHtml(msg.author)}</h5>
                      <small className="!text-xs italic">
                        {dateFormated(msg.createdAt)}
                      </small>
                    </div>
                    <article className="px-4 grow">
                      {escapeHtml(msg.text)}
                    </article>
                    <aside className="flex flex-col w-12 text-right">
                      <span>❌</span>
                      <span>👍🏼</span>
                    </aside>
                  </div>
                </li>
              ))
            ) : (
              <div className="flex flex-row justify-center items-center p-12">
                <SpinnerRotatingLines width="122" />
              </div>
            )}
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
    });
    setInput({ text: "" });
  };
  const { toggle: toggleFlags } = useFlags();
  const onChatHelp = () => toggleFlags.on(IS_ACTIVE_HELP_CHAT);
  //
  return (
    <PortalOverlaysEnd>
      <Effect
        isActive={isActiveEffect}
        onEnd={toggleIsActiveEffect.off}
        className="fixed z-20 inset-x-0 bottom-0"
      >
        <motion.div
          key="PageChat"
          style={{
            // $width-right-window[w-7/12] - $width-right-navbar[w-16]
            width: "calc(58.333333% - 4rem)",
          }}
          className="!text-slate-100 absolute bottom-0 right-16 z-10 p-4 !pr-2 bg-gradient-to-b from-slate-900/80 to-slate-900 rounded-tl-2xl"
          initial={{ opacity: 0, x: 56 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex flex-row items-center">
            <div className="text-sm italic opacity-40 min-w-fit grow-0">
              {escapeHtml(user?.displayName || "👤")}
            </div>
            <form onSubmit={prevent(onSubmit)} noValidate className="pl-4 grow">
              <input
                name="text"
                value={inputs.text}
                onChange={sync}
                type="text"
                className="!bg-transparent input-underline"
                placeholder="poruka..."
                autoComplete="off"
              />
            </form>
            <div className="min-w-fit grow-0 flex flex-row gap-0">
              <button
                type="button"
                className="px-8 bg-opacity-20 button !rounded-r-none font-bold"
                onClick={prevent(onSubmit)}
              >
                ok
              </button>
              <button
                onClick={prevent(onChatHelp)}
                type="button"
                className="px-4 bg-opacity-20 button !rounded-l-none"
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
