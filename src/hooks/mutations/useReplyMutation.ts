import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReply, saveReply } from "@services/reply";
import { useToast } from "@/components/ui/use-toast";
import { TOAST_MESSAGES } from "@constants";
import { PostReplyType } from "@@types/reply";

const useReplyMutation = (feedId: number, replyId?: number) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const postReplyMutation = useMutation({
    mutationKey: ["replyList", feedId],
    mutationFn: (replyContent: PostReplyType) => saveReply(feedId, replyContent),

    onSuccess: () => {
      queryClient.invalidateQueries(["replyList", feedId]);
    },
    onError: () => {
      toast(TOAST_MESSAGES.REPLY_POST_ERROR);
    },
  });

  const deleteReplyMutation = useMutation({
    mutationKey: ["replyList", feedId],
    mutationFn: () => deleteReply(replyId || 0),
    onSuccess: () => {
      queryClient.invalidateQueries(["replyList", feedId]);
    },
    onError: () => {
      toast(TOAST_MESSAGES.REPLY_DELETE_ERROR);
    },
  });

  return { postReplyMutation, deleteReplyMutation };
};

export default useReplyMutation;
