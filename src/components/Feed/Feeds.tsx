"use client";
import Feed from "./Feed";
import React, { useState } from "react";
import { getFeedList, getFeedListByUserId, Content, APIFeedResponse } from "@/src/services/apiFeed";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroller";
import useSignUpStore from "@/src/store/useSignUpStore";
import FeedModal from "./FeedModal";

type FeedsProps = {
  id?: number;
  startingFeedId?: number;
};

const Feeds: React.FC<FeedsProps> = ({ id, startingFeedId }) => {
  const [feedsData, setFeedsData] = useState<Content[]>([]);
  const nextComponent = useSignUpStore((state) => state.nextComponent);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["feedList", id],
    async ({ pageParam = startingFeedId || 0 }) => {
      let response;
      if (id) {
        response = await getFeedListByUserId(id, pageParam);
      } else {
        response = await getFeedList(pageParam);
      }

      const apiResponse = response as APIFeedResponse;
      setFeedsData(apiResponse.response.content);
      return apiResponse;
    },
    {
      getNextPageParam: (lastPage: APIFeedResponse) => {
        if (lastPage?.response?.content?.length < 15) return undefined;
        return lastPage?.response?.content[lastPage.response.content.length - 1]?.feed.feedId || 0;
      },
    }
  );

  const loadMore = (page: number) => {
    fetchNextPage();
  };

  const removeDeletedFeed = (feedId: number) => {
    setFeedsData((prevData) => prevData.filter((feed) => feed.feed.feedId !== feedId));
  };

  const updateFollowStatus = (userId: number, newStatus: boolean) => {
    setFeedsData((prevData) => {
      return prevData.map((content) => {
        if (content.feed.userId === userId) {
          return { ...content, followed: newStatus };
        }
        return content;
      });
    });
  };

  return (
    <div className="flex flex-col pt-5 max-w-[640px] w-full mx-auto">
      <InfiniteScroll pageStart={0} loadMore={loadMore} hasMore={hasNextPage && !isFetchingNextPage}>
        {(data?.pages || []).map((page, index) => (
          <React.Fragment key={index}>
            {page.response.content.map((content: Content, i) => (
              <Feed
                key={content.feed.feedId}
                feed={content.feed}
                restaurant={content.restaurant}
                isFollowed={content.followed}
                isLiked={content.liked}
                updateFollowStatus={updateFollowStatus}
                removeDeletedFeed={removeDeletedFeed}
              />
            ))}
          </React.Fragment>
        ))}
      </InfiniteScroll>
      {nextComponent === "EditModal" && <FeedModal />}
    </div>
  );
};

export default Feeds;
