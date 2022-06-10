import React from "react";
import useLike, { localId } from "../../src/hooks/use-like";
import useIsMounted from "../../src/hooks/use-is-mounted";

const Like = ({ id, className = "", ...rest }) => {
  const isMounted = useIsMounted();
  const isLiked = isMounted ? null != localStorage.getItem(localId(id)) : null;
  const { like, likeCount } = useLike(id);

  return (
    <em
      className={`cursor-pointer flex flex-row items-center ${className}`}
      onClick={like}
      {...rest}
    >
      <strong className="***text-xl">
        <span
          className={`mr-2 inline-block hover:scale-105 ${
            isLiked ? "opacity-100" : "opacity-40 hover:opacity-60"
          }`}
        >
          👍🏻
        </span>
      </strong>
      <i style={{ fontSize: "64%" }} className="***pt-1 ***ml-1">
        {likeCount ?? "."}
      </i>
    </em>
  );
};

export default Like;
