import { userRequest } from "@services";

export const getRestaurantDetail = async (restaurantId: number) => {
  const res = await userRequest.get(`/api/restaurant/${restaurantId}`);
  return res;
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
