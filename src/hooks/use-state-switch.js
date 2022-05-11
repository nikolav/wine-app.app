import { useState } from "react";

export default function useStateSwitch(initial = false) {
  //
  const [isOn, setIsOn] = useState(initial);
  //
  const on = () => setIsOn(true);
  const off = () => setIsOn(false);
  const toggle = () => setIsOn((current) => !current);
  //
  toggle.on = on;
  toggle.off = off;
  //
  return { isOn, toggle };
}
