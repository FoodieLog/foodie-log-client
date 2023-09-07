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
    userId: number;
    nickName: string;
    profileImageUrl: string | null;
    content: string;
    createdAt: string;
    replyList: {
      id: number;
      userId: number;
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
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
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

    // 204 No Content 응답 처리
    if (response.status === 204) {
      return {
        status: 204,
        response: {
          content: [],
        },
        error: null,
      } as unknown as T;
    }

    let responseData;
    try {
      responseData = await response.json();
    } catch (error) {
      console.error("Failed to parse response body:", error);
      throw error;
    }

    if (!response.ok) {
      console.error(responseData.error.message); 
      throw new Error(responseData.error.message);
    }

    return responseData;
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
  return makeFeedFetchRequest("/feed/like", "POST", { feedId });
};

export const unlikeFeed = async (feedId: number): Promise<APIFeedResponse> => {
  return makeFeedFetchRequest(`/feed/unlike?feedId=${feedId}`, "DELETE");
};

export const followUser = async (userId: number): Promise<APIFeedResponse> => {
  return makeFeedFetchRequest(`/user/follow?followedId=${userId}`, "POST");
};

export const unfollowUser = async (userId: number): Promise<APIFeedResponse> => {
  return makeFeedFetchRequest(`/user/unfollow?followedId=${userId}`, "DELETE");
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

export const reportFeed = (feedId: number, reportReason: string): Promise<any> => {
  return makeFeedFetchRequest(`/feed/report`, "POST", { feedId, reportReason });
};

export const reportReply = (replyId: number, reportReason: string): Promise<any> => {
  return makeFeedFetchRequest(`/reply/report`, "POST", { replyId, reportReason });
};

export const searchUser = async (keyword: string): Promise<APIUserSearchResponse> => {
  return makeFeedFetchRequest(`/user/search?keyword=${keyword}`);
};

export const updateFeed = async (feedId: number, content: string): Promise<APIReplyPostResponse> => {
  return makeFeedFetchRequest(`/api/feed/update`, "PATCH", { content, feedId });
};
