import { useState } from "react";
import { useAuth } from "../../app/store";

export default function useAuthSendVerifyEmail() {
  const { sendVerifyEmail } = useAuth();

  const [authError, setAuthError] = useState(null);
  const [authProcessing, setAuthProcessing] = useState(null);
  const [authMessage, setAuthMessage] = useState("");

  return [
    sendVerifyEmail_,
    {
      error: authError,
      processing: authProcessing,
      message: authMessage,
    },
  ];

  async function sendVerifyEmail_() {
    try {
      setAuthError((_) => null);
      setAuthProcessing((_) => true);
      setAuthMessage((_) => "");

      await sendVerifyEmail();
      setAuthMessage((_) => "success");
      // success; redirect..
    } catch (error) {
      setAuthError((_) => error);
    } finally {
      setAuthProcessing((_) => false);
    }
  }
}
