import { useQuery } from "@tanstack/react-query";
import { getRecommendedRestaurant } from "@services/restaurant";

const useRecommendQuery = (searchQuery: string) => {
  return useQuery({
    queryKey: ["recommend", searchQuery],
    queryFn: async () => await getRecommendedRestaurant(searchQuery),
    enabled: !!searchQuery,
    staleTime: 1000 * 60 * 60,
  });
};

export default useRecommendQuery;
