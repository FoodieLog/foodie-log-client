import { APIResponseType } from "@@types/apiResponse";

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

export interface PostStore {
  content: ShopItem;
  setContent: (content: ShopItem) => void;
  files: File[];
  setFiles: (files: File[]) => void;
  previews: string[];
  setPreviews: (previews: string[]) => void;
  resetContent: () => void;
}

export interface PostFeedImageProps {
  imageCount: number;
  onClick: () => void;
}

export interface PostImageListProps extends PostFeedImageProps {
  deleteImageHandler: (e: React.MouseEvent, index: number) => void;
}

export interface PostImageItemProps {
  preview: string;
  idx: number;
  deleteImageHandler: (e: React.MouseEvent, index: number) => void;
}

export interface ShopMetaType {
  pageable_count: number;
  total_count: number;
  _end: boolean;
}

export interface SearchShopAPIResponse extends APIResponseType {
  response: {
    meta: ShopMetaType[];
    documents: ShopItem[];
  };
}
