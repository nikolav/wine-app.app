import React, { useState, useContext } from "react";

import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import HelpPage from "../../components/HelpPage/HelpPage";
import SlideAboutWine from "../../components/SlideAboutWine/SlideAboutWine";
import PageItalyWine from "../../components/PageItalyWine/PageItalyWine";
import PageFrenchWine from "../../components/PageFrenchWine/PageFrenchWine";
import PageSpanishWine from "../../components/PageSpanishWine/PageSpanishWine";
import PageUsaWine from "../../components//PageUsaWine/PageUsaWine";

export const PAGE_LOGIN = "login";
export const PAGE_REGISTER = "register";
export const PAGE_HELP = "help";
export const PAGE_ABOUT_WINE = "about";
export const PAGE_ITALY_WINE = "italy";
export const PAGE_FRENCH_WINE = "france";
export const PAGE_SPANISH_WINE = "spain";
export const PAGE_USA_WINE = "usa";

export const pages = {
  [PAGE_LOGIN]: LoginForm,
  [PAGE_REGISTER]: RegisterForm,
  [PAGE_HELP]: HelpPage,
  [PAGE_ABOUT_WINE]: SlideAboutWine,
  [PAGE_ITALY_WINE]: PageItalyWine,
  [PAGE_FRENCH_WINE]: PageFrenchWine,
  [PAGE_SPANISH_WINE]: PageSpanishWine,
  [PAGE_USA_WINE]: PageUsaWine,
};

export const PageContext = React.createContext();
export const usePages = () => useContext(PageContext);

const initialPage = PAGE_HELP;

export default function PageContextProvider({ children }) {
  const [page, setPage] = useState((_) => ({
    key: initialPage,
    content: pages[initialPage],
  }));

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
