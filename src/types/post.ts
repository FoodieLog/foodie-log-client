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

export interface PostData {
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

export interface PostStore {
  content: PostData;
  setContent: (content: PostData) => void;
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
