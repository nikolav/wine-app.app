import React, { useState, useContext } from "react";

import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import SlideAboutWine from "../../components/SlideAboutWine/SlideAboutWine";
import PageItalyWine from "../../components/PageItalyWine/PageItalyWine";
import PageFrenchWine from "../../components/PageFrenchWine/PageFrenchWine";
import PageSpanishWine from "../../components/PageSpanishWine/PageSpanishWine";
import PageUsaWine from "../../components/PageUsaWine/PageUsaWine";
import PageArticle from "../../components/PageArticle/PageArticle";
import PageChat from "../../components/PageChat/PageChat";
import PageWineReview from "../../components/PageWineReview/PageWineReview";
import PageSearch from "../../components/PageSearch/PageSearch";
import HelpPage from "../../components/HelpPage/HelpPage";
//
export const PAGE_LOGIN = "login";
export const PAGE_REGISTER = "register";
export const PAGE_HELP = "help";
export const PAGE_ABOUT_WINE = "about";
export const PAGE_ITALY_WINE = "italy";
export const PAGE_FRENCH_WINE = "france";
export const PAGE_SPANISH_WINE = "spain";
export const PAGE_USA_WINE = "usa";
export const PAGE_ARTICLE_CREATE = "article-create";
export const PAGE_ARTICLE_EDIT = "article-edit";
export const PAGE_CHAT = "page-chat.glcrpkbgcem";
export const PAGE_WINE_REVIEW = "page-wine-review.jkttzwxwwqy";
export const PAGE_WINE_REVIEW_EDIT = "page-wine-review.edit.hvpedgdshvv";
export const PAGE_WINE_REVIEW_PREVIEW = "page-wine-review.preview.uembosfcsqb";
export const PAGE_SEARCH = "page-search.gqgkqpklfih";
//
export const pages = {
  [PAGE_LOGIN]: LoginForm,
  [PAGE_REGISTER]: RegisterForm,
  [PAGE_HELP]: HelpPage,
  [PAGE_ABOUT_WINE]: SlideAboutWine,
  [PAGE_ITALY_WINE]: PageItalyWine,
  [PAGE_FRENCH_WINE]: PageFrenchWine,
  [PAGE_SPANISH_WINE]: PageSpanishWine,
  [PAGE_USA_WINE]: PageUsaWine,
  [PAGE_ARTICLE_CREATE]: PageArticle,
  [PAGE_ARTICLE_EDIT]: PageArticle,
  [PAGE_CHAT]: PageChat,
  [PAGE_WINE_REVIEW]: PageWineReview,
  [PAGE_WINE_REVIEW_EDIT]: PageWineReview,
  [PAGE_WINE_REVIEW_PREVIEW]: PageWineReview,
  [PAGE_SEARCH]: PageSearch,
};

export const PageContext = React.createContext();
export const usePages = () => useContext(PageContext);

const initialPage = PAGE_HELP;

export default function PageContextProvider({ children }) {
  const [page, setPage] = useState({
    key: initialPage,
    content: pages[initialPage],
  });

  const pageValue = {
    page,
    setPage: setPage_,
  };
  return (
    <PageContext.Provider value={pageValue}>{children}</PageContext.Provider>
  );

  //
  function setPage_(name) {
    if (name in pages)
      setPage({
        key: name,
        content: pages[name],
      });
  }
}
