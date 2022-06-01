import React from "react";
import modcss from "./InputWineReviewRangeSlider.module.css";
import { useGlobals, INPUT_WINE_REVIEW } from "../../src/hooks/use-globals";

const InputWineReviewRangeSlider = ({
  title,
  name,
  stopValues = { 1: "Nizak", 2: "Srednji", 3: "Visok" },
  max = "3",
}) => {
  const globals = useGlobals();
  const wineReview = globals(INPUT_WINE_REVIEW);
  //
  const onInput = (evt) => {
    const value = evt?.target?.value;
    globals.set(INPUT_WINE_REVIEW, {
      ...wineReview,
      [name]: value,
    });
  };
  ////
  ////
  return (
    <div className="w-full m-0 p-0">
      {/* TITLE */}
      <div className="flex flex-row items-center justify-between px-1">
        <small className="text-xs italic opacity-60">{title}</small>
        <strong className="text-xs opacity-80 font-bold">
          {stopValues[wineReview[name]]}
        </strong>
      </div>
      {/* SLIDER */}
      <div className="!relative">
        {/* STOPS */}
        <div className="relative z-10 -mx-[2px] flex flex-row justify-between">
          {Array.from(".".repeat(parseInt(max))).map((dot, i) => (
            <span key={stopValues[i + 1]} className="text-2xl opacity-20">
              •
            </span>
          ))}
        </div>
        {/* RANGE */}
        <input
          type="range"
          name={name}
          min="1"
          max={max}
          step="1"
          defaultValue={wineReview[name] || 1}
          className={`top-1/2 translate-y-[1px] absolute z-20 !duration-100 !transition-opacity appearance-none w-full h-px rounded-sm outline-none opacity-80 hover:opacity-90 active:opacity-100 bg-slate-300 ${modcss.sliderThumb}`}
          onInput={onInput}
        />
      </div>
    </div>
  );
};

export default InputWineReviewRangeSlider;
