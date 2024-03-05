import { userRequest } from "@services";
import { PasswordType, WithdrawRequestBodyType } from "@@types/settings";
import { getMessaging, deleteToken } from "firebase/messaging";
import firebaseApp from "@/firebaseConfig";

export const getApplyBadge = async () => {
  const res = await userRequest.get("/api/user/setting/badge");
  return res;
};

export const postApplyBadge = async () => {
  const res = await userRequest.post("/api/user/setting/badge");
  return res;
};

export const putChangePassword = async ({ oldPassword, newPassword }: PasswordType) => {
  const res = await userRequest.put("/api/user/setting/password", { oldPassword, newPassword });
  return res;
};

export const postLogout = async () => {
  const res = await userRequest.post("/api/user/setting/logout");
  return res;
};

export const postDeleteToken = async () => {
  const messaging = getMessaging(firebaseApp);
  await deleteToken(messaging);
};

export const postWithdraw = async (body: WithdrawRequestBodyType) => {
  const res = await userRequest.post("/api/user/setting/withdraw", body);
  return res;
};

export const putNotification = async (flag: string) => {
  const res = await userRequest.put("/api/user/setting/notification", { flag });
  return res;
};
