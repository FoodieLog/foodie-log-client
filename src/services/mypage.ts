import { userRequest } from "@services";
import { useUserStore } from "@store/useUserStore";

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
    res = await userRequest.get(`${baseURL}/api/user/${userId}/feed`);
  } else {
    res = await userRequest.get(`${baseURL}/api/user/${userId}/feed/?feedId=${feedId}`);
  }
  return res.data;
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

  return res;
};

// 나의 맛집 지도 (axios)
export const getMyMap = async (userId: number) => {
  const res = await userRequest.get(`/api/user/${userId}/map`);
  return res;
};

// 팔로잉 리스트
export const getFollowingList = async (userId: number) => {
  const res = await userRequest.get(`/api/user/follow/list?userId=${userId}`);
  return res.data;
};

// 팔로워 리스트
export const getFollowerList = async (userId: number) => {
  const res = await userRequest.get(`/api/user/follower/list?userId=${userId}`);
  return res.data;
};
