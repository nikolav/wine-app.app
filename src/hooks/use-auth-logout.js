import { useState } from "react";

import { firebaseAuth } from "../../app/firebase";
import { useAuth } from "../../app/store";

export default function useAuthLogout() {
  const { logout } = useAuth();

  const [authError, setAuthError] = useState(null);
  const [authProcessing, setAuthProcessing] = useState(null);
  const [authMessage, setAuthMessage] = useState("");

  return [
    logout_,
    {
      error: authError,
      processing: authProcessing,
      message: authMessage,
    },
  ];

  async function logout_() {
    try {
      setAuthError(null);
      setAuthProcessing(true);
      setAuthMessage("auth.logout.start");

      await logout(firebaseAuth);
      setAuthMessage("auth.logout.success");
      // success; redirect..
    } catch (error) {
      setAuthError(error);
      setAuthMessage("auth.logout.error");
    } finally {
      setAuthProcessing(false);
    }
  }
}
