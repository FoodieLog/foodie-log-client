import React from "react";
import { Content } from "@@types/feed";
import { Dissatisfied } from "@assets/icons";
import FeedThumbnailList from "@components/Common/Thumbnail/FeedThumbnailList";

interface RestaurantFeedListProps {
  feedList: Content[];
  restaurantName: string;
}
function RestaurantFeedList({ feedList, restaurantName }: RestaurantFeedListProps) {
  if (!feedList.length) {
    return (
      <div className="mt-[140px] flex flex-col items-center gap-4">
        <Dissatisfied />
        <div>
          <span className="text-red font-semibold">{restaurantName}</span> 피드가 없습니다
        </div>
      </div>
    );
  }
  return (
    <ul className="grid grid-cols-3 gap-x-px gap-y-0.5 px-0.5 ">
      <FeedThumbnailList feedList={feedList} />
    </ul>
  );
}

export default RestaurantFeedList;
