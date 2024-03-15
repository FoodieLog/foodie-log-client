"use client";
import Header from "@components/Common/Header";
import Feeds from "@components/Feed/Feeds";
import { useSearchParams } from "next/navigation";

const UserSingleFeed = () => {
  const params = useSearchParams();
  const feedId = params.get("feedId");
  const feedsId = params.get("feedsId");

  const feedsData = {
    singleFeedId: feedId ? Number(feedId) : undefined,
    startingFeedId: feedsId ? Number(feedsId) : undefined,
  };

  return (
    <div className="w-full max-w-[640px] mx-auto">
      <Header title="피드" back="prePage" />
      <Feeds {...feedsData} />
    </div>
  );
};

export default UserSingleFeed;
