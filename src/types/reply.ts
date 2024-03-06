export type FeedReplyType = {
  id: number;
  userId: number;
  nickName: string;
  profileImageUrl: string | null;
  content: string;
  createdAt: string;
};
export type AuthorType = {
  userId: number;
  nickName: string;
  profileImageUrl: string | null;
  content: string;
  createdAt: string;
  replyList: FeedReplyType[];
};

export type APIReplyListResponse = {
  status: number;
  response: AuthorType;
  error: any;
};
