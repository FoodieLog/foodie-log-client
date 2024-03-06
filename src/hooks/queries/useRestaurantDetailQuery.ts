import { getRestaurantDetail } from "@services/restaurant";
import { useQuery } from "@tanstack/react-query";

const useRestaurantDetailQuery = (restaurantId: number) =>
  useQuery(["restaurantDetail", restaurantId], async () => {
    const { data } = await getRestaurantDetail(restaurantId);
    const detail = data.response.restaurantInfo;
    const feedList = data.response.content;
    return { detail, feedList };
  });

export default useRestaurantDetailQuery;
