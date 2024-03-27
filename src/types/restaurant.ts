import { Content } from "@@types/feed";
import { APIResponseType } from "@@types/apiResponse";

export interface RecommendAPIResponse extends APIResponseType {
  response: {
    restaurantInfo: {
      restaurant: RestaurantWithPositionType;
      isLiked: IsLiked;
    };
    content: Content[];
  };
}

export interface RestaurantType {
  id: number;
  name: string;
  category: string;
  link: string;
  roadAddress: string;
}

export interface RestaurantWithPositionType {
  name: string;
  category: string;
  link: string;
  roadAddress: string;
  mapX: string;
  mapY: string;
}

export interface IsLiked {
  id: number | null;
  liked: boolean;
}

export type RestaurantCategory =
  | ""
  | "korean"
  | "western"
  | "asian"
  | "bar"
  | "cafe"
  | "dessert"
  | "japanese"
  | "snack"
  | "etc";

export type RestaurantSortType = "latest" | "popular";
