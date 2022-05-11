import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function PortalOverlays({ children }) {
  const [mounted, setMonted] = useState();
  useEffect(() => {
    setMonted(_ => true);
    return () => setMonted(_ => false);
  }, []);
  return mounted
    ? createPortal(children, document.getElementById("overlays"))
    : null;
}