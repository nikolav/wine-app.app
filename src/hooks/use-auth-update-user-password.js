
import { useState } from "react";
import { useAuth } from "../../app/store";

export default function useAuthUpdateUserPassword() {
  const { updateUserPassword } = useAuth();

  const [authError, setAuthError] = useState(null);
  const [authProcessing, setAuthProcessing] = useState(null);
  const [authMessage, setAuthMessage] = useState("");

  return [
    updateUserPassword_,
    {
      error: authError,
      processing: authProcessing,
      message: authMessage,
    },
  ];

  async function updateUserPassword_(newPassword) {
    try {
      setAuthError((_) => null);
      setAuthProcessing((_) => true);
      setAuthMessage((_) => "");

      await updateUserPassword(newPassword);
      setAuthMessage((_) => "success");
      // success; redirect..
    } catch (error) {
      setAuthError((_) => error);
    } finally {
      setAuthProcessing((_) => false);
    }
  }
}
