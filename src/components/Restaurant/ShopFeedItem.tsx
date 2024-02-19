import Link from "next/link";
import Image from "next/image";
import { ShopFeedItemProps } from "@/src/types/recommend";
import { defaultThumbnailImage } from "@/src/components/Restaurant/ShopThumb";

const ShopFeedItem: React.FC<ShopFeedItemProps> = ({ feed, name }) => {
  const { feedId, thumbnailUrl } = feed;

  return (
    <div className="w-1/3 border">
      <Link href={`/main/restaurants/${feedId}`}>
        <div className="relative">
          <div style={{ paddingBottom: "100%" }}></div>
          <Image
            src={thumbnailUrl}
            alt={thumbnailUrl === defaultThumbnailImage ? "기본 이미지" : `${name} 음식 이미지`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
          />
        </div>
      </Link>
    </div>
  );
};

export default ShopFeedItem;
