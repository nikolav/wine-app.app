import React, {
  useEffect,
  // useRef,
} from "react";
import DrawerBox from "../DrawerBox/DrawerBox";
import { useAuth } from "../../app/store";
import useStateSwitch from "../../src/hooks/use-state-switch";
import useIsMounted from "../../src/hooks/use-is-mounted";
import { usePages } from "../../app/store";
import { PAGE_HELP } from "../../app/store/page";
import { escapeHTML } from "../../src/util";
////
////

const UserNotificationArticleSaved = ({ saved = [], ...rest }) => {
  const payload = 0 < saved.length ? saved[saved.length - 1] : null;
  return (
    <div className="prose" {...rest}>
      <h2>article saved</h2>
      <pre>{JSON.stringify(payload, null, 2)}</pre>
    </div>
  );
};
//
function UserNotificationPostSaved({
  children,
  isActive,
  onClose,
  history = [],
  ...rest
}) {
  const payload = 0 < history.length ? history[history.length - 1] : null;
  return (
    <DrawerBox isActive={isActive} onClose={onClose}>
      <div className="h-full overflow-y-auto prose" {...rest}>
        {children}
        <hr />
        <pre className="text-xs">{JSON.stringify(payload, null, 2)}</pre>
      </div>
    </DrawerBox>
  );
}
//
//
const UserNotificationAuthStateChange = () => {
  const isMounted = useIsMounted();
  const { user } = useAuth();
  const { isOn, toggle } = useStateSwitch();
  const { setPage } = usePages(); //PAGE_HELP
  //
  useEffect(() => {
    if (isMounted) {
      toggle.on();
      if (!user) setPage(PAGE_HELP);
    }
  }, [user]);
  //
  return (
    <DrawerBox isActive={isOn} onClose={toggle.off}>
      <div className="flex flex-row items-center justify-center h-full">
        <section className="text-center">
          {null != user ? (
            <strong>
              👋🏼 Dobrodošli {escapeHTML(user?.displayName || "!")}
            </strong>
          ) : (
            <>
              <p className="italic opacity-80">Uspešno ste se odjavili.</p>
              <p className="italic opacity-80">Hvala na poseti.</p>
              <p className="italic opacity-80">👋🏼</p>
            </>
          )}
        </section>
      </div>
      {/* <pre className="text-xs">{JSON.stringify(user, null, 2)}</pre> */}
    </DrawerBox>
  );
};

export {
  UserNotificationAuthStateChange,
  UserNotificationArticleSaved,
  UserNotificationPostSaved,
};
