import { createContext, useContext, useState } from "react";
import { has } from "../util"

const FlagsContext = createContext();

export const useFlags = () => useContext(FlagsContext);

export default function FlagsProvider({ children }) {
  const [flags, setFlags] = useState({});

  const toggle = (flag) => {
    if (has(flags, flag)) {
      setFlags((_) => ({ ..._, [flag]: !_[flag] }));
    } else {
      toggle.on(flag);
    }
  };

  toggle.on = (flag) => {
    setFlags((_) => ({ ..._, [flag]: true }));
  };
  toggle.off = (flag) => {
    setFlags((_) => ({ ..._, [flag]: false }));
  };

  const value = { flags, toggle };

  return <FlagsContext.Provider value={value}>{children}</FlagsContext.Provider>;
}
