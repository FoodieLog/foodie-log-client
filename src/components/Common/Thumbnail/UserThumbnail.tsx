import Link from "next/link";
import Image from "next/image";

interface UserThumbnailProps {
  profileImgUrl: string | null;
  userId: string | number;
}

function UserThumbnail({ profileImgUrl, userId }: UserThumbnailProps) {
  return (
    <Link href={`/main/${userId}`} className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
      <Image src={profileImgUrl || "/images/userImage.png"} alt="사용자 썸네일" layout="fill" objectFit="cover" />
    </Link>
  );
}

export default UserThumbnail;
