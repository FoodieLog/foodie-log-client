import { APIResponseType } from "@@types/apiResponse";

export type FeedReplyType = {
  id: number;
  userId: number;
  nickName: string;
  profileImageUrl: string | null;
  content: string;
  createdAt: string;
  childList: FeedReplyType[];
  mentionList: MentionListItemType[];
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
  response: AuthorType;
} & APIResponseType;

export type MentionUserType = {
  id: number;
  nickName: string;
  profileImageUrl: string | null;
  aboutMe: string | null;
};

export type MentionListItemType = {
  nickName: string;
  userId: number;
};

export type PostReplyType = { content: string; mentionedIds: number[]; parentId: number | null };
