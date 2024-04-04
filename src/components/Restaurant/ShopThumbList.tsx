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

  const restaurants: RecommendedRestaurant[] = data.response.restaurantList;

  if (!restaurants.length) {
    return (
      <div className="w-full text-center mt-44 text-gray-10">
        <span className="text-red font-semibold">{`"${searchQuery}"`}</span>에 해당하는 맛집이 없습니다.
      </div>
    );
  }

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
              href={`/main/recommend/reviews/${restaurantId}`}
            />
            <ShopFeedList restaurantId={restaurantId} feedList={feedList} name={name} />
          </li>
        );
      })}
    </ul>
  );
}

export default ShopThumbList;
