import { userRequest } from "@services";
import { RecommendAPIResponse, RecommendListAPIResponse, RestaurantSortType } from "@@types/restaurant";

export const getRestaurantDetail = async (
  restaurantId: number,
  sort?: RestaurantSortType
): Promise<RecommendAPIResponse> => {
  const { data } = await userRequest.get(`/api/restaurant/${restaurantId}?sort=${sort || "latest"}`);
  return data;
};

export const getRecommendedRestaurant = async (region: string): Promise<RecommendListAPIResponse> => {
  const { data } = await userRequest.get(`/api/restaurant/recommended?address=${region}`);
  return data;
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
