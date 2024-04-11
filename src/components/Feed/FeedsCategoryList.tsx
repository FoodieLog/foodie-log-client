"use client";

import useFeedListQuery from "@hooks/queries/useFeedListQuery";
import FeedsCategorySlider from "@components/Feed/FeedsCategorySlider";
import Link from "next/link";
import Image from "next/image";
import FeedUserCard from "@components/Feed/FeedUserCard";
import InfiniteScroll from "react-infinite-scroller";
import { Content } from "@@types/feed";
import { useState } from "react";
import { RestaurantCategory } from "@@types/restaurant";
import Skeleton from "@components/Common/Skeleton";

const FeedsCategoryList = () => {
  const [category, setCategory] = useState<RestaurantCategory>("");
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useFeedListQuery({ category });

  if (isLoading) {
    <Skeleton />;
  }

  return (
    <div className="flex flex-col pt-12 max-w-[640px] w-full mx-auto">
      <FeedsCategorySlider setCategory={setCategory} />
      <InfiniteScroll
        pageStart={0}
        loadMore={() => {
          fetchNextPage();
        }}
        hasMore={hasNextPage && !isFetchingNextPage}
      >
        <div className="grid grid-cols-2 gap-4 mx-2 mt-2">
          {data?.pages.map((page) => {
            return page?.response?.content.map((feedData: Content, dataIndex) => (
              <div key={dataIndex} className=" flex flex-col p-3 gap-3 border-gray-2 border rounded-[10px]">
                <div className="relative rounded-[10px] w-full aspect-w-1 aspect-h-1">
                  <Link href={`/main/feed/?feedsId=${feedData.feed.feedId}`}>
                    <Image
                      className="rounded-[10px]"
                      src={feedData.feed.feedImages[0].imageUrl}
                      fill
                      alt="피드 이미지"
                    ></Image>
                  </Link>
                </div>
                <p className="text-gray-10 whitespace-nowrap overflow-x-hidden truncate">{feedData.feed.content}</p>
                <FeedUserCard data={feedData.feed} timeStamp={false} small />
              </div>
            ));
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default FeedsCategoryList;
