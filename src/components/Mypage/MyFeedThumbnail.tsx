import Link from "next/link";
import { Fragment } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getThumbnailByUserId } from "@services/mypage";
import { Thumbnail } from "@@types/mypage";
import InfiniteScroll from "react-infinite-scroller";
import ImageThumbnail from "@components/Common/Thumbnail/ImageThumbnail";

interface MyFeedThumbnailProps {
  userId: number;
}

function MyFeedThumbnail({ userId }: MyFeedThumbnailProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["thumbnailList", userId],
    async ({ pageParam = 0 }) => {
      if (userId) {
        const response = await getThumbnailByUserId(userId, pageParam);
        return response.response;
      }
      throw new Error("User ID is not provided");
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage?.content?.length < 15) return undefined;
        return lastPage?.content[lastPage.content.length - 1]?.feed.feedId;
      },
    }
  );
  return (
    <InfiniteScroll pageStart={0} loadMore={() => fetchNextPage()} hasMore={hasNextPage && !isFetchingNextPage}>
      <ul className="w-full grid grid-cols-3 gap-1">
        {data?.pages.map((page, index) => (
          <Fragment key={index}>
            {page?.content?.map((thumbnail: Thumbnail) => (
              <li key={thumbnail.feed.feedId}>
                <Link
                  href={`/main/feed/${userId}?feedId=${thumbnail.feed.feedId}`}
                  className="w-full h-full relative after:content-[''] after:block after:pb-[100%]  overflow-hidden"
                  style={{ paddingBottom: "100%" }}
                >
                  <ImageThumbnail imageSrc={thumbnail.feed.thumbnailUrl} imageAlt={`${thumbnail.feed.feedId} 썸네일`} />
                </Link>
              </li>
            ))}
          </Fragment>
        ))}
      </ul>
    </InfiniteScroll>
  );
}

export default MyFeedThumbnail;
