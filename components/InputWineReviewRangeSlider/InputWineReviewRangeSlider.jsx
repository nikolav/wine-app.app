import React from "react";
import modcss from "./InputWineReviewRangeSlider.module.css";

const InputWineReviewRangeSlider = ({
  name = "range-1",
}) => {
  const onInput = (evt) => {
    // console.log({name, value: evt?.target?.value});
  };
  //
  return (
    <div className="**slidecontainer w-full">
      <input
        type="range"
        name={name}
        min="1"
        max="5"
        step="1"
        // value="3"
        className={`**slider ${modcss.sliderThumb} !duration-100 !transition-opacity appearance-none w-full h-1 rounded-sm outline-none opacity-80 hover:opacity-90 active:opacity-100 bg-slate-300`}
        onInput={onInput}
      />
    </div>
  );
};

export default InputWineReviewRangeSlider;
