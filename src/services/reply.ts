import { userRequest } from "@services";
import { APIReplyListResponse, PostReplyType } from "@@types/reply";

/** 댓글 내역 요청 */
export const getReplyList = async (feedId: number): Promise<APIReplyListResponse> => {
  const { data } = await userRequest.get(`api/reply/${feedId}?last=0`);
  return data;
};

/** 댓글 등록 */
export const saveReply = async (feedId: number, replyContent: PostReplyType) => {
  const { data } = await userRequest.post(`api/reply/${feedId}`, replyContent);
  return data;
};

/** 댓글 삭제 */
export const deleteReply = async (feedId: number) => {
  const { data } = await userRequest.delete(`api/reply/${feedId}`);
  return data;
};

/** 댓글 신고 */
export const reportReply = async (replyId: number, reportReason: string) => {
  const res = await userRequest.post(`api/reply/report`, { replyId, reportReason });
  return res;
};
