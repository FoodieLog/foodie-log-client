import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "@services/mypage";
import { useToast } from "@/components/ui/use-toast";
import { TOAST_MESSAGES } from "@constants/toast";
import { Mypage } from "@@types/mypage";

const useMyPageQuery = (userId: Mypage["userId"]) => {
  const { toast } = useToast();

  return useQuery(
    ["myPage", userId],
    async () => {
      const { data } = await getMyProfile(userId);
      const myProfileData = data.response;
      return myProfileData;
    },
    {
      onError: () => {
        toast(TOAST_MESSAGES.ERROR_PLEASE_RETRY);
      },
      enabled: !!userId,
    }
  );
};

export default useMyPageQuery;
