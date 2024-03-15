"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unfollowUser, followUser } from "@services/feed";
import { useToast } from "@/components/ui/use-toast";
import { TOAST_MESSAGES } from "@constants/toast";
import { Mypage } from "@@types/mypage";

const useFollowMutations = (userId: Mypage["userId"], restaurantId?: number) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutationOptions = {
    onSuccess: () => {
      queryClient.invalidateQueries(["myPage", userId]);
      queryClient.invalidateQueries(["myFollowers", userId]);
      queryClient.invalidateQueries(["feedList", userId]);
      queryClient.invalidateQueries(["feedList", undefined]);
      restaurantId && queryClient.invalidateQueries(["restaurantDetail", restaurantId]);
    },
    onError: () => {
      toast(TOAST_MESSAGES.ERROR_PLEASE_RETRY);
    },
  };

  const followMutation = useMutation(() => followUser(userId), mutationOptions);
  const unfollowMutation = useMutation(() => unfollowUser(userId), mutationOptions);

  return { followMutation, unfollowMutation };
};

export default useFollowMutations;
