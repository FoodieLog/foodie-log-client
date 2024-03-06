import Link from "next/link";
import Image from "next/image";
import TimeStamp from "@components/Common/Tag/TimeStamp";
import { FeedData } from "@@types/apiTypes";
import { BasicThumbnail } from "@assets/images";
import { useUserStore } from "@store/useUserStore";

interface FeedUserCardProps {
  data: FeedData["feed"];
}
function FeedUserCard({ data }: FeedUserCardProps) {
  const { id } = useUserStore((state) => state.user);

  return (
    <div className="flex items-center">
      <Link href={data.userId === id ? "/main/mypage" : `/main/${data.userId}`} className="relative w-12 h-12">
        <Image
          fill={true}
          src={data.profileImageUrl || BasicThumbnail}
          alt="사용자 썸네일"
          className="w-12 h-12 rounded-full cursor-pointer"
        />
      </Link>
      <div className="flex flex-1 flex-col ml-[12px] gap-[4px]">
        <Link href={data.userId === id ? "/main/mypage" : `/main/${data.userId}`}>
          <p className="text-[16px]">{data.nickName}</p>
        </Link>
        <TimeStamp createdAt={data.createdAt} />
      </div>
    </div>
  );
}

export default FeedUserCard;
