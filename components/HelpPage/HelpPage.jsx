import React, { useState, useEffect } from "react";
import DrawerBox from "../DrawerBox/DrawerBox";
import useStateSwitch from "../../src/hooks/use-state-switch";
//
// import client from "../../src/feathers";
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
