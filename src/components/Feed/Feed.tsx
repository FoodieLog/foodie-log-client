"use client";
import { FeedData } from "@@types/apiTypes";
import ShopCard from "@components/Common/Card/ShopCard";
import FeedHeader from "@components/Feed/FeedHeader";
import FeedImageSlide from "@components/Feed/FeedImageSlide";
import FeedInteraction from "@components/Feed/FeedInteraction";
import FeedContent from "@components/Feed/FeedContent";

interface FeedProps {
  feedData: FeedData;
  userId?: number | undefined;
}

const Feed = ({ feedData, userId }: FeedProps) => {
  const { feed, restaurant, followed, liked } = feedData;

  return (
    <div className="mt-2 w-full max-w-[640px] rounded-sm">
      <FeedHeader data={feed} isFollowed={followed} userId={userId} />
      <FeedImageSlide images={feed.feedImages} />
      <div className="flex flex-col gap-3 m-[18px]">
        <FeedInteraction data={feed} isLiked={liked} />
        <FeedContent content={feed.content} />
        <ShopCard
          id={restaurant.id}
          name={restaurant.name}
          category={restaurant.category}
          roadAddress={restaurant.roadAddress}
          href={`/main/restaurants/${restaurant.id}`}
          styles="border border-gray-2"
        />
      </div>
    </div>
  );
};

export default Feed;
