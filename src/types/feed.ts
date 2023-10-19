import { FeedData } from "@/src/types/apiTypes";

export type FeedProps = FeedData & {
  updateFollowStatus?: (userId: number, newStatus: boolean) => void;
  removeDeletedFeed?: (feedId: number) => void;
};

export interface FeedEditModalProps {
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

export type FeedsProps = {
  id?: number;
  startingFeedId?: number;
  singleFeedId?: number;
};

export interface FeedSharedProps {
  Id: string;
}

export interface FeedImageSlideProps {
  images: { imageUrl: string }[];
}

export interface ReplyListProps {
  id: string;
}
