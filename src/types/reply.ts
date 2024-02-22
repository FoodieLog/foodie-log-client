export type APIReplyListResponse = {
  status: number;
  response: {
    userId: number;
    nickName: string;
    profileImageUrl: string | null;
    content: string;
    createdAt: string;
    replyList: {
      id: number;
      userId: number;
      nickName: string;
      profileImageUrl: string | null;
      content: string;
      createdAt: string;
    }[];
  };
  error: any;
};
