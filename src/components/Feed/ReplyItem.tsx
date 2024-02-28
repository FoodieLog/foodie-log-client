"use client";
import React, { useState } from "react";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { getTimeDiff } from "@utils/date";
import { ReplyItemProps } from "@@types/reply";
import { useUserStore } from "@store/useUserStore";
import DropDown from "@components/Common/DropDown/DropDown";

function ReplyItem({ reply, userId, deleteReplyHandler }: ReplyItemProps) {
  const [expandedReplies, setExpandedReplies] = useState<number[]>([]);
  const { id, nickName } = useUserStore((state) => state.user);
  const { id: replyId, nickName: replyNickName, profileImageUrl, content, createdAt } = reply;
  const timeDifference = getTimeDiff(dayjs(createdAt));

  return (
    <li className="flex items-center justify-between px-5 py-[19px] hover:bg-gray-1   border-b">
      <div className="flex items-center">
        <Link href={userId === id ? `/main/mypage` : `/main/${userId}`} className="flex w-12 h-12 flex-shrink-0 mr-3.5">
          <Image
            src={profileImageUrl || "/images/userImage.png"}
            alt={profileImageUrl ? `${replyNickName} 프로필 사진` : "푸디로그 프로필 기본 이미지"}
            width={48}
            height={48}
            className="w-full h-full border rounded-full cursor-pointe"
          />
        </Link>
        <div>
          <div className="flex items-center">
            <Link href={userId === id ? `/main/mypage` : `/main/${userId}`} className="cursor-pointer mr-1.5">
              <span className="text-base font-medium">{replyNickName}</span>
            </Link>
            <span className="text-xs text-gray-4">{timeDifference}</span>
          </div>
          <div>
            {content.length > 60 && !expandedReplies.includes(replyId) ? (
              <>
                {content.substring(0, 60) + "... "}
                <button className="text-blue-500" onClick={() => setExpandedReplies((prev) => [...prev, replyId])}>
                  더보기
                </button>
              </>
            ) : (
              <>
                <p className="text-base text-gray-8 text-regular">{content}</p>
                {expandedReplies.includes(replyId) && (
                  <button
                    className="text-blue-500"
                    onClick={() => setExpandedReplies((prev) => prev.filter((id) => id !== replyId))}
                  >
                    접기
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <DropDown
          name={replyNickName}
          option={replyNickName === nickName ? "본인댓글" : "타인"}
          id={replyId}
          type={"댓글"}
          removeHandler={() => {
            deleteReplyHandler(replyId);
          }}
        />
      </div>
    </li>
  );
}

export default ReplyItem;
