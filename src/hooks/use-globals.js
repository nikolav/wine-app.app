import { createContext, useContext, useState } from "react";
import { has } from "../../src/util";

export const GlobalsContext = createContext();
export const useGlobals = () => useContext(GlobalsContext);

export default function GlobalsProvder({ children }) {
  const [globals, setGlobals] = useState({});
  const cp_ = () => ({ ...globals });
  //
  const value = (name) => globals[name];
  value.set = (name, value) =>
    setGlobals((current) => ({ ...current, [name]: value }));
  value.has = (name) => has(globals, name);
  value.rm = (name) => {
    const cp = cp_();
    delete cp[name];
    setGlobals(cp);
  };
  value.ls = () => Object.keys(globals);
  //
  return (
    <GlobalsContext.Provider value={value}>{children}</GlobalsContext.Provider>
  );
}
