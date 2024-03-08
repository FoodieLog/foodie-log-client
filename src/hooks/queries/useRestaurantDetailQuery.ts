import { getRestaurantDetail } from "@services/restaurant";
import { useQuery } from "@tanstack/react-query";

const useRestaurantDetailQuery = (restaurantId: number) =>
  useQuery(["restaurantDetail", restaurantId], async () => {
    const { response } = await getRestaurantDetail(restaurantId);
    const detail = response.restaurantInfo;
    const feedList = response.content;
    return { detail, feedList };
  });

export default useRestaurantDetailQuery;
