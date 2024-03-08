import { Content } from "@@types/feed";

export interface RecommendAPIRespose {
  status: number;
  response: {
    restaurantInfo: {
      restaurant: RestaurantWithPositionType;
      isLiked: IsLiked;
    };
    content: Content[];
    error: any;
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
