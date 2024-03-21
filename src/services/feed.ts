import { userRequest } from "@services";
import { RestaurantCategory } from "../types/restaurant";

/** 피드 좋아요 요청 */
export const likeFeed = async (feedId: number) => {
  const { data } = await userRequest.post("api/feed/like", { feedId });
  return data;
};

/** 피드 좋아요 취소 요청 */
export const unlikeFeed = async (feedId: number) => {
  const { data } = await userRequest.delete(`api/feed/unlike?feedId=${feedId}`);

  return { data };
};

/** 피드 수정 요청 */
export const updateFeed = async (feedId: number, content: string) => {
  const res = await userRequest.patch(`api/feed/${feedId}`, { content });
  return res.data;
};

/** 유저 피드 요청 */
export const getFeedListByUserId = async (userId: number, feedId: number) => {
  if (feedId === 0) {
    const res = await userRequest.get(`api/user/${userId}/feed`);
    return res;
  } else {
    const res = await userRequest.get(`api/user/${userId}/feed/?feedId=${feedId}`);
    return res;
  }
};

/** 피드 목록 요청 */
export const getFeedList = async (feedId: number, category?: RestaurantCategory) => {
  let res;
  if (feedId === 0) {
    res = await userRequest.get(`api/feed/list`);
  } else {
    res = await userRequest.get(`api/feed/list?feedId=${feedId}`);
    // 추후 카테고리 기능 완성되면 아래 로직으로 사용
    // res = await userRequest.get(`api/feed/list?category=${category}&last=${feedId}`);
  }
  return res;
};

/** 싱글 피드 요청 */
export const getSingleFeed = async (feedId: number) => {
  const { data } = await userRequest.get(`api/feed/${feedId}`);
  return data;
};

/** 팔로우 */
export const followUser = async (userId: number) => {
  const res = await userRequest.post(`api/user/follow?followedId=${userId}`);
  return res;
};

/** 언팔로우 */
export const unfollowUser = async (userId: number) => {
  const res = await userRequest.delete(`api/user/unfollow?followedId=${userId}`);
  return res;
};

/** 피드 공유 */
export const getFeedShared = async (feedId: number) => {
  const res = await userRequest.get(`api/feed/detail/${feedId}`);
  return res;
};

/** 피드 신고 */
export const reportFeed = async (feedId: number, reportReason: string) => {
  const res = await userRequest.post(`api/feed/report`, { feedId, reportReason });
  return res;
};

/** 피드 삭제 */
export const deleteFeed = async (feedId: number) => {
  const res = await userRequest.delete(`api/feed/${feedId}`);
  return res.data;
};

/** 유저 검색 */
export const searchUser = async (keyword: string) => {
  const { data } = await userRequest.get(`api/user/search?keyword=${keyword}`);
  return data;
};
