import { postRequest } from "./index";
import { useUserStore } from "../store/useUserStore";

const accessToken = useUserStore.getState().user.accessToken;
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL as string;
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${accessToken}`,
};

export const getThumbnails = async (userId: number, feedId: number) => {
  const res = await fetch(`${baseURL}/api/user/${userId}/feed/thumbnail?feedId=${feedId}`, {
    method: "GET",
    headers,
  });

  const data = await res.json();
  return data;
};

export const getMyProfile = async (userId: number) => {
  const res = await fetch(`${baseURL}/api/user/${userId}/profile`, {
    method: "GET",
    headers,
  });
  const data = await res.json();
  console.log("마이프로필", data);
  return data;
};

// 프로필 설정
export const profileSetting = async (body: FormData) => {
  const res = await postRequest.put("​/api​/user​/setting​/profile", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log("프로필 서버 응답데이터", res);
  return res;
};
