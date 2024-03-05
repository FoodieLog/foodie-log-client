"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
/** 피드 관련 api 추후 정리 예정 */
import { getFeedList, getFeedListByUserId, getSingleFeed, followUser, unfollowUser } from "@services/apiFeed";
// import { getFeedList, getFeedListByUserId, getSingleFeed, followUser, unfollowUser } from "@services/feed";
import InfiniteScroll from "react-infinite-scroller";
import useSignUpStore from "@store/useSignUpStore";
import Feed from "@components/Feed/Feed";
import FeedEditModal from "@components/Feed/FeedEditModal";
import { Content, APIFeedResponse } from "@@types/feed";

interface FeedsProps {
  id?: number;
  startingFeedId?: number;
  singleFeedId?: number;
}

const Feeds = ({ id, startingFeedId, singleFeedId }: FeedsProps) => {
  const [reload, setReload] = useState(false);
  const [feedsData, setFeedsData] = useState<Content[]>([]);
  const [singleFeedData, setSingleFeedData] = useState<Content | null>(null);
  const nextComponent = useSignUpStore((state) => state.nextComponent);
  const feedRef = useRef<{ [key: number]: HTMLDivElement | null }>({});

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

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["feedList", id],
    async ({ pageParam = 0 }) => {
      let response;
      if (id) {
        response = await getFeedListByUserId(id, pageParam);
      } else {
        response = await getFeedList(pageParam);
      }

      const apiResponse = response as unknown as APIFeedResponse;
      setFeedsData(apiResponse.data);
      // 여기서 전체 feed 데이터 목록을 출력

      return apiResponse;
    },
    {
      getNextPageParam: (lastPage: APIFeedResponse) => {
        if (lastPage?.response?.content?.length < 15) return undefined;
        return lastPage?.response?.content[lastPage.response.content.length - 1]?.feed.feedId || 0;
      },
      enabled: !singleFeedId, // singleFeedId가 없는 경우에만 쿼리 실행
    }
  );

  const loadMore = () => {
    fetchNextPage();
  };

  const removeDeletedFeed = (feedId: number) => {
    setFeedsData((prevData) => prevData.filter((feed) => feed.feed.feedId !== feedId));
  };

  // const updateFollowStatus = async (userId: number, newStatus: boolean) => {
  //   let response;
  //   try {
  //     if (newStatus) {
  //       response = await followUser(userId);
  //     } else {
  //       response = await unfollowUser(userId);
  //     }

  //     if ((newStatus && response.status === 201) || (!newStatus && response.status === 204)) {
  //       setFeedsData((prevData) => {
  //         return prevData.map((content) => {
  //           if (content.feed.userId === userId) {
  //             return { ...content, followed: newStatus };
  //           }
  //           return content;
  //         });
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Failed to update follow state:", error);
  //   }
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
