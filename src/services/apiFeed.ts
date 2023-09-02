// apiFeed.ts

import { useUserStore } from "../store/useUserStore";

const BASE_URL = "http://15.165.93.123:8080/api";

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

export const makeFeedFetchRequest = async (
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: any
): Promise<APIFeedResponse> => {
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
            content: []
        },
        error: null
    };
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

