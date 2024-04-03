"use client";
import { useState } from "react";
import Link from "next/link";
import { FeedReplyType } from "@@types/reply";
import { useUserStore } from "@store/useUserStore";
import DropDown from "@components/Common/DropDown/DropDown";
import ReplyContent from "@components/Feed/ReplyContent";
import UserThumbImg from "@components/Common/Profile/UserThumbImg";
import NestedReplyItem from "@components/Feed/NestedReplyItem";

interface FeedReplyItemProps {
  feedId: number;
  reply: FeedReplyType;
  userId: number;
  setReplyParentNum: React.Dispatch<React.SetStateAction<number | null>>;
}

function FeedReplyItem({ feedId, reply, userId, setReplyParentNum }: FeedReplyItemProps) {
  const {
    user: { nickName },
  } = useUserStore();
  const { id: replyId, userId: replyUserId, nickName: replyNickName, profileImageUrl, childList } = reply;
  const [showMore, setShowMore] = useState(false);

  const addReplyToReply = () => {
    setReplyParentNum(replyId);
  };

  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };
  return (
    <li className="group flex flex-col px-5 py-4 border-b">
      <div className="flex items-start relative">
        <Link href={`/main/${replyUserId}`} className="flex w-12 h-12 flex-shrink-0 mr-3.5">
          <UserThumbImg src={profileImageUrl} alt={`${replyNickName} 프로필 이미지`} />
        </Link>
        <div className="flex flex-col items-start gap-2">
          <ReplyContent userId={userId} reply={reply} />
          <button className="text-gray-4 text-sm cursor-pointer" onClick={addReplyToReply}>
            답글
          </button>
          {childList.length !== 0 && (
            <button className="text-gray-4 text-sm cursor-pointer" onClick={toggleShowMore}>
              {`- 답글 ${childList.length}개 ${showMore ? "닫기" : "더보기"}`}
            </button>
          )}
        </div>
        <div className="ml-auto">
          <DropDown
            name={replyNickName}
            option={replyNickName === nickName ? "본인댓글" : "타인"}
            feedId={feedId}
            replyId={replyId}
            type={"댓글"}
          />
        </div>
      </div>
      {showMore && childList.length !== 0 && (
        <ul className="mt-4 pl-[62px] flex flex-col gap-4">
          {childList.map((reply) => (
            <NestedReplyItem key={reply.id} reply={reply} feedId={feedId} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default FeedReplyItem;
