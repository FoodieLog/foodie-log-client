"use client";
import { FeedData } from "@@types/apiTypes";
import ShopCard from "@/src/components/Card/ShopCard";
import FeedHeader from "@components/Feed/FeedHeader";
import FeedImageSlide from "@components/Feed/FeedImageSlide";
import FeedInteraction from "@components/Feed/FeedInteraction";
import FeedContent from "@components/Feed/FeedContent";

export type FeedProps = FeedData & {
  // updateFollowStatus?: (userId: number, newStatus: boolean) => void;
  // removeDeletedFeed?: (feedId: number) => void;
};

const Feed = ({ ...feedData }: FeedData) => {
  const { feed, restaurant, followed, liked } = feedData;

  return (
    <div className="mt-2 w-full max-w-[640px] rounded-sm">
      {/* Header */}
      <FeedHeader data={feed} isFollowed={followed} />
      {/* image */}
      <FeedImageSlide images={feed.feedImages} />
      <div className="flex flex-col gap-3 m-[18px]">
        {/* Share, Like, Comment */}
        <FeedInteraction data={feed} isLiked={liked} />
        {/* content */}
        <FeedContent content={feed.content} />
        {/* Restaurant Info*/}
        <ShopCard
          id={restaurant.id}
          name={restaurant.name}
          category={restaurant.category}
          roadAddress={restaurant.roadAddress}
          styles="border border-gray-2"
        />
      </div>
    </div>
  );
};

export default Feed;
