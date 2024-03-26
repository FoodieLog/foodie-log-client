import { useQuery } from "@tanstack/react-query";
import { getRestaurantDetail } from "@services/restaurant";
import { RestaurantSortType } from "@@types/restaurant";

const useRestaurantDetailQuery = (restaurantId: number, sort?: RestaurantSortType) =>
  useQuery(["restaurantDetail", restaurantId], async () => {
    const { response } = await getRestaurantDetail(restaurantId, sort);
    const detail = response.restaurantInfo;
    const feedList = response.content;
    return { detail, feedList };
  });

export default useRestaurantDetailQuery;
