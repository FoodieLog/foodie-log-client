import ShopCard from "@/src/components/Common/Card/ShopCard";
import { RecommendedRestaurant } from "@@types/recommend";
import ShopFeedList from "@components/Restaurant/ShopFeedList";

export const defaultThumbnailImage = "/icon-256x256.png";
const MIN_LIST_COUNT = 3;

const ShopThumb: React.FC<RecommendedRestaurant> = ({
  restaurantId: id,
  name,
  category = "",
  roadAddress,
  feedList,
}) => {
  const fillDefaultThumbnails = () => {
    const defaultImgCount = MIN_LIST_COUNT - feedList.length;
    const defaultImgs = Array.from({ length: defaultImgCount }, (_, idx) => ({
      feedId: idx,
      thumbnailUrl: defaultThumbnailImage,
    }));
    return [...feedList, ...defaultImgs];
  };

  const feedListToShow = feedList.length < MIN_LIST_COUNT ? fillDefaultThumbnails() : feedList;

  return (
    <div className="mt-2 w-full max-w-[640px] border-b rounded-sm px-1 pb-1">
      <ShopCard id={id} name={name} category={category} roadAddress={roadAddress} />
      <div className="flex gap-1">
        <ShopFeedList feedList={feedListToShow} name={name} />
      </div>
    </div>
  );
};

export default ShopThumb;
