// mypage.ts
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