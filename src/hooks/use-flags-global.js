import { createContext, useContext, useState } from "react";
import { has } from "../util";

const FlagsContext = createContext();

export const useFlags = () => useContext(FlagsContext);
//
// export gloabal flags
export const IS_PROCESSING = "appIsProcessing.cebgtbefrpc";
export const IS_PROCESSING_ARTICLE_SAVE =
  "appIsProcessing.articleSave.hozbaqpeshv";
export const IS_ACTIVE_SHARING = "isActiveSharing.ngndyesnhxx";
export const IS_ACTIVE_ARTICLE_COMMANDS = "isActiveArticleCmd.bypgsakbkxq";
export const IS_LOADING_CHAT = "isLoading.Chat.mxxhzbcesjh";
//
export default function FlagsProvider({ children }) {
  const [flags, setFlags] = useState({
    [IS_LOADING_CHAT]: true,
  });

  const toggle = (flag) => {
    if (has(flags, flag)) {
      setFlags((f) => ({ ...f, [flag]: !f[flag] }));
    } else {
      toggle.on(flag);
    }
  };

  toggle.on = (flag) => {
    setFlags((f) => ({ ...f, [flag]: true }));
  };
  toggle.off = (flag) => {
    setFlags((f) => ({ ...f, [flag]: false }));
  };

  const value = { flags, toggle };

  return (
    <FlagsContext.Provider value={value}>{children}</FlagsContext.Provider>
  );
  //
}
