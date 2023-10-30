"use client";

import BackButtonMain from "@/src/components/Common/Button/BackButtonMain";
import Feeds from "@/src/components/Feed/Feeds";
import { useSearchParams } from "next/navigation";

interface userFeedListProps {
  params: {
    id: string;
  };
}

const UserFeedList = ({ params: { id } }: userFeedListProps) => {
  const params = useSearchParams();
  const feedId = params.get("feedId") || undefined;

  const userId = Number(id);
  const startingFeedId = feedId ? Number(feedId) : undefined;
  return (
    <div className="w-full max-w-[640px] mx-auto">
      <BackButtonMain />
      <Feeds id={userId} startingFeedId={startingFeedId} />
    </div>
  );
};

export default UserFeedList;
