import React, { useEffect } from "react";
import { bgDashboard, twoCols } from "./HelpPage.module.css";
// import useStateSwitch from "../../src/hooks/use-state-switch";
// import DrawerBox from "../DrawerBox/DrawerBox";
// import cli from "../../src/feathers";
// import useChatNotify from "../../src/hooks/use-chat-notify";
// import Tooltip from "../Tooltip/Tooltip";
// import Panel from "../Panel";
// import Like from "../Like/Like";
import { motion } from "framer-motion";
// import Image from "next/image";
import { useRouter } from "next/router";
//
import {
  useArticles,
  // useWineReview
} from "../../app/store";
import Rotation from "../Rotation/Rotation";
import placeholder01 from "../../public/placeholder01.png";
import { SpinnerRotatingLines } from "../loaders";
import { arrayDivide, shuffle } from "../../src/util";
import Dashboard from "../Dashboard/Dashboard";
import {
  useActions,
  ACTION_DEACTIVATE_IMAGE_MODALS,
} from "../../src/hooks/use-actions-global";

export { bgDashboard };
////
////
const HelpPage = () => {
  // const { isOn, toggle } = useStateSwitch();
  const router = useRouter();
  const { articles } = useArticles();
  const articleChunks = arrayDivide(shuffle(articles || []), 3);
  //
  const onClickArticlePreview = (active) =>
    router.push(`/articles/${active.article._id}`);
  //
  const actions = useActions();
  useEffect(() => {
    actions[ACTION_DEACTIVATE_IMAGE_MODALS]();
  }, []);
  //
  return (
    <div className="h-full">
      <section
        className={`text-white md:grid md:grid-cols-2 h-full gap-px mx-3 -mt-1 ${twoCols}`}
      >
        <div className="overflow-y-hidden ***p-1 h-full md:h-auto bg-gradient-to-b from-black/80 to-black/95 rounded-2xl md:rounded-r-none">
          <section
            className="grid grid-rows-2 h-full gap-1"
            style={{
              gridTemplateRows: "auto 48%",
            }}
          >
            <div className="***bg-red-200/20 overflow-y-auto scrollbar-thin">
              🚧 app under construction
            </div>
            <div className="***bg-green-200/20 !overflow-y-auto scrollbar-thin">
              <Dashboard />
            </div>
          </section>
        </div>
        <div className="p-px hidden md:!block w-48 bg-gradient-to-r from-black/80 to-black/90 rounded-r-2xl ***overflow-hidden">
          <section className="grid grid-rows-3 gap-px h-full">
            <div className="***bg-red-100">
              {articles ? (
                <Rotation
                  className="w-full h-full"
                  timeout={55}
                  nodes={articleChunks[0].map(mkThumb, {
                    classes: "rounded-tr-2xl",
                  })}
                  onClick={onClickArticlePreview}
                />
              ) : (
                <SpinnerThumb />
              )}
            </div>
            <div className="***bg-green-100">
              {articles ? (
                <Rotation
                  className="w-full h-full"
                  timeout={44}
                  nodes={articleChunks[1].map(mkThumb, { classes: "" })}
                  onClick={onClickArticlePreview}
                />
              ) : (
                <SpinnerThumb />
              )}
            </div>
            <div className="***bg-blue-100">
              {articles ? (
                <Rotation
                  className="w-full h-full"
                  timeout={66}
                  nodes={articleChunks[2].map(mkThumb, {
                    classes: "rounded-br-2xl",
                  })}
                  onClick={onClickArticlePreview}
                />
              ) : (
                <SpinnerThumb />
              )}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default HelpPage;
//
//
function mkThumb(article) {
  const { classes } = this;
  return {
    key: article._id,
    article,
    node: (
      <motion.div
        whileHover={{ scale: 1.089 }}
        className={`overflow-hidden hover:shadow-lg absolute hover:z-10 w-full h-full cursor-pointer opacity-90 hover:opacity-100 ${classes}`}
      >
        <img
          className="w-full h-full object-cover object-center block"
          src={article.image || placeholder01.src}
          alt=""
        />
        <small className="p-2 ***truncate text-sm absolute w-full bg-gradient-to-b from-black/50 to-black/70 italic bottom-0 text-center">
          {article.title}
        </small>
      </motion.div>
    ),
  };
}

function SpinnerThumb() {
  return (
    <div className="w-full h-full flex flex-row justify-center items-center">
      <SpinnerRotatingLines />
    </div>
  );
}
