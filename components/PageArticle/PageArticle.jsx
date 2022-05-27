import React from "react";
//
import { useSlate } from "slate-react";
import SlateEditable from "../SlateEditable/SlateEditable";
//
import useSyncInput from "../../src/hooks/use-sync-input";
import Required from "../Required/Required";
import { BiCloudUpload, BsCamera } from "../icons";
////
const PageArticle = () => {
  const editor = useSlate();
  const [sync, input] = useSyncInput({ articleTitle: "" });
  const onSubmit = (evt) => evt.preventDefault();
  //
  return (
    <div>
      <form onSubmit={onSubmit} noValidate className="px-8 mb-8 mt-4">
        <div className="flex flex-row items-center mb-4">
          <Required input={input.articleTitle} />
          <input
            id="articleTitle"
            name="articleTitle"
            type="text"
            onChange={sync}
            value={input.articleTitle}
            placeholder="Naslov..."
            autoComplete="off"
            className="input-underline !pl-4"
          />
        </div>
      </form>
      <SlateEditable editor={editor} height={320} />
    </div>
  );
};

export default PageArticle;
