"use client";
import { useState } from "react";
import { ReplyListProps } from "@@types/feed";
import FeedReplyItem from "@components/Feed/FeedReplyItem";
import FeedReplyInput from "@components/Feed/FeedReplyInput";
import useReplyList from "@hooks/queries/useReplyList";
import CloseSmall from "@assets/icons/common/close_small.svg";

const FeedReplyList: React.FC<ReplyListProps> = ({ id: feedId }) => {
  const { data } = useReplyList(Number(feedId));
  const [replyParentNum, setReplyParentNum] = useState<number | null>(null);
  const replyParentUser = data?.replyList.find((reply) => reply.id === replyParentNum)?.nickName;

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
      {replyParentNum && (
        <div className="fixed bottom-14 bg-gray-1 w-full flex justify-between px-3 py-2 rounded-t-lg text-gray-10">
          <span>{replyParentUser}님에게 댓글 작성 중</span>
          <button
            type="button"
            onClick={() => {
              setReplyParentNum(null);
            }}
          >
            <CloseSmall />
          </button>
        </div>
      )}
      <FeedReplyInput feedId={Number(feedId)} replyParentNum={replyParentNum} setReplyParentNum={setReplyParentNum} />
    </>
  );
};

export default FeedReplyList;
