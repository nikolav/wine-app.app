import React, { forwardRef } from "react";

const InputSwitch = forwardRef(function InputSwitch(props, ref) {
  return (
    <label htmlFor="switch-element" className="switch">
      <input
        id="switch-element"
        type="checkbox"
        className="switch-input"
        ref={ref}
        {...props}
      />
      <em className="switch-slider" />
    </label>
  );
});

export default InputSwitch;
