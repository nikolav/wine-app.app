import React, { useState, useEffect } from "react";
import { useGlobals, TEST_VALUES } from "../../src/hooks/use-globals";
//
const RANGE = "qdbdoyzankg";
const PageSearch = () => {
  const globals = useGlobals();
  const rangeValue = globals(TEST_VALUES)[RANGE] || 3;
  const onInput = (evt) => {
    globals.set(TEST_VALUES, {
      ...globals(TEST_VALUES),
      [RANGE]: evt.target.value,
    });
  };

  //
  return (
    <div>
      <button
        className="button"
        onClick={() =>
          globals.set(TEST_VALUES, {
            ...globals(TEST_VALUES),
            [RANGE]: 1 + Math.floor(Math.random() * 5),
          })
        }
      >
        go
      </button>
      <input
        type="range"
        min="1"
        max="5"
        step="1"
        value={rangeValue}
        onChange={onInput}
      />
      <p>{rangeValue}</p>
      <p className="text-6xl text-center">🍸</p>
    </div>
  );
};

export default PageSearch;
