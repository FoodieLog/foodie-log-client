import Link from "next/link";
import Image from "next/image";
import TimeStamp from "@components/Common/Tag/TimeStamp";
import FeedContent from "@components/Feed/FeedContent";
import { APIReplyListResponse } from "@@types/reply";
import { useUserStore } from "@store/useUserStore";

interface FeedReplyContentProps {
  data: APIReplyListResponse["response"];
}

function FeedReplyContent({ data }: FeedReplyContentProps) {
  const id = useUserStore((state) => state.user.id);
  return (
    <div className="flex items-center justify-between pb-3 border-b">
      <div className="flex items-center">
        <Link
          href={data.userId === id ? `/main/mypage` : `/main/${data.userId}`}
          className="flex w-12 h-12 flex-shrink-0"
        >
          <Image
            src={data.profileImageUrl || "/images/userImage.png"}
            alt="사용자 썸네일"
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
        <div className="ml-2">
          <div className="flex justify-start items-center gap-3">
            <Link href={data.userId === id ? `/main/mypage` : `/main/${data.userId}`}>
              <span className="text-[16px]">{data.nickName}</span>
            </Link>
            <TimeStamp createdAt={data.createdAt} />
          </div>
          <FeedContent content={data.content} />
        </div>
      </div>
    </div>
  );
}

export default FeedReplyContent;
