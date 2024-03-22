import { APIResponseType } from "@@types/apiResponse";

export type AreaType = {
  [key: string]: {
    [key: string]: string[];
  };
};

export interface RestaurantFeed {
  feedId: number;
  thumbnailUrl: string;
}

export interface RecommendedRestaurant {
  restaurantId: number;
  name: string;
  roadAddress: string;
  category: string;
  feedList: RestaurantFeed[];
}

export interface APIRecommendedResponse extends APIResponseType {
  response: {
    restaurantList: RecommendedRestaurant[];
  };
}

export interface RegionType {
  city: string;
  doName: string;
  sigungu: string;
}
