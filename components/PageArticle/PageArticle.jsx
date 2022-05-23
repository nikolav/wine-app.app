import React from "react";
//
import { useSlate } from "slate-react";
import SlateEditable from "../SlateEditable/SlateEditable";
////
const PageArticle = () => {
  const editor = useSlate();
  return (
    <div>
      <SlateEditable editor={editor} height={320} />
    </div>
  );
};

export default PageArticle;
