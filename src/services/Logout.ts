import { useUserStore } from "@/src/store/useUserStore";
import { getMessaging, deleteToken } from "firebase/messaging";
import firebaseApp from "@/firebaseConfig";
import { logOut } from "./settings";

const logoutUser = async () => {
  const messaging = getMessaging(firebaseApp);

  try {
    const res = await logOut();
    console.log("Successfully logged out:", res);
  } catch (error) {
    console.error("Error during logout:", error);
  } finally {
    useUserStore.getState().clearUser();
  }

  try {
    const currentToken = await deleteToken(messaging);
    if (currentToken) {
      console.log("FCM token deleted.");
    }
  } catch (error) {
    console.error("Failed to delete FCM token:", error);
  }

  window.location.href = "/accounts/login";
};

export default logoutUser;
