"use client";
import Header from "@components/Common/Header";
import Feeds from "@components/Feed/Feeds";
import { useSearchParams } from "next/navigation";

const UserSingleFeed = () => {
  const params = useSearchParams();
  const feedId = params.get("feedId");
  const isFeeds = params.get("feeds");

  const feedsData = {
    singleFeedId: isFeeds ? undefined : Number(feedId),
    startingFeedId: isFeeds ? Number(feedId) : undefined,
  };

  return (
    <div className="w-full max-w-[640px] mx-auto">
      <Header title="피드" back="prePage" />
      <Feeds {...feedsData} />
    </div>
  );
};

export default UserSingleFeed;
