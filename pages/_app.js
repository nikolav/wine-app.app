import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import AuthContextProvider from "../app/store/auth";
import PageContextProvider from "../app/store/page";
import FlagsProvider from "../src/hooks/use-flags-global";
import GlobalsProvder from "../src/hooks/use-globals";
import SlateEditorProvider from "../components/SlateEditorProvider/SlateEditorProvider";
import { LoaderBars } from "../components/loaders";
import { UserNotificationAuthStateChange } from "../components/UserNotification";
import { QueryProvider } from "../app/providers";
import ArticlesProvider, {
  WineReviewProvider,
  AppDataProvider,
} from "../app/store/resource";
import ActionsContextProvider from "../src/hooks/use-actions-global";
//
import "../styles/globals.css";
import "../styles/build.css";
import "../styles/scrollbars.css";
import "../styles/App.css";
import "../styles/LinkCell.css";
import "../styles/SlideAboutWine.css";
import "../styles/CountriesWines.css";
import "../components/PageWineReview/PageWineReviewInput.css";
//
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
////
////
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
      <GlobalsProvder>
        <FlagsProvider>
          <ActionsContextProvider>
            <QueryProvider>
              <AuthContextProvider>
                <AppDataProvider>
                  <ArticlesProvider>
                    <WineReviewProvider>
                      <SlateEditorProvider>
                        <PageContextProvider>
                          <>
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
                            {/*  */}
                            <UserNotificationAuthStateChange />
                            {/*  */}
                            <LoaderBars />
                          </>
                        </PageContextProvider>
                      </SlateEditorProvider>
                    </WineReviewProvider>
                  </ArticlesProvider>
                </AppDataProvider>
              </AuthContextProvider>
            </QueryProvider>
          </ActionsContextProvider>
        </FlagsProvider>
      </GlobalsProvder>
    </>
  );
}

export default MyApp;
