import React from "react";
import { bgDashboard, twoCols } from "./HelpPage.module.css";
// import useStateSwitch from "../../src/hooks/use-state-switch";
// import DrawerBox from "../DrawerBox/DrawerBox";
// import cli from "../../src/feathers";
// import useChatNotify from "../../src/hooks/use-chat-notify";
// import Tooltip from "../Tooltip/Tooltip";
// import Panel from "../Panel";
import { useArticles } from "../../app/store";
import Rotation from "../Rotation/Rotation";

////
export { bgDashboard };
////
const HelpPage = () => {
  // const { isOn, toggle } = useStateSwitch();
  const { articles } = useArticles();
  //
  //
  console.log(articles);
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
            <div className="bg-red-100">
              <Rotation
                className="w-full h-full"
                timeout={22}
                nodes={[
                  {
                    key: "g.1",
                    node: <div className="bg-red-400 w-full h-full">events.--1</div>,
                  },
                  {
                    key: "g.2",
                    node: <div className="bg-red-600 w-full h-full">events.2</div>,
                  },
                  {
                    key: "g.3",
                    node: <div className="bg-red-800 w-full h-full">events.3</div>,
                  },
                ]}
              />
            </div>
            <div className="bg-green-100">
              <Rotation
                className="w-full h-full"
                timeout={12}
                nodes={[
                  {
                    key: "g.1",
                    node: (
                      <div className="bg-green-400 w-full h-full">wine.1</div>
                    ),
                  },
                  {
                    key: "g.2",
                    node: (
                      <div className="bg-green-600 w-full h-full">wine.2</div>
                    ),
                  },
                  {
                    key: "g.3",
                    node: (
                      <div className="bg-green-800 w-full h-full">wine.3</div>
                    ),
                  },
                ]}
              />
            </div>
            <div className="bg-blue-100">
              <Rotation
                className="w-full h-full"
                timeout={17}
                nodes={[
                  {
                    key: "g.1",
                    node: (
                      <div className="bg-blue-400 w-full h-full">info.1</div>
                    ),
                  },
                  {
                    key: "g.2",
                    node: (
                      <div className="bg-blue-600 w-full h-full">info.2</div>
                    ),
                  },
                  {
                    key: "g.3",
                    node: (
                      <div className="bg-blue-800 w-full h-full">info.3</div>
                    ),
                  },
                ]}
              />
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default HelpPage;
//
