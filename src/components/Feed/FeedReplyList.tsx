"use client";
import { useState } from "react";
import { ReplyListProps } from "@@types/feed";
import FeedReplyItem from "@components/Feed/FeedReplyItem";
import FeedReplyInput from "@components/Feed/FeedReplyInput";
import useReplyList from "@hooks/queries/useReplyList";

const FeedReplyList: React.FC<ReplyListProps> = ({ id: feedId }) => {
  const { data } = useReplyList(Number(feedId));
  const [replyParentNum, setReplyParentNum] = useState<number | null>(null);

  return (
    <>
      <div className="w-full h-full flex flex-col justify-between pb-[60px]">
        <ul className="h-full">
          {data?.replyList.map((reply) => (
            <FeedReplyItem
              key={reply.id}
              feedId={Number(feedId)}
              reply={reply}
              userId={data.author.userId}
              setReplyParentNum={setReplyParentNum}
            />
          ))}
        </ul>
      </div>
      <FeedReplyInput feedId={Number(feedId)} replyParentNum={replyParentNum} setReplyParentNum={setReplyParentNum} />
    </>
  );
};

export default FeedReplyList;
