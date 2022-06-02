import React from "react";
import DrawerBox from "../DrawerBox/DrawerBox";

const UserNotificationArticleSaved = ({ saved = [], ...rest }) => {
  const payload = 0 < saved.length ? saved[saved.length - 1] : null;
  return (
    <div className="prose" {...rest}>
      <h2>article saved</h2>
      <pre>{JSON.stringify(payload, null, 2)}</pre>
    </div>
  );
};
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
      <div className="prose" {...rest}>
        {/* @@todo */}
        <p>@TODO; links.. </p>
        <p>@TODO; previews.. </p>
        <hr />
        {children}
        <hr />
        <pre className="text-xs">{JSON.stringify(payload, null, 2)}</pre>
      </div>
    </DrawerBox>
  );
}

export { UserNotificationArticleSaved, UserNotificationPostSaved };
