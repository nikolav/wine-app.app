import React, { useState, useEffect } from "react";
import DrawerBox from "../DrawerBox/DrawerBox";
import useStateSwitch from "../../src/hooks/use-state-switch";
// import client from "../../src/feathers";
import { useFlags, IS_PROCESSING_ARTICLE_SAVE } from "../../src/hooks/use-flags-global";
//
const HelpPage = () => {
  const { isOn, toggle } = useStateSwitch();
  const { flags, toggle: toggleIsProcessing } = useFlags();
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
      {/*  */}
      <h2 className="text-center heading-primary">Dobrodošli 👋🏼</h2>
      <div className="md:text-center">
        <button onClick={toggle.on} className="px-6 rounded-r-none button">
          run
        </button>
        <button
        onClick={evt=> toggleIsProcessing(IS_PROCESSING_ARTICLE_SAVE)}
        className="px-6 rounded-none button">set</button>
        <button
        className="px-6 rounded-l-none button">ok</button>
      </div>
      <hr />
      <p className="prose">
        🚧 app is under construction 👷🏼‍♂️
        <br /> @todo - implement user content dashboard
        <br />
        @todo - display articles; filmstrip bottom
      </p>
    </>
  );
};

export default HelpPage;
