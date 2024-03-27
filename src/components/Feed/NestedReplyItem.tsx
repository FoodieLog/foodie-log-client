import React from "react";
import { FeedReplyType } from "@@types/reply";
import { useUserStore } from "@store/useUserStore";
import ReplyContent from "@components/Feed/ReplyContent";
import DropDown from "@components/Common/DropDown/DropDown";

interface NestedReplyItemProps {
  reply: FeedReplyType;
  feedId: number;
}
function NestedReplyItem({ reply, feedId }: NestedReplyItemProps) {
  const { id, userId, nickName: replyNickname } = reply;
  const {
    user: { nickName },
  } = useUserStore();
  return (
    <li className="relative">
      <ReplyContent userId={userId} reply={reply} />
      <div className="absolute right-0 top-0">
        <DropDown
          name={replyNickname}
          option={replyNickname === nickName ? "본인댓글" : "타인"}
          feedId={feedId}
          replyId={id}
          type={"댓글"}
        />
      </div>
    </li>
  );
}

export default NestedReplyItem;
