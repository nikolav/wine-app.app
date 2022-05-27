import React, { useEffect, useState } from "react";
import useStateSwitch from "./use-state-switch";
//
export const DEFAULT_STORAGE_NAME = ".APPDATA";
//
export default function useLocalStorage(name = DEFAULT_STORAGE_NAME) {
  const isWindow = "undefined" !== typeof window;
  //
  const [value, setValue] = useState(() => isWindow ? localStorage.getItem(name) : null);
  const storage_ = (newvalue) => {
    if (null == newvalue) return value;
    setValue_(name, newvalue);
  };
  //
  const { isOn: isMounted, toggle: toggleMounted } = useStateSwitch();
  useEffect(() => {
    toggleMounted.on();
    return toggleMounted.off;
  }, []);
  //
  useEffect(() => {
    if (isMounted && isWindow) setValue_(name, value);
  }, [name, value]);
  //
  //
  return storage_;
  //
  function setValue_(name, value) {
    localStorage.setItem(name, value);
    setValue(value);
  }
}
