import { userRequest } from "../services";
import { useUserStore } from "../store/useUserStore";
import { makeFeedFetchRequest } from "../services/apiFeed";

const accessToken = useUserStore.getState().user.accessToken;

const headers = {
  "content-type": "application/json",
  Authorization: `Bearer ${accessToken}`,
};

export const applyBadge = async () => {
  const res = await userRequest.post("/api/user/setting/badge");
  return res;
};

// 비밀번호 변경
interface SettingPassword {
  oldPassword: string;
  newPassword: string;
}

export const FatchChangePassword = async ({ oldPassword, newPassword }: SettingPassword) => {
  return await makeFeedFetchRequest("/user/setting/password", "PUT", { oldPassword, newPassword });
};

// 로그아웃
export const logOut = async () => {
  const res = await userRequest.post("/api/user/setting/logout");
  return res;
};

// 회원 탈퇴
interface WithdrawBody {
  withdrawReason: string;
}

export const fetchWithdraw = async ({ withdrawReason }: WithdrawBody) => {
  console.log("Fetching withdraw", withdrawReason);
  return await makeFeedFetchRequest("/user/setting/withdraw", "POST", { withdrawReason });
};
