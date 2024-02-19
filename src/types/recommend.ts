export type AreaType = {
  [key: string]: {
    [key: string]: string[];
  };
};

export interface AreaSelectorProps {
  onSelectedAreaChange: (searchQuery: string) => void;
}

export interface AreaListProps {
  optionList: string[];
}

export interface AreaOptionItemProps {
  optionItem: string;
}

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

export interface APIRecommendedResponse {
  status: number;
  response: {
    restaurantList: RecommendedRestaurant[];
  };
  error: any;
}

export interface ShopFeedListProps {
  feedList: RestaurantFeed[];
  name: string;
}

export interface ShopFeedItemProps {
  feed: RestaurantFeed;
  name: string;
}
