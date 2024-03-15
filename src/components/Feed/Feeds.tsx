"use client";
import { Fragment, useEffect, useRef, useState } from "react";
/** 피드 관련 api 추후 정리 예정 */
import { getSingleFeed } from "@services/apiFeed";
// import { getFeedList, getFeedListByUserId, getSingleFeed, followUser, unfollowUser } from "@services/feed";
import InfiniteScroll from "react-infinite-scroller";
import Feed from "@components/Feed/Feed";
import { Content } from "@@types/feed";
import useFeedListQuery from "@hooks/queries/useFeedListQuery";

interface FeedsProps {
  id?: number;
  startingFeedId?: number;
  singleFeedId?: number;
}

const Feeds = ({ id, startingFeedId, singleFeedId }: FeedsProps) => {
  const [singleFeedData, setSingleFeedData] = useState<Content | null>(null);
  const feedRef = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useFeedListQuery({ userId: id, singleFeedId });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSingleFeed(singleFeedId!);
        setSingleFeedData(response.response.content);
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    if (singleFeedId) {
      fetchData();
    }
  }, [singleFeedId]);

  const loadMore = () => {
    fetchNextPage();
  };

  // const removeDeletedFeed = (feedId: number) => {
  //   setFeedsData((prevData) => prevData.filter((feed) => feed.feed.feedId !== feedId));
  // };

  useEffect(() => {
    let found = false;

    for (const page of data?.pages || []) {
      for (const content of page.response.content) {
        if (content.feed.feedId === startingFeedId) {
          found = true;
          break;
        }
      }
      if (found) break;
    }

    if (!found && hasNextPage) {
      fetchNextPage();
    } else if (found && startingFeedId !== undefined && feedRef.current[startingFeedId]) {
      feedRef.current[startingFeedId]?.scrollIntoView({
        behavior: "auto",
      });
    }
  }, [data, startingFeedId, hasNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col pt-5 max-w-[640px] w-full mx-auto">
      {/* singleFeedId가 있을 경우 단일 피드 렌더링 */}
      {singleFeedId && singleFeedData ? (
        <Feed key={singleFeedData.feed.feedId} {...singleFeedData} />
      ) : (
        <InfiniteScroll pageStart={0} loadMore={loadMore} hasMore={hasNextPage && !isFetchingNextPage}>
          {(data?.pages || []).map((page, index) => {
            if (!Array.isArray(page.response.content)) {
              return null;
            }
            return (
              <Fragment key={index}>
                {page.response.content.map((feedData: Content, index) => {
                  const { feed } = feedData;
                  const hasFeedId = feed?.feedId !== undefined;
                  const Key = hasFeedId ? feed.feedId : index;

                  return (
                    <div
                      key={Key}
                      ref={(el) => {
                        if (hasFeedId) {
                          feedRef.current[feed.feedId] = el;
                        }
                      }}
                    >
                      <Feed key={Key} {...feedData} />
                    </div>
                  );
                })}
              </Fragment>
            );
          })}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Feeds;
