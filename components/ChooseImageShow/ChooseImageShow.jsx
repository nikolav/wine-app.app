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
const ChooseImageShow = ({
  children,
  //
  GLOBAL_DATAURL = ARTICLE_IMAGE_DATAURL,
  GLOBAL_IMAGE_SHOW = ARTICLE_IMAGE_SHOW,
}) => {
  //
  const globals = useGlobals();
  const imageDataUrl = globals(GLOBAL_DATAURL);
  const imageDataUrlShow = globals(GLOBAL_IMAGE_SHOW);
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
      <div className="grid grid-cols-12 h-full">
        <div className="col-span-6 h-full">
          <img
            className="block mx-auto object-cover h-full"
            src={imageDataUrl}
            alt=""
          />
        </div>
        <div className="col-span-6 prose">
          <div className="h-full !text-center flex flex-col items-center justify-around">
            {children}
            <button onClick={toggle.off} className="button px-6">
              ok, hvala
            </button>
          </div>
        </div>
      </div>
    </ModalBox>
  );
};

export default ChooseImageShow;
