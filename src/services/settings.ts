import { postRequest } from "../services";
import { useUserStore } from "../store/useUserStore";
import { makeFeedFetchRequest } from "../services/apiFeed";

const accessToken = useUserStore.getState().user.accessToken;

const headers = {
  "content-type": "application/json",
  Authorization: `Bearer ${accessToken}`,
};

export const applyBadge = async () => {
  const res = await postRequest.post("/api/user/setting/badge");
  return res;
};

// 비밀번호 변경
interface SettingPassword {
  oldPassword: string;
  newPassword: string;
}
export const changePassword = async ({ oldPassword, newPassword }: SettingPassword) => {
  const res = await postRequest.post("/api/user/setting/password", { oldPassword, newPassword });
  return res;
};
