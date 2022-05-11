import React from "react";
//
export default function ArticleEnd({ content = "•", classes = "", ...rest }) {
  return (
    <strong
      className={`block text-center tracking-widest text-xl ${classes}`}
      {...rest}
    >
      {content}
    </strong>
  );
}
