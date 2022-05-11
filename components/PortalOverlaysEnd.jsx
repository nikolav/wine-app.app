import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function PortalOverlaysEnd({ children }) {
  const [mounted, setMonted] = useState();
  useEffect(() => {
    setMonted(_ => true);
    return () => setMonted(_ => false);
  }, []);
  return mounted
    ? createPortal(children, document.getElementById("overlays-end"))
    : null;
}
