import { RestaurantCategory } from "@/src/types/restaurant";
import { APIFeedResponse } from "@@types/apiTypes";
import { getFeedList, getFeedListByUserId } from "@services/feed";
import { useInfiniteQuery } from "@tanstack/react-query";

interface useFeedListQueryProps {
  userId?: number;
  singleFeedId?: number;
  category?: RestaurantCategory;
}

const useFeedListQuery = ({ userId, singleFeedId, category }: useFeedListQueryProps) => {
  return useInfiniteQuery(
    ["feedList", userId, category],
    async ({ pageParam = 0 }) => {
      let response;
      if (userId) {
        response = await getFeedListByUserId(userId, pageParam);
      } else {
        response = await getFeedList(pageParam, category);
      }

      const apiResponse = response.data;
      return apiResponse;
    },
    {
      getNextPageParam: (lastPage: APIFeedResponse) => {
        const lastFeed = lastPage.response.content.at(-1);
        if (lastPage?.response?.content?.length < 15) return undefined;
        return lastFeed?.feed.feedId;
      },
      enabled: !singleFeedId || !userId,
    }
  );
};

export default useFeedListQuery;
