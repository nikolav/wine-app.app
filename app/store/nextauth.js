// https://firebase.google.com/docs/auth/web/manage-users#update_a_users_profile

import React, { useContext, useState, useEffect } from "react";


export const AuthNextContext = React.createContext();
export const useAuthNext = () => useContext(AuthNextContext);

export default function AuthNextContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const authValue = {

    // firebaseUser{}
    user,

    register,
    login,
    logout,

    sendVerifyEmail,
    sendPasswordReset,
    
    updateUserProfile,
    updateUserEmail,
    updateUserPassword,

  };

  useEffect(() => {
      // subscribe for user{}
  }, []);

  return (
    <AuthNextContextProvider.Provider value={authValue}>{children}</AuthNextContextProvider.Provider>
  );

  function login(email, password) {}
  function logout() {}
  function register(email, password) {}

  function sendPasswordReset(email) {}
  function sendVerifyEmail() {}
  function updateUserProfile(config) {}

  function updateUserEmail(email) {}
  function updateUserPassword(newPassword) {}
}
