import React from "react";
import DrawerBox from "../DrawerBox/DrawerBox";
import useStateSwitch from "../../src/hooks/use-state-switch";
// import client from "../../src/feathers";
// import useChatNotify from "../../src/hooks/use-chat-notify";
// import Tooltip from "../Tooltip/Tooltip";

////
////
const HelpPage = () => {
  const { isOn, toggle } = useStateSwitch();
  //
  return (
    <>
      <DrawerBox isActive={isOn} onClose={toggle.off}>
        <div>
          <h2>under construction 🚧</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Necessitatibus inventore, quaerat odio deleniti ea pariatur
            molestiae debitis quis rem dolore nobis saepe quisquam autem,
            repellat consequuntur. Exercitationem nihil in delectus eveniet
            perspiciatis aliquam ex omnis fuga modi ad, nulla molestias cum
            veniam, fugiat quis assumenda voluptate ullam! Laborum sequi
            possimus officiis sed autem, temporibus fugit.
          </p>
        </div>
      </DrawerBox>
      {/*  */}
      <h2 className="text-center heading-primary">Dobrodošli 👋🏼</h2>
      <div className="md:text-center">
        <button onClick={toggle.on} className="px-6 rounded-r-none button">
          run
        </button>
        <button className="px-6 rounded-none button">set</button>
        <button className="px-6 rounded-l-none button">ok</button>
      </div>
      <hr />
      <p className="prose text-center">
        <h2>🚧 app is under construction --77</h2>
      </p>
    </>
  );
};

export default HelpPage;

/*


*/
