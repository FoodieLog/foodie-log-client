import { useQuery } from "@tanstack/react-query";
import { getFollowingList, getFollowerList } from "@services/mypage";
import { useToast } from "@/components/ui/use-toast";
import { TOAST_MESSAGES } from "@constants/toast";
import { Mypage } from "@@types/mypage";

const useMyFollowersQuery = (userId: Mypage["userId"], object: string) => {
  const { toast } = useToast();

  return useQuery(
    ["myFollowers", userId, object],
    async () => {
      if (object === "팔로잉") {
        const { response } = await getFollowingList(userId);
        return response.content;
      } else {
        const { response } = await getFollowerList(userId);
        return response.content;
      }
    },
    {
      onError: () => {
        toast(TOAST_MESSAGES.ERROR_PLEASE_RETRY);
      },
      enabled: !!userId && !!object,
    }
  );
};

export default useMyFollowersQuery;
