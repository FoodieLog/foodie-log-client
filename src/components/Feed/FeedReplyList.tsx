"use client";
import { useState, useEffect } from "react";
import { getReplyList } from "@services/reply";
import { ReplyListProps } from "@@types/feed";
import { APIReplyListResponse } from "@@types/reply";
import FeedReplyItem from "@components/Feed/FeedReplyItem";
import FeedReplyInput from "@components/Feed/FeedReplyInput";
import FeedReplyContent from "./FeedReplyContent";

const FeedReplyList: React.FC<ReplyListProps> = ({ id: feedId }) => {
  const initialAuthorState: APIReplyListResponse["response"] = {
    userId: 0,
    nickName: "",
    profileImageUrl: null,
    content: "",
    createdAt: "",
    replyList: [],
  };
  const [author, setAuthor] = useState<APIReplyListResponse["response"]>(initialAuthorState);
  const [replies, setReplies] = useState<APIReplyListResponse["response"]["replyList"]>([]);

  useEffect(() => {
    getReply();
  }, [feedId]);

  const getReply = async () => {
    const { response } = await getReplyList(Number(feedId));
    setAuthor(response);
    setReplies(response.replyList);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="px-4">
        <FeedReplyContent data={author} />
        <ul>
          {replies.map((reply) => {
            return <FeedReplyItem key={reply.id} reply={reply} userId={author.userId} setReplies={setReplies} />;
          })}
        </ul>
      </div>
      <FeedReplyInput feedId={feedId} setReplies={setReplies} />
    </div>
  );
};

export default FeedReplyList;
