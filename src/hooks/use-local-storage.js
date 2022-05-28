import React, { useEffect, useState } from "react";
import useIsMounted from "./use-is-mounted";
//
export const DEFAULT_STORAGE_NAME = ".APPDATA";
//
export default function useLocalStorage(name = DEFAULT_STORAGE_NAME) {
  const isMounted = useIsMounted();
  //
  const [value, setValue] = useState(() => isWindow ? localStorage.getItem(name) : null);
  const storage_ = (newvalue) => {
    if (null == newvalue) return value;
    setValue_(name, newvalue);
  };
  //
  useEffect(() => {
    if (isMounted) setValue_(name, value);
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
