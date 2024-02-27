export type ReplyType = {
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
  replyList: ReplyType[];
};

export type APIReplyListResponse = {
  status: number;
  response: AuthorType;
  error: any;
};

export interface ReplyItemProps {
  reply: ReplyType;
  userId: number;
  deleteReplyHandler: (replyId: number) => void;
}
