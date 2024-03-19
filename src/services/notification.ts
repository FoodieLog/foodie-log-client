import { userRequest } from "@services";

/** FCM Token 전송 */
export const sendFcmToken = async (fcmToken: string) => {
  const res = await userRequest.post("api/notification/push", { fcmToken });
  return res;
};

/** 알림 내역 요청 */
export const getNotification = async () => {
  const res = await userRequest.get(`api/notification/list`);
  return res;
};
