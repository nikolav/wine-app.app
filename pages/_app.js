import Head from "next/head";
import AuthContextProvider from "../app/store/auth";
import PageContextProvider from "../app/store/page";
import FlagsProvider from "../src/hooks/use-flags-global";

import { motion, AnimatePresence } from "framer-motion";
const variants = {
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: 12,
    transition: {
      duration: 0.12,
    },
  },
};

import "../styles/globals.css";
import "../styles/build.css";
import "../styles/App.css";
import "../styles/LinkCell.css";
import "../styles/scrollbars.css";
import "../styles/SlideAboutWine.css";
import "../styles/CountriesWines.css";

// used in ListReorder
// import "../styles/style.css";

function MyApp({ Component, pageProps, router }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>wine app</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, shrink-to-fit=no, minimum-scale=1"
        />
        <meta
          name="description"
          content="Nikola Vuković is a web developer from Mladenovac, Serbia. He has 5+ years of experience with fullstack web development with a focus on user interfaces, ineraction and data modeling. In his spare time, Nikola Vuković does languages, modern technologies, gymnastics, wine&amp;spirits, bookkeeping, accounting, history, arts, positive life habits, astrology&amp;tarot, dating, travel, time management, resource planing, logistics, design, and more. Никола Вуковић је веб програмер из Младеновца у Србији. Има 5+ година искуства са фуллстак веб развојем са фокусом на кориснички интерфејс и моделирање података. У слободно време Никола Вуковић бави се језицима, савременим технологијама, гимнастиком, вином и жестоким пићима, пословном анализом, вођењем књига, креирањем пословних планова, рачуноводством, астрологијом и таротом, историјом, уметношћу, позитивним животним навикама, забављањем, путовањима, управљањем временом, планирањем ресурса, логистиком, дизајном. admin@nikolav.rs"
        />
      </Head>
      <FlagsProvider>
        <AuthContextProvider>
          <PageContextProvider>
            <AnimatePresence exitBeforeEnter initial={false}>
              <motion.div
                key={router.route}
                initial="out"
                animate="in"
                exit="out"
                variants={variants}
              >
                <Component {...pageProps} />
              </motion.div>
            </AnimatePresence>
          </PageContextProvider>
        </AuthContextProvider>
      </FlagsProvider>
    </>
  );
}

export default MyApp;