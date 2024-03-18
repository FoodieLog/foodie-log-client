import Link from "next/link";
import Image from "next/image";

interface PhotoThumbnailProps {
  imgUrl: string | undefined;
  href: string;
}
function FeedThumbnail({ imgUrl, href }: PhotoThumbnailProps) {
  return (
    <Link href={href} className="relative w-12 h-12 rounded-[4px] overflow-hidden shrink-0">
      <Image src={imgUrl || "/images/userImage.png"} alt="피드 썸네일 이미지" layout="fill" objectFit="cover" />
    </Link>
  );
}

export default FeedThumbnail;
