import { RecommendedRestaurant } from "@@types/recommend";
import ShopCard from "@components/Common/Card/ShopCard";
import ShopFeedList from "@components/Restaurant/ShopFeedList";
import useRecommendQuery from "@hooks/queries/useRecommendQuery";

interface ShopThumbListProps {
  searchQuery: string;
}

function ShopThumbList({ searchQuery }: ShopThumbListProps) {
  const { data } = useRecommendQuery(searchQuery);

  if (!data) return;
  const restaurants: RecommendedRestaurant[] = data.data.response.restaurantList;

  return (
    <ul className="w-full flex flex-col items-center pt-2.5">
      {restaurants.map((restaurant) => {
        const { restaurantId, name, category, roadAddress, feedList } = restaurant;
        return (
          <li key={restaurant.restaurantId} className="w-full border-b py-[24px]">
            <ShopCard
              id={restaurantId}
              name={name}
              category={category}
              roadAddress={roadAddress}
              href={`/main/restaurants/reviews/${restaurantId}`}
            />
            <ShopFeedList restaurantId={restaurantId} feedList={feedList} name={name} />
          </li>
        );
      })}
    </ul>
  );
}

export default ShopThumbList;
