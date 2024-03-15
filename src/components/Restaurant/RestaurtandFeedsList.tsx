"use client";

import useRestaurantDetailQuery from "@hooks/queries/useRestaurantDetailQuery";
import Feed from "@components/Feed/Feed";

interface RestaurantFeedsListProps {
  restaurantId: string;
}

const RestaurantFeedsList = ({ restaurantId }: RestaurantFeedsListProps) => {
  const parsedId = parseInt(restaurantId, 10);
  const { data } = useRestaurantDetailQuery(parsedId);

  return (
    <>
      {data?.feedList.map((feedData) => (
        <div key={feedData.feed.feedId}>
          <Feed {...feedData} />
        </div>
      ))}
    </>
  );
};

export default RestaurantFeedsList;
