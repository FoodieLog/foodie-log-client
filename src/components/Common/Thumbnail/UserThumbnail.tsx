import Link from "next/link";
import Image from "next/image";

interface UserThumbnailProps {
  profileImgUrl: string | null;
  userId: string | number;
}

function UserThumbnail({ profileImgUrl, userId }: UserThumbnailProps) {
  return (
    <Link href={`/main/${userId}`} className="relative w-12 h-12">
      <div className="flex-none w-12 h-12 relative">
        <Image
          src={profileImgUrl || "/images/userImage.png"}
          alt="사용자 썸네일"
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        />
      </div>
    </Link>
  );
}

export default UserThumbnail;
