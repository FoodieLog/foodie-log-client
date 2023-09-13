import { useUserStore } from "@/src/store/useUserStore";
import { getMessaging, deleteToken } from "firebase/messaging";
import firebaseApp from "@/firebaseConfig";

const Logout = async () => {
  // Clear user data directly from store without using a hook
  useUserStore.getState().clearUser();

  // Delete FCM token from IndexedDB
  const messaging = getMessaging(firebaseApp);
  try {
    const currentToken = await deleteToken(messaging);
    if (currentToken) {
      console.log("Token deleted.");
    }
  } catch (error) {
    console.error("Failed to delete token: ", error);
  }

  window.location.href = "/accounts/login";
};

export default Logout;