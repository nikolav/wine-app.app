import { useState } from "react";
import { useAuth } from "../../app/store";

export default function useAuthLogin() {
  const { login } = useAuth();

  const [authError, setAuthError] = useState(null);
  const [authProcessing, setAuthProcessing] = useState(null);
  const [authMessage, setAuthMessage] = useState(null);

  return [
    login_,
    {
      error: authError,
      processing: authProcessing,
      message: authMessage,
    },
  ];

  async function login_(email, password) {
    try {
      setAuthError(null);
      setAuthProcessing(true);
      setAuthMessage("auth.start");

      await login(email, password);
      setAuthMessage("auth.success");
      // success; redirect..
    } catch (error) {
      setAuthError(error);
      setAuthMessage("auth.error");
    } finally {
      setAuthProcessing(false);
    }
  }
}
