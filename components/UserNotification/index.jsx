import React from "react";

const UserNotificationArticleSaved = ({ saved = [], ...rest }) => {
  const payload = 0 < saved.length ? saved[saved.length - 1] : null;
  return (
    <div className="prose" {...rest}>
      <h2>article saved</h2>
      <pre>{JSON.stringify(payload, null, 2)}</pre>
    </div>
  );
};

export { UserNotificationArticleSaved };
