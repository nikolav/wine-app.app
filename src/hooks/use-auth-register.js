import { useState } from "react";
import { useAuth } from "../../app/store";

export default function useAuthRegister() {
  const { register } = useAuth();

  const [authError, setAuthError] = useState(null);
  const [authProcessing, setAuthProcessing] = useState(null);
  const [authMessage, setAuthMessage] = useState("");

  return [
    register_,
    {
      error: authError,
      processing: authProcessing,
      message: authMessage,
    },
  ];

  async function register_(email, password) {
    try {
      setAuthError(null);
      setAuthProcessing(true);
      setAuthMessage("auth.register.start");

      await register(email, password);
      setAuthMessage("auth.register.success");
      // success; redirect..
    } catch (error) {
      setAuthError(error);
      setAuthMessage("auth.register.error");
    } finally {
      setAuthProcessing(false);
    }
  }
}
