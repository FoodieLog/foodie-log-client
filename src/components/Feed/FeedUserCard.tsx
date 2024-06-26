import Link from "next/link";
import Image from "next/image";
import TimeStamp from "@components/Common/Tag/TimeStamp";
import Badge from "@assets/icons/common/Badge.svg";
import { FeedData } from "@@types/apiTypes";

interface FeedUserCardProps {
  data: FeedData["feed"];
  timeStamp?: boolean;
  small?: boolean;
}
function FeedUserCard({ data, timeStamp = true, small = false }: FeedUserCardProps) {
  return (
    <div className={`flex items-center  gap-${small ? 2 : 3}`}>
      <Link href={`/main/${data.userId}`} className={`relative w-${small ? 6 : 12} h-${small ? 6 : 12}`}>
        <Image
          fill={true}
          src={data.profileImageUrl || "/images/userImage.png"}
          alt="사용자 썸네일"
          className="fill rounded-full cursor-pointer"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-1">
        <Link href={`/main/${data.userId}`} className="flex items-center gap-1">
          {data.badgeFlag === "Y" && <Badge />}
          <p className={`text-[${small ? 14 : 16}px] ${small && "text-gray-4"}`}>{data.nickName}</p>
        </Link>
        {timeStamp && <TimeStamp createdAt={data.createdAt} />}
      </div>
    </div>
  );
}

export default FeedUserCard;
