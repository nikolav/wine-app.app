import React from "react";
// import useStateSwitch from "../../src/hooks/use-state-switch";
import { useAppData } from "../../app/store";
const PageSearch = () => {
  // const { isOn, toggle } = useStateSwitch();
  const { appdata } = useAppData();
  //
  return (
    <div>
      <pre className="text-xs">{JSON.stringify(appdata, null, 2)}</pre>
    </div>
  );
};

export default PageSearch;
