import { useToast } from "@/components/ui/use-toast";
import { TOAST_MESSAGES } from "@constants/toast";
import { getLikedShop } from "@services/apiFeed";
import { getMyMap } from "@services/mypage";
import { LikedMapResponse } from "@@types/apiTypes";
import { MyMap } from "@@types/mypage";
import { useQuery } from "@tanstack/react-query";

const useMyMapQuery = (userId: MyMap["userId"]) => {
  const { toast } = useToast();

  return useQuery(
    ["myMap", userId || "noUserId"],
    async () => {
      if (userId) {
        const { data } = await getMyMap(userId);
        return { myMap: data.response.content, nickName: data.response.nickName };
      } else {
        const { response } = (await getLikedShop()) as LikedMapResponse;
        return { myMap: response.content, nickName: "" };
      }
    },
    {
      onError: () => {
        toast(TOAST_MESSAGES.ERROR_PLEASE_RETRY);
      },
    }
  );
};

export default useMyMapQuery;
