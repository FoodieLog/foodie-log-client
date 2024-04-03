import React from "react";
import Link from "next/link";
import TimeStamp from "@components/Common/Tag/TimeStamp";
import { useUserStore } from "@store/useUserStore";
import { FeedReplyType } from "@@types/reply";

interface ReplyContentProps {
  userId: number;
  reply: FeedReplyType;
}

function ReplyContent({ userId, reply }: ReplyContentProps) {
  const { nickName, createdAt, content, mentionList } = reply;

  const replaceMentionStyle = () => {
    const splitedReply = content.split(" ");
    mentionList.map(({ userId, nickName }) => {
      const mentionIdx = splitedReply.indexOf(`@[${nickName}](${userId})`);
      splitedReply[mentionIdx] = `@${nickName}`;
    });

    const replaceContent = splitedReply.map((reply) => {
      if (reply.includes("@")) {
        return (
          <span key={reply} className="font-semibold">
            {reply}&nbsp;
          </span>
        );
      }
      return <span key={reply}>{reply} </span>;
    });

    return replaceContent;
  };

  return (
    <div className="flex flex-col items-start gap-[8px]">
      <div className="flex items-center">
        <Link href={`/main/${userId}`} className="cursor-pointer mr-1.5">
          <span className="text-base font-semibold">{nickName}</span>
        </Link>
        <TimeStamp createdAt={createdAt} styles="group-hover:text-red group-hover:bg-transparent" />
      </div>
      <p className="text-base text-gray-8 text-regular">{mentionList.length === 0 ? content : replaceMentionStyle()}</p>
    </div>
  );
}

export default ReplyContent;
