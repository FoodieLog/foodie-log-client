import RestaurantFeedsList from "@/src/components/Restaurant/RestaurtandFeedsList";
import Header from "@components/Common/Header";

interface RestaurantFeedProps {
  params: {
    restaurantId: string;
  };
}

const RestaurantFeed = ({ params: { restaurantId } }: RestaurantFeedProps) => {
  return (
    <div>
      <Header title="피드" back="prePage" />
      <RestaurantFeedsList restaurantId={restaurantId} />
    </div>
  );
};

export default RestaurantFeed;
