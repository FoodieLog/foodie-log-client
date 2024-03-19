"use client";
import { useQuery } from "@tanstack/react-query";
import { getNotification } from "@services/notification";
import { useToast } from "@/components/ui/use-toast";
import { TOAST_MESSAGES } from "@constants/toast";

const useNotificationQuery = () => {
  const { toast } = useToast();

  return useQuery(
    ["notification"],
    async () => {
      const { data } = await getNotification();
      const notificationData = data.response.content;
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
