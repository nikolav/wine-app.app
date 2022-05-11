import React from "react";

const DocBody = ({ children, ...rest }) => {
  return <main {...rest}>{children}</main>;
};

export default DocBody;
