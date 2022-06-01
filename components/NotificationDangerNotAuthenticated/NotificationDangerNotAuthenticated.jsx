import React from "react";
import DrawerBox from "../DrawerBox/DrawerBox";
////
////
const NotificationDangerNotAuthenticated = ({
  isActive,
  onClose,
  children,
  ...rest
}) => {
  return (
    <DrawerBox isActive={isActive} onClose={onClose} {...rest} classes="flex justify-center items-center">
      {children}
    </DrawerBox>
  );
};

export default NotificationDangerNotAuthenticated;
