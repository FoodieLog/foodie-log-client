"use client";
import React from "react";
import Header from "@components/Common/Header";
import ShopCard from "@components/Common/Card/ShopCard";
import useRestaurantDetailQuery from "@hooks/queries/useRestaurantDetailQuery";
import RestaurantFeedList from "@components/Restaurant/RestaurantFeedList";

function RestaurantReviewsPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const { data } = useRestaurantDetailQuery(Number(id));

  if (!data) return;

  const {
    restaurant: { name, category, roadAddress, link },
    isLiked: { liked },
  } = data.detail;
  const feedList = data.feedList;

  return (
    <div>
      <Header title={name} back="prePage" />
      <ShopCard
        id={Number(id)}
        name={name}
        category={category}
        roadAddress={roadAddress}
        isLiked={liked}
        shopUrl={link}
      />
      {/* todo: 기능 구현 */}
      {!!feedList.length && (
        <div className="mt-[30px] mr-5 mb-2.5 text-right text-sm">
          <button className="border-r px-[6px]">최신순</button>
          <button className="px-[6px]">인기순</button>
        </div>
      )}
      <RestaurantFeedList feedList={feedList} restaurantName={name} />
    </div>
  );
}

export default RestaurantReviewsPage;
