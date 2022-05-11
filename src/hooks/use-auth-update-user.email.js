import { useState } from "react";
import { useAuth } from "../../app/store";

export default function useAuthUpdateUserEmail() {
  const { updateUserEmail } = useAuth();

  const [authError, setAuthError] = useState(null);
  const [authProcessing, setAuthProcessing] = useState(null);
  const [authMessage, setAuthMessage] = useState("");

  return [
    updateUserEmail_,
    {
      error: authError,
      processing: authProcessing,
      message: authMessage,
    },
  ];

  async function updateUserEmail_(email) {
    try {
      setAuthError((_) => null);
      setAuthProcessing((_) => true);
      setAuthMessage((_) => "");

      await updateUserEmail(email);
      setAuthMessage((_) => "success");
      // success; redirect..
    } catch (error) {
      setAuthError((_) => error);
    } finally {
      setAuthProcessing((_) => false);
    }
  }
}
