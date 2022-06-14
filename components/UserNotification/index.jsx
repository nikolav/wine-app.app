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
import useLocalStorage, {
  LAST_SIGN_IN_DATE,
} from "../../src/hooks/use-local-storage";
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
const MSECONDS_IN_ONE_DAY = 86400000;
const UserNotificationAuthStateChange = () => {
  const isMounted = useIsMounted();
  const { user } = useAuth();
  const { isOn, toggle } = useStateSwitch();
  const { setPage } = usePages();
  const storage = useLocalStorage(LAST_SIGN_IN_DATE);
  //
  const now_ = Date.now();
  const then_ = storage();
  const isOldLastSignInDiff = MSECONDS_IN_ONE_DAY < now_ - (then_ || 0);
  //
  useEffect(() => {
    if (isMounted) {
      toggle.on();
      if (!user) {
        setPage(PAGE_HELP);
      }
    }
  }, [user]);
  //
  return null != user ? (
    <UserNotificationAuthStateChangeSignIn
      user={user}
      isActive={isOldLastSignInDiff && isOn}
      onClose={() => {
        storage(now_);
        toggle.off();
      }}
    />
  ) : (
    <UserNotificationAuthStateChangeSignOut
      isActive={isOn}
      onClose={toggle.off}
    />
  );
};
const UserNotificationAuthStateChangeSignIn = ({ user, isActive, onClose }) => {
  return (
    <DrawerBox isActive={isActive} onClose={onClose}>
      <div className="flex flex-row items-center justify-center h-full">
        <section className="text-center">
          <strong>👋🏼 Dobrodošli {escapeHTML(user?.displayName || "!")}</strong>
        </section>
      </div>
    </DrawerBox>
  );
};
const UserNotificationAuthStateChangeSignOut = ({
  user = null,
  isActive,
  onClose,
}) => {
  return (
    <DrawerBox isActive={isActive} onClose={onClose}>
      <div className="flex flex-row items-center justify-center h-full">
        <section className="text-center">
          <p className="italic opacity-80">Uspešno ste se odjavili.</p>
          <p className="italic opacity-80">Hvala na poseti.</p>
          <p className="italic opacity-80">👋🏼</p>
        </section>
      </div>
    </DrawerBox>
  );
};

export {
  UserNotificationAuthStateChange,
  UserNotificationArticleSaved,
  UserNotificationPostSaved,
};
