import { getMessaging, getToken, onMessage } from "firebase/messaging";
import firebaseApp from "@/firebaseConfig";

export const initializePushNotifications = async () => {
  // 알림 권한 요청
  if (typeof window !== "undefined" && "Notification" in window) {
    const permission = await Notification.requestPermission();
    console.log("Notification permission status:", permission)
    if (permission !== "granted") {
      console.warn("User denied the notification permission");
      return;
    }
  } else {
    console.warn("Notifications are not available in this environment");
    return;
  }
  // FCM에서 메시징 객체 가져오기
  const messaging = getMessaging(firebaseApp);

  // FCM 토큰 가져오기
  const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;

  function isFirebaseError(obj: any): obj is { code: string; message: string } {
    return obj && typeof obj.code === "string" && typeof obj.message === "string";
  }

  try {
    const token = await getToken(messaging, { vapidKey: VAPID_KEY });
    console.log(`FCM Token: ${token}`);
    // TODO: 서버에 토큰을 전송하는 코드 추가
  } catch (error) {
    if (isFirebaseError(error) && error.code !== "messaging/token-unsubscribe-failed") {
      console.error(`Failed to get FCM token: ${error.message}`);
    }
  }

  // 메시지 수신 리스너 설정
  onMessage(messaging, (payload) => {
    console.log("Received FCM message:", payload);

    if (payload.notification && payload.notification.title && payload.notification.body) {
      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body,
        icon: "/images/userImage.png",
      };

      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification(notificationTitle, notificationOptions);
        });
      }
    }
  });
};
