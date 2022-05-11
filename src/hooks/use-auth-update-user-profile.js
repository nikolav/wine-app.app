import { useState } from "react";
import { useAuth } from "../../app/store";

export default function useAuthUpdateUserProfile() {
  const { updateUserProfile } = useAuth();

  const [authError, setAuthError] = useState(null);
  const [authProcessing, setAuthProcessing] = useState(null);
  const [authMessage, setAuthMessage] = useState("");

  return [
    updateUserProfile_,
    {
      error: authError,
      processing: authProcessing,
      message: authMessage,
    },
  ];

  async function updateUserProfile_(email, password) {
    try {
      setAuthError((_) => null);
      setAuthProcessing((_) => true);
      setAuthMessage((_) => "");

      await updateUserProfile(config);
      setAuthMessage((_) => "success");
      // success; redirect..
    } catch (error) {
      setAuthError((_) => error);
    } finally {
      setAuthProcessing((_) => false);
    }
  }
}
