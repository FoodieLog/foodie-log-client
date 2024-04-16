"use client";
import React, { useEffect, useState } from "react";
import Header from "@components/Common/Header";
import ShopCard from "@components/Common/Card/ShopCard";
import useRestaurantDetailQuery from "@hooks/queries/useRestaurantDetailQuery";
import RestaurantFeedList from "@components/Restaurant/RestaurantFeedList";
import { RestaurantDetailBackground } from "@assets/images";
import { RestaurantSortType } from "@@types/restaurant";

function RestaurantReviewsPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const [sortMethod, setSortMethod] = useState<RestaurantSortType>("latest");

  const { data, refetch } = useRestaurantDetailQuery(Number(id), sortMethod);

  useEffect(() => {
    refetch();
  }, [sortMethod]);

  if (!data) return;

  const {
    restaurant: { name, category, roadAddress, link },
    isLiked: { liked },
  } = data.detail;
  const feedList = data.feedList;

  return (
    <div className="sm:max-w-[640px] mx-auto">
      <Header title={name} back="prePage" />
      <div className="mb-4 overflow-hidden">
        <RestaurantDetailBackground />
      </div>
      <div className="mx-3">
        <ShopCard
          id={Number(id)}
          name={name}
          category={category}
          roadAddress={roadAddress}
          isLiked={liked}
          shopUrl={link}
        />
      </div>
      {!!feedList.length && (
        <div className="mt-[30px] mr-3.5 mb-2.5 text-right text-sm text-gray-4">
          <button
            type="button"
            className={`border-r px-1.5 ${sortMethod === "latest" && "text-gray-10"}`}
            onClick={() => {
              setSortMethod("latest");
            }}
          >
            최신순
          </button>
          <button
            type="button"
            className={`px-1.5 ${sortMethod === "popular" && "text-gray-10"}`}
            onClick={() => {
              setSortMethod("popular");
            }}
          >
            인기순
          </button>
        </div>
      )}
      <RestaurantFeedList feedList={feedList} restaurantName={name} />
    </div>
  );
}

export default RestaurantReviewsPage;
