import { useQuery } from "@tanstack/react-query";
// import { getNotification } from "@services/notification";
import { getNotificationList } from "@services/apiFeed";
import { useToast } from "@/components/ui/use-toast";
import { TOAST_MESSAGES } from "@constants/toast";
import { Notification } from "@@types/apiTypes";

const useNotificationQuery = () => {
  const { toast } = useToast();

  return useQuery(
    ["notification"],
    async () => {
      const { response } = await getNotificationList();
      console.log(response);
      const notificationData = response.content;
      return notificationData;
    },
    {
      onError: () => {
        toast(TOAST_MESSAGES.ERROR_PLEASE_RETRY);
      },
    }
  );
};

export default useNotificationQuery;
