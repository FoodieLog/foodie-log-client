import { useUserStore } from "@/src/store/useUserStore";
import { getMessaging, deleteToken } from "firebase/messaging";
import firebaseApp from "@/firebaseConfig";
import { logOut } from './settings';

const Logout = async () => {

  const res = await logOut();
  console.log("로그아웃 api 호출완료", res);
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