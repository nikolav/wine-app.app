import React, { useEffect, useState } from "react";
import { bgDashboard, twoCols } from "./HelpPage.module.css";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useArticles, useWineReview } from "../../app/store";
import Rotation from "../Rotation/Rotation";
import placeholder01 from "../../public/placeholder01.png";
import { SpinnerRotatingLines } from "../loaders";
import { arrayDivide, shuffle, postType } from "../../src/util";
import Dashboard from "../Dashboard/Dashboard";
import {
  useActions,
  ACTION_DEACTIVATE_IMAGE_MODALS,
} from "../../src/hooks/use-actions-global";
import useIsMounted from "../../src/hooks/use-is-mounted";

export { bgDashboard };
////
////
const HelpPage = () => {
  const router = useRouter();
  const isMounted = useIsMounted();
  const { articles } = useArticles();
  const { winereview } = useWineReview();
  const [slides, setSlides] = useState(null);
  const getSlides = () => arrayDivide(shuffle([...articles, ...winereview]), 3);
  useEffect(() => {
    if (isMounted && articles && winereview) setSlides(getSlides());
    //
  }, [isMounted, articles, winereview]);
  //
  const onClickArticlePreview = ({ post }) => {
    router.push(`/${postType(post)}/${post._id}`);
  };
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
            <div className="overflow-y-auto scrollbar-thin">
              <AppWelcome />
            </div>
            {/*  */}
            <div className="!overflow-y-auto scrollbar-thin">
              <Dashboard />
            </div>
          </section>
        </div>
        <div className="p-px hidden md:!block w-48 bg-gradient-to-r from-black/80 to-black/90 rounded-r-2xl ***overflow-hidden">
          {/*  */}
          {/* slides x3 */}
          <section className="grid grid-rows-3 gap-px h-full">
            <div>
              {slides ? (
                <Rotation
                  className="w-full h-full"
                  timeout={55}
                  nodes={slides[0].map(mkThumb, {
                    classes: "rounded-tr-2xl",
                  })}
                  onClick={onClickArticlePreview}
                />
              ) : (
                <SpinnerThumb />
              )}
            </div>
            <div>
              {slides ? (
                <Rotation
                  className="w-full h-full"
                  timeout={44}
                  nodes={slides[1].map(mkThumb, { classes: "" })}
                  onClick={onClickArticlePreview}
                />
              ) : (
                <SpinnerThumb />
              )}
            </div>
            <div>
              {slides ? (
                <Rotation
                  className="w-full h-full"
                  timeout={66}
                  nodes={slides[2].map(mkThumb, {
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
function AppWelcome () {
  return <section id="--rugnudqihpl">🚧 under construction</section>;
}
//
function mkThumb(post) {
  const { classes } = this;
  return {
    key: post._id,
    post,
    node: (
      <motion.div
        whileHover={{ scale: 1.089 }}
        className={`overflow-hidden hover:shadow-lg absolute hover:z-10 w-full h-full cursor-pointer opacity-90 hover:opacity-100 ${classes}`}
      >
        <img
          className="w-full h-full object-cover object-center block"
          src={post.image || placeholder01.src}
          alt=""
        />
        <small className="p-2 ***truncate text-sm absolute w-full bg-gradient-to-b from-black/50 to-black/70 italic bottom-0 text-center">
          {post.wine || post.title}
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
