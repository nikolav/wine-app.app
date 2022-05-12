import { useEffect } from "react";
import { createPortal } from "react-dom";
import useStateSwitch from "../src/hooks/use-state-switch";

export default function PortalOverlaysEnd({ children }) {
  const { isOn: isMounted, toggle } = useStateSwitch();
  useEffect(() => {
    toggle.on();
    return toggle.off;
  }, []);
  //
  return isMounted
    ? createPortal(children, document.getElementById("overlays-end"))
    : null;
}
