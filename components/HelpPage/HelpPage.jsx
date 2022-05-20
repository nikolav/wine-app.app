import React, { useState, useEffect } from "react";
import DrawerBox from "../DrawerBox/DrawerBox";
import useStateSwitch from "../../src/hooks/use-state-switch";
//
// import client from "../../src/feathers";
import { TwitterShareButton } from "react-share";
import { RiTwitterLine } from "../icons";
//
//
const HelpPage = () => {
  const [selectedId, setSelectedId] = useState(null);
  const items = [
    {
      id: "a1",
      title: "title - 1",
    },
    {
      id: "a2",
      title: "title - 2",
    },
    {
      id: "a3",
      title: "title - 3",
    },
    {
      id: "a4",
      title: "title - 4",
    },
  ];
  const { isOn, toggle } = useStateSwitch();
  //
  return (
    <>
      <DrawerBox isActive={isOn} onClose={toggle.off}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia
          quis et eius illo labore vero commodi neque, impedit laudantium at id
          nisi ab cumque quisquam recusandae temporibus ex. Atque, maxime.
        </p>
      </DrawerBox>
      <h2 className="text-center heading-primary">Dobrodošli 👋🏼</h2>
      <div className="md:text-center">
        <button onClick={toggle.on} className="px-6 rounded-r-none button">
          run
        </button>
        <button className="px-6 rounded-none button">stop</button>
        <button className="px-6 rounded-l-none button">ok</button>
      </div>
      <hr />
    </>
  );
};

export default HelpPage;

//   "http://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Flag_of_the_United_Nations.svg/2000px-Flag_of_the_United_Nations.svg.png",
//   "http://upload.wikimedia.org/wikipedia/commons/e/e5/IBM_Port-A-Punch.jpg",
//   "http://upload.wikimedia.org/wikipedia/commons/7/7e/Tim_Berners-Lee_CP_2.jpg",
//   "http://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/NewTux.svg/2000px-NewTux.svg.png",
//   "http://upload.wikimedia.org/wikipedia/commons/4/4c/Beekeeper_keeping_bees.jpg",
//   "http://upload.wikimedia.org/wikipedia/commons/9/9a/100607-F-1234S-004.jpg"
