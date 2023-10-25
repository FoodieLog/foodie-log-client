export interface ShopProps {
  type: string;
  item: ShopItem;
}

export interface ShopItem {
  id: string;
  place_name: string;
  place_url: string;
  category_name: string;
  address_name: string;
  road_address_name: string;
  phone: string;
  x: string;
  y: string;
}

export interface ShopItemPlus extends ShopItem {
  content: string;
  isLiked: boolean;
}
