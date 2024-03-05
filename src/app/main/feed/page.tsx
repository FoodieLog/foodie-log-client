"use client";
import Header from "@components/Common/Header";
import Feeds from "@components/Feed/Feeds";
import { useSearchParams } from "next/navigation";

interface userFeedListProps {
  params: {
    id: string;
  };
}

const UserSingleFeed = () => {
  // 여기서 params가 아니라 쿼리스트링에서 값을 추출해야함.
  // 여기에서 필요없는 부분은 지워주고 쿼리스트링에서 singleFeedId를 추출해오는 로직도 구현해줘.
  const params = useSearchParams();
  const feedId = params.get("feedId") || undefined;

  const singleFeedId = feedId ? Number(feedId) : undefined;

  return (
    <div className="w-full max-w-[640px] mx-auto">
      <Header title="피드" back="prePage" />
      <Feeds singleFeedId={singleFeedId} />
    </div>
  );
};

export default UserSingleFeed;
