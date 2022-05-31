import React, { useState, useEffect } from "react";
import DrawerBox from "../DrawerBox/DrawerBox";
import useStateSwitch from "../../src/hooks/use-state-switch";
// import client from "../../src/feathers";
// import  { useFlags, IS_PROCESSING_ARTICLE_SAVE } from "../../src/hooks/use-flags-global";
//
const HelpPage = () => {
  const { isOn, toggle } = useStateSwitch();
  // const { toggle: toggleIsProcessing } = useFlags();
  //
  return (
    <>
      <DrawerBox isActive={isOn} onClose={toggle.off}>
        <h2>🚧🚧🚧 under construction</h2>
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
          // onClick={(evt) => toggleIsProcessing(IS_PROCESSING_ARTICLE_SAVE)}
          className="px-6 rounded-none button"
        >
          set
        </button>
        <button className="px-6 rounded-l-none button">ok</button>
      </div>
      <hr />
      <p className="prose">
        <h2>🚧 app is under construction</h2>
        <h4>@TODOS:</h4>
        <br /> • 👤 user dashboard @1st page; info, links, help, etc.
        <br /> • 📱 mobile/small-screen setup
        <br /> • 🔍 search/read articles feature
        <br /> • ⭐ wine-review backend
        <br /> • 🗨 message management @chat; msg.delete, msg.like
        <br /> • 📰 more articles about wine
        <br /> • 👍🏼 like feature for user posted articles
        <br /> • ❔ app help drawer-boxes
        <br /> • 🙋🏼‍♂️ user welcome @login.success
        <br /> 💬 feel free to message me on chat
      </p>
    </>
  );
};

export default HelpPage;
