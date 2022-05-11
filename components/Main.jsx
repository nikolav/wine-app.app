import React from "react";

const Main = ({ children, ...rest }) => {
  return <main className="app-main" {...rest}>{children}</main>;
};

export default Main;
