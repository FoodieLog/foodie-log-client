import { userRequest, formDataRequest } from "./index";
import { useUserStore } from "../store/useUserStore";
import { makeFeedFetchRequest } from "../services/apiFeed";

const accessToken = useUserStore.getState().user.accessToken;
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL as string;
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${accessToken}`,
};

// 내 피드 썸네일 리스트 (fetch)
export const getThumbnails = async (userId: number, feedId: number) => {
  const res = await fetch(`${baseURL}/api/user/${userId}/feed/thumbnail?feedId=${feedId}`, {
    method: "GET",
    headers,
  });

  const data = await res.json();
  return data;
};

// 내 프로필 (fetch)
export const getMyProfile = async (userId: number) => {
  const res = await fetch(`${baseURL}/api/user/${userId}/profile`, {
    method: "GET",
    headers,
  });

  const data = await res.json();
  console.log("마이프로필", data);
  return data;
};

// 프로필 설정 (axios)
export const settingProfile = async (body: FormData) => {
  const res = await userRequest.put("​/api​/user​/setting​/profile", body);
  console.log("프로필 서버 응답데이터", res);
  return res;
};

// 나의 맛집 지도 (axios)
export const getMyMap = async (userId: number) => {
  const res = await userRequest.get(`/api/user/${userId}/map`);
  return res;
};

// export const getMyMap = async (userId: number) => {
//   const res =makeFeedFetchRequest(`/api/user/${userId}/map`);
//   return res
// };

// export const profileSetting = async (body: FormData) => {
//   const res = await makeFeedFetchRequest("​/api​/user​/setting​/profile", "PUT", body);
//   console.log("프로필 서버 응답데이터", res);
//   return res;
// };
