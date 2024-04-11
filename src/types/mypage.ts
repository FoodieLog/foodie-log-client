export interface FeedImage {
  imageUrl: string;
}

export interface Feed {
  userId: number;
  nickName: string;
  profileImageUrl: string | null;
  feedId: number;
  thumbnailUrl: string;
  createdAt: string;
  updatedAt: string;
  feedImages: FeedImage[];
  content: string;
  likeCount: number;
  replyCount: number;
}

export interface Restaurant {
  id: number;
  name: string;
  category: string;
  link: string;
  roadAddress: string;
}

export interface myProfileState {
  aboutMe: string;
  nickName: string;
  feedCount: number;
  follower: number;
  following: number;
  followed: boolean;
  profileImageUrl: string;
  userId: number;
}

export interface MyMapType {
  userId?: number;
  header: string;
}

export interface ListData {
  followed: boolean;
  nickName: string;
  profileImageUrl: string;
  userId: number;
}

export interface MyMapProps {
  userId: number;
}

export interface Mypage extends MyMapProps {
  option: string;
}

export interface MyShopItemProps {
  userId?: number;
  item: MapItem;
}

export interface MapItem {
  isLiked: {
    id: number;
    liked: boolean;
  };
  restaurant: {
    category: string;
    id: number;
    link: string;
    mapX: string;
    mapY: string;
    name: string;
    roadAddress: string;
  };
}

export interface Thumbnail {
  feed: Feed;
  followed: boolean;
  liked: boolean;
  restaurant: Restaurant;
}
