import { createContext, useContext, useState } from "react";
import { has } from "../../src/util";

export const GlobalsContext = createContext();
export const useGlobals = () => useContext(GlobalsContext);
//
// export global var names here
export const ARTICLE_DATA = "articleData.yziiviptyxm";
export const ARTICLE_IMAGE_DATAURL = "articleImageDataUrl.camxpqjjqjw";
export const ARTICLE_IMAGE_FILE = "articleImageFile.hbpxohfahcm";
export const ARTICLE_IMAGE_SHOW = "articleImageShow.xbucqjgrcyp";
export const ARTICLE_IMAGE_DOWNLOAD_URL = "articleImageDownloadUrl.satoirpdmsy";
export const ARTICLE_ONSAVE = "articleOnSave.fhxcetnlgss";
export const ARTICLE_DBSAVE = "articleDBSave.ywhrpmeliai";
export const ARTICLE_TITLE_CACHED = "articleTitleCached.wuireunyrdm";
export const ARTICLE_SAVED = "articleSaved.kdbyzlmousj";
export const INPUT_WINE_COLOR_ACTIVE = "inputWineColorActive.fgojnhfvgrd";
////
////
export default function GlobalsProvder({ children }) {
  const [globals, setGlobals] = useState({});
  const cp_ = () => ({ ...globals });
  //
  const value = (name) => globals[name];
  value.set = (name, value) =>
    setGlobals((current) => ({ ...current, [name]: value }));
  value.has = (name) => has(globals, name);
  value.rm = (name) => {
    const cp = cp_();
    delete cp[name];
    setGlobals(cp);
  };
  value.ls = () => Object.keys(globals);
  //
  return (
    <GlobalsContext.Provider value={value}>{children}</GlobalsContext.Provider>
  );
}
