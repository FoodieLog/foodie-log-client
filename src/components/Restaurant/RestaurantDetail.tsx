"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import BackButtonMain from "../Common/Button/BackButtonMain";
import KakaoMap from "../Map/KakaoMap";
import ShopCard from "./ShopCard";
import Feeds from "../Feed/Feeds";
import { generateRestaurantDetailDummyData } from "../../utils/dummyDataUtils";
import { getRestaurantDetail } from "../../services/apiRestaurant";
import Feed from "../Feed/Feed";
interface RestaurantDetailProps {
  Id: string;
}

const RestaurantDetail = ({ Id }: RestaurantDetailProps) => {
  const [restaurantDetail, setRestaurantDetail] = useState<any>();
  const [feedList, setFeedList] = useState<any>();

  // [id] dynamic routing 사용하지 않는 경우에 pathname 사용하여 id 가져오는 방법
  // const pathname = usePathname();
  // const restaurantIdMatch = pathname.match(/restaurants\/(\d+)/);
  // // FIXME: restaurantIdMatch가 null일 경우를 처리해야 함. 현재는 1로 지정함.
  // const restaurantId = restaurantIdMatch ? parseInt(restaurantIdMatch[1], 10) : 1;
  // const restaurantId = parseInt(Id)

  const restaurantId = parseInt(Id, 10);
  useEffect(() => {
    // const data = generateRestaurantDetailDummyData();
    const fetchData = async () => {
      const data = await getRestaurantDetail(restaurantId);
      console.log("[getRestaurant] : ", data.response);
      setRestaurantDetail(data.response.restaurantInfo);
      setFeedList(data.response.content);
      console.log("[setFeedList] : ", data.response.content);
    };

    fetchData();
  }, [restaurantId]);

  if (!restaurantDetail) return <div>Loading...</div>;

  const updateFollowStatus = (userId: number, newStatus: boolean) => {
    setFeedList((prevData : any[]) => {
      return prevData.map((content) => {
        if (content.feed.userId === userId) {
          return { ...content, followed: newStatus };
        }
        return content;
      });
    });
  };

  return (
    <div className="w-full flex flex-col justify-center max-w-screen-sm mx-auto">
      <BackButtonMain />
      <KakaoMap latitude={restaurantDetail.restaurant.mapY} longitude={restaurantDetail.restaurant.mapX} />
      <ShopCard
        id={restaurantId}
        name={restaurantDetail.restaurant.name}
        category={restaurantDetail.restaurant.category}
        roadAddress={restaurantDetail.restaurant.roadAddress}
        isLiked={restaurantDetail.isLiked.liked}
        shopUrl={restaurantDetail.restaurant.link}
      />
      {feedList &&
        feedList.map((feedItem: any, index: number) => (
          <Feed
            key={index}
            feed={feedItem.feed}
            restaurant={feedItem.restaurant}
            isFollowed={feedItem.followed}
            isLiked={feedItem.liked}
            updateFollowStatus={updateFollowStatus}
          />
        ))}
    </div>
  );
};

export default RestaurantDetail;
