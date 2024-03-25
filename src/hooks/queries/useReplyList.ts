import { useQuery } from "@tanstack/react-query";
import { getReplyList } from "@services/reply";

const useReplyList = (feedId: number) => {
  return useQuery({
    queryKey: ["replyList", feedId],
    queryFn: async () => {
      const { response } = await getReplyList(feedId);
      const author = response;
      const replyList = response.replyList;
      return { author, replyList };
    },
  });
};

export default useReplyList;
