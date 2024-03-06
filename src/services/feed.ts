import axios from "axios";
import { useUserStore } from "@store/useUserStore";

// ============ Axios Instance ============

/** axios 인스턴스 */
const axiosRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

/** axios 인스턴스에 인터셉터 적용 */
axiosRequest.interceptors.request.use(
  (config) => {
    const accessToken = useUserStore.getState().user.accessToken;
    if (accessToken) {
      config.headers["Content-Type"] = "application/json";
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// ============ 피드 API ============

/** 피드 좋아요 요청 */
export const likeFeed = async (feedId: number) => {
  const { data } = await axiosRequest.post("api/feed/like", { feedId });
  return data;
};

/** 피드 좋아요 취소 요청 */
export const unlikeFeed = async (feedId: number) => {
  const { data } = await axiosRequest.delete(`api/feed/unlike?feedId=${feedId}`);

  return { data };
};

/** 피드 수정 요청 */
export const updateFeed = async (feedId: number, content: string) => {
  const res = await axiosRequest.patch(`api/feed/${feedId}`, { content });
  return res.data;
};

/** 유저 피드 요청 */
export const getFeedListByUserId = async (userId: number, feedId: number) => {
  if (feedId === 0) {
    const res = await axiosRequest.get(`api/user/${userId}/feed`);
    return res;
  } else {
    const res = await axiosRequest.get(`api/user/${userId}/feed/?feedId=${feedId}`);
    return res;
  }
};

/** 피드 목록 요청 */
export const getFeedList = async (feedId: number) => {
  if (feedId === 0) {
    const res = await axiosRequest.get(`api/feed/list`);
    return res;
  } else {
    const res = await axiosRequest.get(`api/feed/list?feedId=${feedId}`);
    return res;
  }
};

/** 싱글 피드 요청 */
export const getSingleFeed = async (feedId: number) => {
  const res = await axiosRequest.get(`api/feed/${feedId}`);
  return res;
};

/** 팔로우 요청 */
export const followUser = async (userId: number) => {
  const res = await axiosRequest.post(`api/user/follow?followedId=${userId}`);
  return res;
};

/** 언팔로우 요청 */
export const unfollowUser = async (userId: number) => {
  const res = await axiosRequest.delete(`api/user/unfollow?followedId=${userId}`);
  return res;
};

/** 피드 공유 요청 */
export const getFeedShared = async (feedId: number) => {
  const res = await axiosRequest.get(`api/feed/detail/${feedId}`);
  return res;
};
