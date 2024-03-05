import { FeedData } from "@/src/types/apiTypes";

export interface FeedEditModalProps {
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface FeedSharedProps {
  Id: string;
}

export interface ReplyListProps {
  id: string;
}

export type Content = {
  feed: {
    userId: number;
    nickName: string;
    profileImageUrl: string | null;
    feedId: number;
    createdAt: string;
    updatedAt: string;
    feedImages: { imageUrl: string }[];
    content: string;
    likeCount: number;
    replyCount: number;
  };
  restaurant: {
    id: number;
    name: string;
    category: string;
    link: string;
    roadAddress: string;
  };
  followed: boolean;
  liked: boolean;
};

export type APISingleFeedResponse = {
  status: number;
  response: {
    content: Content;
  };
  error: any;
};

export type APIFeedResponse = {
  data: React.SetStateAction<Content[]>;
  status: number;
  response: {
    content: Content[];
  };
  error: any;
};

export type FeedShared = {
  nickName: string;
  profileImageUrl: string | null;
  feedId: number;
  createdAt: string;
  updatedAt: string;
  feedImages: {
    imageUrl: string;
  }[];
  restaurant: {
    id: number;
    name: string;
    category: string;
    link: string;
    roadAddress: string;
  };
  content: string;
  likeCount: number;
  replyCount: number;
};
