import React from "react";
export default function Required({ input = "", ...rest }) {
  return 0 === input.length ? (
    <strong className="text-danger" {...rest}>
      *
    </strong>
  ) : null;
}
