import React, { useEffect } from "react";
import {
  useGlobals,
  ARTICLE_IMAGE_DATAURL,
  ARTICLE_IMAGE_SHOW,
} from "../../src/hooks/use-globals";
import ModalBox from "../ModalBox";
import useStateSwitch from "../../src/hooks/use-state-switch";
//
//
const PageArticleHandleImageDisplay = () => {
  //
  const globals = useGlobals();
  const imageDataUrl = globals(ARTICLE_IMAGE_DATAURL);
  const imageDataUrlShow = globals(ARTICLE_IMAGE_SHOW);
  const { isOn, toggle } = useStateSwitch();
  //
  useEffect(() => {
    if (imageDataUrl || imageDataUrlShow) toggle.on();
    //
    return toggle.off;
  }, [imageDataUrl, imageDataUrlShow]);
  //
  return (
    <ModalBox isOpen={isOn} onClose={toggle.off}>
      <div className="grid grid-cols-12 **bg-yellow-500 h-full">
        <div className="col-span-6 **bg-red-500 h-full">
          <img
            className="block mx-auto object-cover h-full"
            src={imageDataUrl}
            alt=""
          />
        </div>
        <div className="col-span-6 prose">
          <div className="h-full !text-center flex flex-col items-center justify-around">
            <article>
              <strong className="text-2xl">👈🏼👏🏼</strong>
              <br />
              <strong className="text-2xl">👍🏼</strong> Izabrali ste ovu sliku.
              <br />
              Biće postavljena kada sačuvate članak.
              <br />
              <strong className="text-2xl">🍾🥳</strong>
            </article>
            <button onClick={toggle.off} className="button px-6">
              ok, hvala
            </button>
          </div>
        </div>
      </div>
    </ModalBox>
  );
};

export default PageArticleHandleImageDisplay;
