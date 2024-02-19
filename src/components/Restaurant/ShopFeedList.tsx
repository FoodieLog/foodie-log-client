import { ShopFeedListProps } from "@/src/types/recommend";
import ShopFeedItem from "@/src/components/Restaurant/ShopFeedItem";

const ShopFeedList: React.FC<ShopFeedListProps> = ({ feedList, name }) => {
  return (
    <>
      {feedList.map((feed) => (
        <ShopFeedItem key={feed.feedId} feed={feed} name={name} />
      ))}
    </>
  );
};

export default ShopFeedList;
