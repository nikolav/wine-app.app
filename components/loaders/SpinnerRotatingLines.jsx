import React from "react";
import { RotatingLines } from "react-loader-spinner";

const SpinnerRotatingLines = ({ width = "100" }) => {
  return <RotatingLines width={width} strokeColor="rgb(15, 23, 42)" />;
};

export default SpinnerRotatingLines;
