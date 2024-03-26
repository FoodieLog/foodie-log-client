import { useMutation } from "@tanstack/react-query";
import { putNotification } from "@services/settings";
import { Notification } from "@@types/settings";
import { useToast } from "@/components/ui/use-toast";
import { TOAST_MESSAGES } from "@constants/toast";

function usePushMutation(checkStatus: Notification) {
  const { toast } = useToast();

  const mutationOptions = {
    onError: () => {
      toast(TOAST_MESSAGES.ERROR_PLEASE_RETRY);
    },
  };

  const pushMutation = useMutation(() => putNotification(checkStatus), mutationOptions);

  return { pushMutation };
}

export default usePushMutation;
