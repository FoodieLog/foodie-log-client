import { APIFeedResponse, getFeedList, getFeedListByUserId } from "@services/apiFeed";
import { useInfiniteQuery } from "@tanstack/react-query";

interface useFeedListQueryProps {
  userId?: number;
  singleFeedId?: number;
}

const useFeedListQuery = ({ userId, singleFeedId }: useFeedListQueryProps) => {
  return useInfiniteQuery(
    ["feedList", userId],
    async ({ pageParam = 0 }) => {
      let response;
      if (userId) {
        response = await getFeedListByUserId(userId, pageParam);
      } else {
        response = await getFeedList(pageParam);
      }

      const apiResponse = response as unknown as APIFeedResponse;
      return apiResponse;
    },
    {
      getNextPageParam: (lastPage: APIFeedResponse) => {
        if (lastPage?.response?.content?.length < 15) return undefined;
        return lastPage?.response?.content[lastPage.response.content.length - 1]?.feed.feedId || 0;
      },
      enabled: !singleFeedId,
    }
  );
};

export default useFeedListQuery;