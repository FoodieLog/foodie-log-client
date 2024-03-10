"use client";

import Header from "@components/Common/Header";
import Feed from "@components/Feed/Feed";
import useRestaurantDetailQuery from "@hooks/queries/useRestaurantDetailQuery";

interface RestaurantFeedProps {
  params: {
    restaurantId: string;
  };
}

const RestaurantFeed = ({ params: { restaurantId } }: RestaurantFeedProps) => {
  const parsedId = parseInt(restaurantId, 10);
  const { data } = useRestaurantDetailQuery(parsedId);

  return (
    <div>
      <Header title="피드" back="prePage" />
      {data?.feedList.map((feedData) => (
        <div key={feedData.feed.feedId}>
          <Feed {...feedData} />
        </div>
      ))}
    </div>
  );
};

export default RestaurantFeed;
