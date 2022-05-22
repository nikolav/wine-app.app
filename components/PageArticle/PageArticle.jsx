import React from "react";
//
import { useSlate } from "slate-react";
import SlateEditable from "../SlateEditable/SlateEditable";
////
const PageArticle = () => {
  const editor = useSlate();
  return (
    <div>
      <div className="border-4 border-gray-50 border-t-0 mx-4 rounded-lg overflow-hidden">
        <SlateEditable editor={editor} />
      </div>
    </div>
  );
};

export default PageArticle;
