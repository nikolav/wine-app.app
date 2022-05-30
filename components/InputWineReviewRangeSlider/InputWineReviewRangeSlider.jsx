import React from "react";
import modcss from "./InputWineReviewRangeSlider.module.css";
import { useGlobals, INPUT_WINE_REVIEW } from "../../src/hooks/use-globals";

const InputWineReviewRangeSlider = ({ title, name, max = "3" }) => {
  const globals = useGlobals();
  const wineReview = globals(INPUT_WINE_REVIEW);
  //
  const onInput = (evt) => {
    globals.set(INPUT_WINE_REVIEW, {
      ...wineReview,
      [name]: evt?.target?.value,
    });
  };
  ////
  ////
  return (
    <div className="**slidecontainer w-full m-0 p-0">
      <div className="flex flex-row items-center justify-between px-2">
        <small className="text-xs italic opacity-50">{title}</small>
        <small className="text-xs opacity-75">{title}</small>
      </div>
      <input
        type="range"
        name={name}
        min="1"
        max={max}
        step="1"
        defaultValue={1}
        className={`**slider ${modcss.sliderThumb} !duration-100 !transition-opacity appearance-none w-full h-px rounded-sm outline-none opacity-80 hover:opacity-90 active:opacity-100 bg-slate-300`}
        onInput={onInput}
      />
    </div>
  );
};

export default InputWineReviewRangeSlider;
