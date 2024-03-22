import { userRequest } from "@services";
import { RecommendAPIResponse } from "@@types/restaurant";

export const getRestaurantDetail = async (restaurantId: number): Promise<RecommendAPIResponse> => {
  const res = await userRequest.get(`/api/restaurant/${restaurantId}`);
  return res.data;
};

export const getRecommendedRestaurant = async (region: string) => {
  const res = await userRequest.get(`/api/restaurant/recommended?address=${region}`);
  return res;
};

export const getLikedShop = async () => {
  const res = await userRequest.get(`/api/restaurant/map/liked`);
  return res;
};

export const likeRestaurant = async (restaurantId: number) => {
  const res = await userRequest.post(`/api/restaurant/like?restaurantId=${restaurantId}`);
  return res;
};

export const unlikeRestaurant = async (restaurantId: number) => {
  const res = await userRequest.delete(`/api/restaurant/unlike?restaurantId=${restaurantId}`);
  return res;
};
