import React from "react";
import { FaExclamationTriangle } from "../icons";
////
////
export default function Required({ input = "", classes = "", ...rest }) {
  return 0 === input.length ? (
    <FaExclamationTriangle
      className={`!inline align-baseline text-lg text-danger opacity-40 ${classes}`}
      {...rest}
    />
  ) : null;
}
