import React from "react";
import { bgDashboard, twoCols } from "./HelpPage.module.css";
// import useStateSwitch from "../../src/hooks/use-state-switch";
// import DrawerBox from "../DrawerBox/DrawerBox";
// import cli from "../../src/feathers";
// import useChatNotify from "../../src/hooks/use-chat-notify";
// import Tooltip from "../Tooltip/Tooltip";
// import Panel from "../Panel";
import { useArticles } from "../../app/store";
import { chunk } from "lodash";
import Rotation from "../Rotation/Rotation";

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
          <Rotation
            nodes={[
              {
                key: 1,
                node: (
                  <div className="w-96 h-96 bg-red-100">
                    Lorem
                  </div>
                ),
              },
              {
                key: 2,
                node: (
                  <div className="w-96 h-96 bg-green-100">
                    Aspernatur
                  </div>
                ),
              },
              {
                key: 3,
                node: (
                  <div className="w-96 h-96 bg-blue-100">
                    exercitationem
                  </div>
                ),
              },
            ]}
          />
        </div>
        <div className="hidden md:!block w-48 bg-gradient-to-r from-black/80 to-black/90 rounded-r-2xl ***overflow-hidden">
          <small>122.333</small>
          {/* <Articles articles={articles} /> */}
        </div>
      </section>
    </div>
  );
};

export default HelpPage;
//

function Articles({ articles }) {
  //
  return null != articles ? (
    chunk(articles, articles.length % 3).map((articles_, i) => (
      <div key={i}>
        <ArticlesPreview articles={articles_} />
      </div>
    ))
  ) : (
    <small>loadig...</small>
  );
}
function Article({ article }) {
  return <div className="bg-blue-100/50">{article.title}</div>;
}
function ArticlesPreview({ articles = [] }) {}
