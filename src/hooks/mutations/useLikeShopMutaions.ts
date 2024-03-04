import { useToast } from "@/components/ui/use-toast";
import { likeRestaurant, unlikeRestaurant } from "@/src/services/apiFeed";
import { MyMap } from "@/src/types/mypage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useLikeShopMutaions = (restaurantId: number, userId?: MyMap["userId"]) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutationOptions = {
    onSuccess: () => {
      queryClient.invalidateQueries(["myMap", userId || "noUserId"]);
    },
    onError: () => {
      toast({ description: "에러가 발생했습니다. 다시 시도해주세요!" });
    },
  };

  const likeMutation = useMutation(() => likeRestaurant(restaurantId), mutationOptions);
  const unlikeMutation = useMutation(() => unlikeRestaurant(restaurantId), mutationOptions);

  return { likeMutation, unlikeMutation };
};

export default useLikeShopMutaions;
