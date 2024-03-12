import { useQuery } from "@tanstack/react-query";
import { getSearchShop } from "@services/post";

const useRestaurantListQuery = (isSubmit: boolean, searchQuery: string) => {
  return useQuery({
    queryKey: ["restaurants", searchQuery],
    queryFn: async () => {
      const { response } = await getSearchShop(searchQuery);
      const restaurants = response.documents;
      return restaurants;
    },
    enabled: isSubmit,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export default useRestaurantListQuery;
