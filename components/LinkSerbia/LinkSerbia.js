import React from "react";
import css from "./LinkSerbia.module.css";

const LinkSerbia = ({children, ...rest}) => {
  return (
    <div className={`${css.main} h-32 relative text-4xl rounded-lg shadow cursor-pointer overflow-hidden hover:scale-[101%] transition-transform`} {...rest}>
      <h2 className="text-white font-bold absolute bottom-0 p-2 px-4 italic bg-black/50 w-full text-right">
        {children}
      </h2>
    </div>
  );
};

export default LinkSerbia;
