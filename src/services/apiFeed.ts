// apiFeed.ts

import { useUserStore } from "../store/useUserStore";

const BASE_URL = "https://api.foodielog-server.monster/api";

export type APIFeedResponse = {
  status: number;
  response: {
    content: Content[];
  };
  error: any;
};

export type Content = {
  feed: {
    nickName: string;
    profileImageUrl: string | null;
    feedId: number;
    createdAt: string;
    updatedAt: string;
    feedImages: { imageUrl: string }[];
    content: string;
    likeCount: number;
    replyCount: number;
  };
  restaurant: {
    id: number;
    name: string;
    category: string;
    link: string;
    roadAddress: string;
  };
  followed: boolean;
  liked: boolean;
};

export type APIUserSearchResponse = {
  status: number;
  response: {
    content: [
      {
        id: number;
        nickName: string;
        profileImageUrl: string | null;
        aboutMe: string | null;
      }
    ];
  };
  error: any;
};

export type APIReplyListResponse = {
  status: number;
  response: {
    nickName: string;
    profileImageUrl: string | null;
    content: string;
    createdAt: string;
    replyList: {
      id: number;
      nickName: string;
      profileImageUrl: string | null;
      content: string;
      createdAt: string;
    }[];
  };
  error: any;
};

export type APIReplyPostResponse = {
  status: number;
  response: {
    id: number;
    nickName: string;
    content: string;
    profileImageUrl: string | null;
    createdAt: string;
  };
  error: any;
};

export type GetFeedSharedResponse = {
  status: number;
  response: FeedShared;
  error: any;
};

export type FeedShared = {
  nickName: string;
  profileImageUrl: string | null;
  feedId: number;
  createdAt: string;
  updatedAt: string;
  feedImages: {
    imageUrl: string;
  }[];
  restaurant: {
    id: number;
    name: string;
    category: string;
    link: string;
    roadAddress: string;
  };
  content: string;
  likeCount: number;
  replyCount: number;
};

export const makeFeedFetchRequest = async <T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: any
): Promise<T> => {
  const accessToken = useUserStore.getState().user.accessToken;

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    // return await response.json();

    const responseText = await response.text();

    // 응답 본문이 없는 경우, default 값을 반환합니다.
    if (!responseText) {
      return {
        status: 200,
        response: {
          content: [],
        },
        error: null,
      } as unknown as T;
    }

    return JSON.parse(responseText);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getFeedList = (feedId: number, pageSize: number, pageNumber: number): Promise<APIFeedResponse> => {
  return makeFeedFetchRequest(`/feed/list?feedId=${feedId}&pageSize=${pageSize}&pageNumber=${pageNumber}`);
};

export const getFeedListByUserId = (
  userId: number,
  feedId: number,
  pageSize: number,
  pageNumber: number
): Promise<APIFeedResponse> => {
  return makeFeedFetchRequest(
    `/user/${userId}/feed/list?feedId=${feedId}&pageSize=${pageSize}&pageNumber=${pageNumber}`
  );
};

export const getFeedShared = (feedId: number): Promise<GetFeedSharedResponse> => {
  return makeFeedFetchRequest<GetFeedSharedResponse>(`/feed/detail?feedId=${feedId}`);
};

export const likeFeed = async (feedId: number): Promise<APIFeedResponse> => {
  return await makeFeedFetchRequest("/feed/like", "POST", { feedId });
};

export const unlikeFeed = async (feedId: number): Promise<APIFeedResponse> => {
  return await makeFeedFetchRequest(`/feed/unlike?feedId=${feedId}`, "DELETE");
};

export const followUser = async (userId: number): Promise<APIFeedResponse> => {
  return await makeFeedFetchRequest(`/user/follow?followedId=${userId}`, "POST");
};

export const unfollowUser = async (userId: number): Promise<APIFeedResponse> => {
  return await makeFeedFetchRequest(`/user/unfollow?followedId=${userId}`, "DELETE");
};

export const getReplyList = async (feedId: number, replyId: number = 0): Promise<APIReplyListResponse> => {
  return makeFeedFetchRequest(`/reply/${feedId}?replyId=${replyId}`);
};

export const saveReply = async (feedId: number, content: string): Promise<APIReplyPostResponse> => {
  return makeFeedFetchRequest(`/reply/${feedId}`, "POST", { content });
};

export const deleteReply = (feedId: number): Promise<any> => {
  return makeFeedFetchRequest(`/reply/${feedId}`, "DELETE");
};

export const reportReply = (replyId: number, reportReason: string): Promise<any> => {
  return makeFeedFetchRequest(`/reply/report`, "POST", { replyId, reportReason });
};

export const searchUser = async (keyword: string): Promise<APIUserSearchResponse> => {
  return await makeFeedFetchRequest(`/user/search?keyword=${keyword}`);
};
