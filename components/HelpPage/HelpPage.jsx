import React from "react";
import { bg01 } from "./HelpPage.module.css";
// import useStateSwitch from "../../src/hooks/use-state-switch";
// import DrawerBox from "../DrawerBox/DrawerBox";
// import cli from "../../src/feathers";
// import useChatNotify from "../../src/hooks/use-chat-notify";
// import Tooltip from "../Tooltip/Tooltip";
// import Panel from "../Panel";

////
export { bg01 };
////
const HelpPage = () => {
  // const { isOn, toggle } = useStateSwitch();
  // const [data, setData] = useState(null);
  //
  return (
    <div className="h-full">
      <section
        style={{
          gridTemplateColumns: "1fr auto",
        }}
        className="grid grid-cols-2 h-full gap-px mx-3 -mt-1"
      >
        <div className="bg-black/80 rounded-l-2xl">1</div>
        <div className="w-48 bg-black/80 rounded-r-2xl">2</div>
      </section>
    </div>
  );
};

export default HelpPage;
//
