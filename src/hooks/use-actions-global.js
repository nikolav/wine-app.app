import { createContext, useContext } from "react";
// import { noop } from "../util";
import { useGlobals, DEACTIVATE_ARTICLE_TOOLTIP_TRASH } from "./use-globals";
import { useFlags, IS_ARTICLE_IMAGE_DATAURL } from "./use-flags-global";
//
export const ActionsContext = createContext();
export const useActions = () => useContext(ActionsContext);
//
export const ACTION_DEACTIVATE_ARTICLE_TOOLTIP_TRASH =
  "dnmahizetubvemgsegbjkqarvdhbbcjw";
export const ACTION_DEACTIVATE_IMAGE_MODALS =
  "osiolfnlymbgbxivyuwmyprwyrmyofbv";
//

export default function ActionsContextProvider({ children }) {
  const globals = useGlobals();
  const { toggle: toggleFlags } = useFlags();
  //
  const valueActions = {
    [ACTION_DEACTIVATE_ARTICLE_TOOLTIP_TRASH]: () =>
      globals.set(DEACTIVATE_ARTICLE_TOOLTIP_TRASH, Date.now()),
    [ACTION_DEACTIVATE_IMAGE_MODALS]: () =>
      toggleFlags.off(IS_ARTICLE_IMAGE_DATAURL),
  };
  //
  return (
    <ActionsContext.Provider value={valueActions}>
      {children}
    </ActionsContext.Provider>
  );
}
