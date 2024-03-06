import { useUserStore } from "@store/useUserStore";
import { APIRecommendedResponse } from "@@types/recommend";

const BASE_URL = "https://api.foodielog-server.monster/api/restaurant";

export type APIResponse = {
  status: number;
  response: {
    restaurantInfo: {
      restaurant: Restaurant;
      isLiked: IsLiked;
    };
    content: Content[];
  };
  error: any;
};

export type Restaurant = {
  name: string;
  category: string;
  link: string;
  roadAddress: string;
  mapX: string;
  mapY: string;
};

export type IsLiked = {
  id: number | null;
  liked: boolean;
};

type FeedImage = {
  imageUrl: string;
};

export type Feed = {
  feedId: number;
  nickName: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  feedImages: FeedImage[];
  content: string;
  likeCount: number;
  replyCount: number;
  share: any;
};

export type Content = {
  feed: Feed;
  restaurant: Restaurant & { id: number };
  followed: boolean;
  liked: boolean;
};

export const makeFetchRequest = async <T>(
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
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getRestaurantDetail = (restaurantId: number): Promise<APIResponse> => {
  return makeFetchRequest(`/${restaurantId}`);
};

export const getRestaurantRecommended = async (region: string): Promise<APIRecommendedResponse> => {
  return makeFetchRequest<APIRecommendedResponse>(`/recommended?address=${region}`);
};

// export const likeRestaurant = (data: LikeRestaurantBody): Promise<APIResponse> => {
//   return makeFetchRequest(`/like`, "POST", data);
// };

// export const getMyRestaurant = (): Promise<APIResponse> => {
//   return makeFetchRequest(`/map/liked`);
// };
