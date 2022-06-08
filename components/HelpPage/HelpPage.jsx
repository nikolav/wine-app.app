import React, { useEffect } from "react";
import { bgDashboard, twoCols } from "./HelpPage.module.css";
// import useStateSwitch from "../../src/hooks/use-state-switch";
// import DrawerBox from "../DrawerBox/DrawerBox";
// import cli from "../../src/feathers";
// import useChatNotify from "../../src/hooks/use-chat-notify";
// import Tooltip from "../Tooltip/Tooltip";
// import Panel from "../Panel";
import { useArticles } from "../../app/store";
////
export { bgDashboard };
////
const HelpPage = () => {
  // const { isOn, toggle } = useStateSwitch();
  const { articles } = useArticles();
  //
  //
  return (
    <div className="h-full">
      <section
        className={`text-white md:grid md:grid-cols-2 h-full gap-px mx-3 -mt-1 ${twoCols}`}
      >
        <div className="h-full md:h-auto bg-gradient-to-b from-black/80 to-black/95 rounded-2xl md:rounded-r-none">
          1
        </div>
        <div className="hidden md:!block w-48 bg-gradient-to-r from-black/80 to-black/90 rounded-r-2xl">
          {null != articles ? (
            <ul>
              {articles.map((article) => (
                <li key={article._id}>{article.title}</li>
              ))}
            </ul>
          ) : (
            <small>loading...</small>
          )}
        </div>
      </section>
    </div>
  );
};

export default HelpPage;
//
