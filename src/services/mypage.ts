import { userRequest, formDataRequest } from "@/src/services";
import { useUserStore } from "@/src/store/useUserStore";
import { makeFeedFetchRequest } from "@/src/services/apiFeed";

const accessToken = useUserStore.getState().user.accessToken;
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL as string;
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${accessToken}`,
};

// 내 피드 썸네일 리스트 (fetch)
export const getThumbnailByUserId = async (userId: number, feedId: number) => {
  let res;
  if (feedId === 0) {
    res = await fetch(`${baseURL}/api/user/${userId}/feed`, {
      method: "GET",
      headers,
    });
  } else {
    res = await fetch(`${baseURL}/api/user/${userId}/feed/?feedId=${feedId}`, {
      method: "GET",
      headers,
    });
  }

  const data = await res.json();
  return data;
};

// 내 프로필 (fetch)
export const getMyProfile = async (userId: number) => {
  const res = await userRequest.get(`${baseURL}/api/user/${userId}/profile`);
  return res;
};

// 프로필 설정 (axios)
export const settingProfile = async (body: FormData) => {
  const res = await userRequest.put("/api/user/setting/profile", body, {
    headers: {
      "Content-Type": "multipart/form-data;charset=utf-8",
    },
  });
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
