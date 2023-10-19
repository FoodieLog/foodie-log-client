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

export interface ThumbnailState {
  feed: Feed;
  restaurant: Restaurant;
  followed: boolean;
  liked: boolean;
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

export interface MyMap {
  userId: number;
  header: string;
}

export interface MyFriendListProps {
  data: ListData[];
  friendListTitle: string;
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  updateFollow: () => Promise<void>;
  updateFollower: () => Promise<void>;
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

export interface MyPageForm extends MyMapProps {
  option: string;
}

export interface MyShopItemProps {
  item: MapItem;
  removeItem: (id: number) => void;
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
