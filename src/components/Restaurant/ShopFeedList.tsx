import { RestaurantFeed } from "@@types/recommend";
import ShopFeedItem from "@components/Restaurant/ShopFeedItem";
import Link from "next/link";

export interface ShopFeedListProps {
  restaurantId: number;
  feedList: RestaurantFeed[];
  name: string;
}

export const DEFAULT_IMAGE = "/icon-256x256.png";
const MIN_LIST_COUNT = 3;

function ShopFeedList({ restaurantId, feedList, name }: ShopFeedListProps) {
  const fillDefaultThumbnails = () => {
    const defaultImgCount = MIN_LIST_COUNT - feedList.length;
    const defaultImgs = Array.from({ length: defaultImgCount }, (_, idx) => ({
      feedId: idx,
      thumbnailUrl: DEFAULT_IMAGE,
    }));
    return [...feedList, ...defaultImgs];
  };

  const feedListToShow = feedList.length < MIN_LIST_COUNT ? fillDefaultThumbnails() : feedList;

  return (
    <ul className="flex px-0.5 gap-px mt-[8px]">
      {feedListToShow.map((feed) => (
        <Link href={`/main/restaurants/reviews/${restaurantId}`} key={feed.feedId} className="w-1/3">
          <ShopFeedItem feed={feed} name={name} />
        </Link>
      ))}
    </ul>
  );
}

export default ShopFeedList;
