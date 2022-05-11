import { useState } from "react";
import { useAuth } from "../../app/store";

export default function useAuthSendPasswordReset() {
  const { sendPasswordReset } = useAuth();

  const [authError, setAuthError] = useState(null);
  const [authProcessing, setAuthProcessing] = useState(null);
  const [authMessage, setAuthMessage] = useState("");

  return [
    sendPasswordReset_,
    {
      error: authError,
      processing: authProcessing,
      message: authMessage,
    },
  ];

  async function sendPasswordReset_(email) {
    try {
      setAuthError((_) => null);
      setAuthProcessing((_) => true);
      setAuthMessage((_) => "");

      await sendPasswordReset(email);
      setAuthMessage((_) => "success");
      // success; redirect..
    } catch (error) {
      setAuthError((_) => error);
    } finally {
      setAuthProcessing((_) => false);
    }
  }
}
