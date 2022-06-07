import React from "react";
// import useStateSwitch from "../../src/hooks/use-state-switch";
// import DrawerBox from "../DrawerBox/DrawerBox";
// import client from "../../src/feathers";
// import useChatNotify from "../../src/hooks/use-chat-notify";
// import Tooltip from "../Tooltip/Tooltip";
// import Panel from "../Panel";

////
////
const HelpPage = () => {
  // const { isOn, toggle } = useStateSwitch();
  //
  return (
    <>
      {/*  */}
      <h2 className="text-center heading-primary">Dobrodošli 👋🏼</h2>
      <div className="md:text-center">
        <button className="px-6 rounded-r-none button">run</button>
        <button className="px-6 rounded-none button">set</button>
        <button className="px-6 rounded-l-none button">ok</button>
      </div>
      <hr />
      <p className="text-center">🚧 --3 🚧</p>
    </>
  );
};

export default HelpPage;
