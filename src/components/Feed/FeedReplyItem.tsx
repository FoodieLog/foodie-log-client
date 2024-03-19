"use client";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { deleteReply } from "@services/reply";
import { APIReplyListResponse, FeedReplyType } from "@@types/reply";
import { useUserStore } from "@store/useUserStore";
import { useToast } from "@/components/ui/use-toast";
import DropDown from "@components/Common/DropDown/DropDown";
import TimeStamp from "@components/Common/Tag/TimeStamp";

interface FeedReplyItemProps {
  reply: FeedReplyType;
  userId: number;
  setReplies: Dispatch<SetStateAction<APIReplyListResponse["response"]["replyList"]>>;
}

function FeedReplyItem({ reply, userId, setReplies }: FeedReplyItemProps) {
  const [expandedReplies, setExpandedReplies] = useState<number[]>([]);
  const { id, nickName } = useUserStore((state) => state.user);
  const { id: replyId, nickName: replyNickName, profileImageUrl, content, createdAt } = reply;

  const { toast } = useToast();

  const deleteReplyHandler = async (replyId: number) => {
    try {
      await deleteReply(replyId);
      setReplies((prevReplies) => prevReplies.filter((reply) => reply.id !== replyId));
    } catch (error) {
      toast({ title: "삭제 오류 발생", description: "처리 중에 오류가 발생하였습니다." });
    }
  };

  return (
    <li className="group flex items-center justify-between py-4 border-b">
      <div className="flex items-center">
        <Link href={userId === id ? `/main/mypage` : `/main/${userId}`} className="flex w-12 h-12 flex-shrink-0 mr-3.5">
          <Image
            src={profileImageUrl || "/images/userImage.png"}
            alt={profileImageUrl ? `${replyNickName} 프로필 사진` : "푸디로그 프로필 기본 이미지"}
            width={48}
            height={48}
            className="w-full h-full rounded-full"
          />
        </Link>
        <div>
          <div className="flex items-center">
            <Link href={userId === id ? `/main/mypage` : `/main/${userId}`} className="cursor-pointer mr-1.5">
              <span className="text-base">{replyNickName}</span>
            </Link>
            <TimeStamp createdAt={createdAt} />
          </div>
          <p className="text-base text-gray-8 text-regular">{content}</p>
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

export default FeedReplyItem;
