import { ShopFeedListProps } from "@@types/recommend";
import ShopFeedItem from "@components/Restaurant/ShopFeedItem";

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
