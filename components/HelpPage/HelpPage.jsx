import React, { useState, useEffect } from "react";
import DrawerBox from "../DrawerBox/DrawerBox";
import useStateSwitch from "../../src/hooks/use-state-switch";
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
      <h2 className="heading-primary text-center">Dobrodošli 👋🏼</h2>
      <div className="md:text-center">
        <button onClick={toggle.on} className="button rounded-r-none px-6">
          run
        </button>
        <button className="button rounded-none px-6">stop</button>
        <button className="button rounded-l-none px-6">ok</button>
      </div>
      <hr />
      <article className="prose px-4">
        <h2>Lorem, ipsum dolor.</h2>
        <p className="lead">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod alias
          architecto dicta corporis aspernatur.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod alias
          architecto dicta corporis aspernatur. Alias tempore corporis maiores
          officiis vel doloribus in!
        </p>
        <figure>
          <blockquote>
            <p>A well-known quote, contained in a blockquote element.</p>
          </blockquote>
          <figcaption className="text-right">
            Someone famous in <cite title="Source Title">Source Title</cite>
          </figcaption>
        </figure>
      </article>
    </>
  );
};

export default HelpPage;
