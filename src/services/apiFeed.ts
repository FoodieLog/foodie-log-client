// apiFeed.ts
import { userRequest } from "@/src/services";
import { useUserStore } from "@/src/store/useUserStore";
import { Notification } from "@/src/types/apiTypes";
import { getCookie } from "@/src/utils/token";
import { expiryTime } from "../utils/date";

const BASE_URL = "https://api.foodielog-server.monster/api";

interface APIResponse<T> {
  status: number;
  response: {
    content: T;
  };
  error: any;
}

export type APIFeedResponse = {
  status: number;
  response: {
    content: Content[];
  };
  error: any;
};

export type APISingleFeedResponse = {
  status: number;
  response: {
    content: Content;
  };
  error: any;
};

export type Content = {
  feed: {
    userId: number;
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

type HeadersType = {
  "Content-Type": string;
  Authorization?: string;
};

export const makeFeedFetchRequest = async <T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
  body?: any,
  retryCount: number = 0,
  skipReissue: boolean = false,
  includeToken: boolean = true
): Promise<T> => {
  const accessToken = useUserStore.getState().user.accessToken;

  const headers: HeadersType = {
    "Content-Type": "application/json",
  };

  if (includeToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers,
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

    if (response.status === 400 && !skipReissue) {
      if (retryCount >= 2) {
        throw new Error("Maximum retry attempts reached.");
      }

      try {
        const reissueResponse = await reissueTokens();
        if (reissueResponse.status === 201 && reissueResponse.response && reissueResponse.response.accessToken) {
          // 새로 발급받은 accessToken 설정
          useUserStore.getState().setUser({ accessToken: reissueResponse.response.accessToken });
          useUserStore.getState().setTokenExpiry(expiryTime);
          // 토큰 재발급 후 다시 해당 API를 호출
          return await makeFeedFetchRequest(endpoint, method, body, retryCount + 1);
        } else {
          if (retryCount >= 2) {
            alert("토큰이 유효하지 않습니다. 다시 로그인해 주세요!");
            // Logout();
          }
        }
      } catch (reissueError) {
        console.error("Error while reissuing token:", reissueError);
        throw reissueError;
      }
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

export const getFeedList = (feedId: number): Promise<APIFeedResponse> => {
  if (feedId === 0) {
    return makeFeedFetchRequest(`/feed/list`);
  } else return makeFeedFetchRequest(`/feed/list?feedId=${feedId}`);
};

export const getSingleFeed = (feedId: number): Promise<APISingleFeedResponse> => {
  return makeFeedFetchRequest(`/feed/${feedId}`);
};

export const getFeedListByUserId = (userId: number, feedId: number): Promise<APIFeedResponse> => {
  if (feedId === 0) {
    return makeFeedFetchRequest(`/user/${userId}/feed`);
  } else return makeFeedFetchRequest(`/user/${userId}/feed/?feedId=${feedId}`);
};

export const getNotificationList = (): Promise<APIResponse<Notification[]>> => {
  return makeFeedFetchRequest("/notification/list");
};

export const sendFcmToken = async (fcmToken: string): Promise<any> => {
  return makeFeedFetchRequest("/notification/push", "POST", { fcmToken });
};

export const getFeedShared = (feedId: number): Promise<GetFeedSharedResponse> => {
  return makeFeedFetchRequest<GetFeedSharedResponse>(`/feed/detail/${feedId}`, "GET", undefined, 0, false, false);
};

export const likeFeed = async (feedId: number): Promise<APIFeedResponse> => {
  return makeFeedFetchRequest("/feed/like", "POST", { feedId });
};

export const unlikeFeed = async (feedId: number): Promise<APIFeedResponse> => {
  return makeFeedFetchRequest(`/feed/unlike?feedId=${feedId}`, "DELETE");
};

export const deleteFeed = async (feedId: number) => {
  const res = await userRequest.delete(`api/feed/${feedId}`);
  return res.data;
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

export const updateFeed = async (feedId: number, content: string) => {
  const res = await userRequest.patch(`api/feed/${feedId}`, { content });
  return res.data;
};

export const getLikedShop = async () => {
  return makeFeedFetchRequest(`/restaurant/map/liked`);
};

export const likeRestaurant = async (restaurantId: number): Promise<void> => {
  await makeFeedFetchRequest(`/restaurant/like?restaurantId=${restaurantId}`, "POST");
};

export const unlikeRestaurant = async (restaurantId: number): Promise<void> => {
  await makeFeedFetchRequest(`/restaurant/unlike?restaurantId=${restaurantId}`, "DELETE");
};

// export const reissueTokens = async (): Promise<any> => {
//   return makeFeedFetchRequest("/auth/reissue", "GET", undefined, 0, true);
// };

export const reissueTokens = async () => {
  const refreshToken = getCookie("refreshToken");
  const res = await userRequest.get(`/api/auth/reissue`, {
    headers: {
      Cookie: refreshToken,
    },
  });
  return res.data;
};
