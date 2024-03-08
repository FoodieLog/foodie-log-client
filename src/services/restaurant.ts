import { userRequest } from "@services";
import { RecommendAPIRespose } from "@@types/restaurant";

export const getRestaurantDetail = async (restaurantId: number): Promise<RecommendAPIRespose> => {
  const res = await userRequest.get(`/api/restaurant/${restaurantId}`);
  return res.data;
};

export const getRecommendedRestaurant = async (region: string) => {
  const res = await userRequest.get(`/api/restaurant/recommended?address=${region}`);
  return res;
};

// export const likeRestaurant = (data: LikeRestaurantBody): Promise<APIResponse> => {
//   return makeFetchRequest(`/like`, "POST", data);
// };

// export const getMyRestaurant = (): Promise<APIResponse> => {
//   return makeFetchRequest(`/map/liked`);
// };

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
