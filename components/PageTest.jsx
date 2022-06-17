import React from "react";
import OverlayHover from "./OverlayHover/OverlayHover";
//
const PageTest = () => {
  return (
    <div>
      <OverlayHover
        overlay={{
          key: 1,
          node: <div className="bg-black/50 flex items-center justify-center text-white">more...</div>,
        }}
      >
        <div className="bg-red-200 w-64 h-48">content</div>
      </OverlayHover>
    </div>
  );
};

export default PageTest;
