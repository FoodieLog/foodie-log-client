import { useToast } from "@/components/ui/use-toast";
import { TOAST_MESSAGES } from "@constants/toast";
import { likeRestaurant, unlikeRestaurant } from "@services/apiFeed";
import { MyMap } from "@@types/mypage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useLikeShopMutations = (restaurantId: number, userId?: MyMap["userId"]) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutationOptions = {
    onSuccess: () => {
      queryClient.invalidateQueries(["myMap", userId || "noUserId"]);
      queryClient.invalidateQueries(["restaurantDetail", restaurantId]);
    },
    onError: () => {
      toast(TOAST_MESSAGES.ERROR_PLEASE_RETRY);
    },
  };

  const likeMutation = useMutation(() => likeRestaurant(restaurantId), mutationOptions);
  const unlikeMutation = useMutation(() => unlikeRestaurant(restaurantId), mutationOptions);

  return { likeMutation, unlikeMutation };
};

export default useLikeShopMutations;
