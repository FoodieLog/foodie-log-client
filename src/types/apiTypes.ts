export type FeedData = {
  feed: {
    id: number;
    nickName: string;
    profileImageUrl: string;
    createdAt: Date;
    updateAt: Date;
    feedImages: {
      ImageUrl: string;
    }[];
    content: string;
    likeCount: number;
    replyCount: number;
    share: string;
  };
  restaurant: {
    id: number;
    name: string;
    category: string;
    link: string;
    roadAddress: string;
  };
  isFollowed: boolean;
  isLiked: boolean;
};
