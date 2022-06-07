import { createPortal } from "react-dom";
import useIsMounted from "../src/hooks/use-is-mounted";
//
export default function PortalOverlaysEnd({ children }) {
  const isMounted = useIsMounted();
  //
  return isMounted
    ? createPortal(children, document.getElementById("overlays-end"))
    : null;
}
