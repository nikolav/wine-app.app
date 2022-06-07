// https://firebase.google.com/docs/auth/web/manage-users#update_a_users_profile

import React, { useContext, useState, useEffect } from "react";

import { firebaseAuth } from "../firebase";

// overide these to use custom strategy
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  updateEmail,
  updatePassword,
} from "firebase/auth";

import client from "../../src/feathers";

export const AuthContext = React.createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
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
    const clearOnAuthStateChanged = onAuthStateChanged(
      firebaseAuth,
      async (user) => {
        if (!user) return setUser(null);

        // firebase doesnt save user names by default
        // fetch manualy from db
        if (!user.displayName)
          return await client
            .service("main")
            .find({
              query: {
                //
                $limit: 1,
                $select: ["value"],
                //
                name: user.uid,
              },
            })
            .then((payload) => {
              console.log(payload);
              user.displayName = payload.data[0]?.value;
              setUser(user);
            });

        setUser(user);
      }
    );

    return clearOnAuthStateChanged;
  }, []);

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );

  function login(email, password) {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  }
  function logout() {
    return signOut(firebaseAuth);
  }
  function register(email, password) {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  }

  // manage user account
  function sendPasswordReset(email) {
    return sendPasswordResetEmail(firebaseAuth, email);
  }
  function sendVerifyEmail() {
    return sendEmailVerification(firebaseAuth?.currentUser);
  }
  function updateUserProfile(config) {
    return updateProfile(firebaseAuth, config);
  }

  function updateUserEmail(email) {
    return updateEmail(firebaseAuth?.currentUser, email);
  }
  function updateUserPassword(newPassword) {
    return updatePassword(firebaseAuth?.currentUser, newPassword);
  }
}
