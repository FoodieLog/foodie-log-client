import ShopThumb from "./ShopThumb";
import { RecommendedRestaurant } from "@/src/types/recommend";

const ShopThumbList = ({ restaurants }: { restaurants: RecommendedRestaurant[] }) => {
  return (
    <div className="w-full flex flex-col items-center p-1 max-w-[640px] pt-[44px]">
      {restaurants.map((restaurant) => (
        <ShopThumb key={restaurant.restaurantId} {...restaurant} />
      ))}
    </div>
  );
};

export default ShopThumbList;
