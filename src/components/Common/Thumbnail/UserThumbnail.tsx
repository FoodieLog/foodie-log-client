import Link from "next/link";
import Image from "next/image";

interface UserThumbnailProps {
  profileImgUrl: string | null;
  userId: string | number;
  size: string;
}

function UserThumbnail({ profileImgUrl, userId, size }: UserThumbnailProps) {
  return (
    <Link href={`/main/${userId}`} className={`${size} relative rounded-full overflow-hidden shrink-0`}>
      <Image src={profileImgUrl || "/images/userImage.png"} alt="사용자 썸네일" layout="fill" objectFit="cover" />
    </Link>
  );
}

export default UserThumbnail;
