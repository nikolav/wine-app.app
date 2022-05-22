import React, { useState } from "react";
import modcss from "./PageArticle.module.css";

//
// Import the Slate editor factory.
import {
  createEditor,
  Node,
  Range,
  Transforms,
  Editor,
  Path,
  Text,
  Element as SlateElement,
  Descendant,
} from "slate";
// Import the Slate components and React plugin.
import { Slate, Editable, useSlate } from "slate-react";
////
const PageArticle = () => {

  const editor = useSlate();

  return (
    <div>
      <hr />
      <Editable />
      <hr />
      <pre className="text-xs">{JSON.stringify(editor, null, 2)}</pre>
    </div>
  );
};

export default PageArticle;
