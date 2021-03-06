import { createContext, useContext, useState } from "react";
import { has } from "../../src/util";

export const GlobalsContext = createContext();
export const useGlobals = () => useContext(GlobalsContext);
//
// export global var names here
export const ARTICLE_DATA = "articleData.yziiviptyxm";
export const ARTICLE_IMAGE_SHOW = "articleImageShow.xbucqjgrcyp";
export const ARTICLE_IMAGE_DOWNLOAD_URL = "articleImageDownloadUrl.satoirpdmsy";
export const ARTICLE_ONSAVE = "articleOnSave.fhxcetnlgss";
export const ARTICLE_DBSAVE = "articleDBSave.ywhrpmeliai";
export const ARTICLE_TITLE_CACHED = "articleTitleCached.wuireunyrdm";
export const ARTICLE_SAVED = "articleSaved.kdbyzlmousj";
export const ARTICLE_IMAGE_FILE = "articleImageFile.hbpxohfahcm";
export const ARTICLE_IMAGE_DATAURL = "articleImageDataUrl.camxpqjjqjw";
export const INPUT_WINE_REVIEW = "inputWineReview.mxhuqbjfyug";
export const WINE_REVIEW_IMAGE_FILE = "wineReview.imageFile.rqemlebeibh";
export const WINE_REVIEW_IMAGE_DATAURL = "wineReview.dataUrl.jcowrbazcva";
export const WINE_REVIEW_IMAGE_SHOW = "wineReview.imageShow.ttzazmhgoex";
export const WINE_REVIEW_ONSAVE = "wineReview.onSave.ejxhasrqalx";
export const STAR_RATING = "starRating.fxlepypdqsq";
// collects wr-input-data for storing
export const WR_RECORD = "wr.record.xbicntewgqh";
// trigger db.save @change
export const WR_DBSAVE = "WR.dbSave.mecqgnjgtqp";
export const WR_SAVED = "WR.dbSaved.twrkwvrzhri";
// store id from /winereview for display..
export const WR_IS_PREVIEW = "WR.isPreview.qxohswptaic";
export const WR_IS_PREVIEW_ID = "WR.isPreview.ID.bhgzranfqtq";
// store active dashboard post id
export const DASHBOARD_ENTRY_ACTIVE_POST = "dashboardEntryActivePost.gnktkobglqd";
// selected post to edit
export const DASHBOARD_ENTRY_ACTIVE_POST_EDIT = "editPost.cxvgnwwisjw";
// signals image is from db
// prevents modal open when image is set in .useEffect in PageArtcle
export const ARTICLE_IMAGE_EDIT = "articelImageEdit.qfzacaqyghl";
export const DEACTIVATE_ARTICLE_TOOLTIP_TRASH = "umrybgeisnoatmhtrdsznxjgpbqozmsg";
//
export const TEST_VALUES = "rqmdabjiqpldolzgimpswa";
//

//
// GLOBAL_FILE
// GLOBAL_DATAURL

////
////
export default function GlobalsProvder({ children }) {
  const [globals, setGlobals] = useState({
    [TEST_VALUES]: {},
    //
    [INPUT_WINE_REVIEW]: {},
    [STAR_RATING]: {},
    [WR_RECORD]: {},
  });
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
