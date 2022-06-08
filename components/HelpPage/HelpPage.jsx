import React from "react";
import { bgDashboard, twoCols } from "./HelpPage.module.css";
// import useStateSwitch from "../../src/hooks/use-state-switch";
// import DrawerBox from "../DrawerBox/DrawerBox";
// import cli from "../../src/feathers";
// import useChatNotify from "../../src/hooks/use-chat-notify";
// import Tooltip from "../Tooltip/Tooltip";
// import Panel from "../Panel";
import { motion } from "framer-motion";
import Image from "next/image";
import { useArticles } from "../../app/store";
import Rotation from "../Rotation/Rotation";
import placeholder01 from "../../public/placeholder01.png";
// import chunk from "lodash/chunk";
//
export { bgDashboard };
////
////
const HelpPage = () => {
  // const { isOn, toggle } = useStateSwitch();
  const { articles } = useArticles();
  //
  return (
    <div className="h-full">
      <section
        className={`text-white md:grid md:grid-cols-2 h-full gap-px mx-3 -mt-1 ${twoCols}`}
      >
        <div className="h-full md:h-auto bg-gradient-to-b from-black/80 to-black/95 rounded-2xl md:rounded-r-none">
          <strong className="text-4xl">🚧</strong> dobrodošli
        </div>
        <div className="p-px hidden md:!block w-48 bg-gradient-to-r from-black/80 to-black/90 rounded-r-2xl ***overflow-hidden">
          <section className="grid grid-rows-3 gap-px h-full">
            <div className="***bg-red-100">
              {articles ? (
                <Rotation
                  className="w-full h-full"
                  timeout={48}
                  nodes={articles.map(_thumb, { classes: "rounded-tr-2xl" })}
                />
              ) : (
                <LoadingSmall />
              )}
            </div>
            <div className="***bg-green-100">
              {articles ? (
                <Rotation
                  className="w-full h-full"
                  timeout={55}
                  nodes={articles.map(_thumb, { classes: "" })}
                />
              ) : (
                <LoadingSmall />
              )}
            </div>
            <div className="***bg-blue-100">
              {articles ? (
                <Rotation
                  className="w-full h-full"
                  timeout={45}
                  nodes={articles.map(_thumb, { classes: "rounded-br-2xl" })}
                />
              ) : (
                <LoadingSmall />
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
function _thumb(article) {
  const { classes } = this;
  return {
    key: article._id,
    node: (
      <motion.div
        whileHover={{ scale: 1.089 }}
        className={`overflow-hidden hover:shadow-lg absolute hover:z-10 w-full h-full cursor-pointer opacity-90 hover:opacity-100 ${classes}`}
      >
        <Image
          layout="fill"
          className="object-cover object-center block"
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
//
function LoadingSmall() {
  return <small className="text-xs">loading...</small>;
}
