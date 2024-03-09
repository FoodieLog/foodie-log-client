import { RestaurantFeed } from "@@types/recommend";
import { DEFAULT_IMAGE } from "@components/Restaurant/ShopFeedList";
import ImageThumbnail from "@components/Common/ImageThumbnail";

export interface ShopFeedItemProps {
  feed: RestaurantFeed;
  name: string;
}

function ShopFeedItem({ feed, name }: ShopFeedItemProps) {
  const { thumbnailUrl } = feed;

  return (
    <div className="relative">
      <div style={{ paddingBottom: "100%" }}></div>
      <ImageThumbnail
        imageSrc={thumbnailUrl}
        imageAlt={thumbnailUrl === DEFAULT_IMAGE ? "기본 이미지" : `${name} 음식 이미지`}
      />
    </div>
  );
}

export default ShopFeedItem;
