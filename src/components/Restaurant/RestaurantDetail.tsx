"use client";
import { useEffect, useState } from "react";
import Header from "@components/Common/Header";
import KakaoMap from "@components/Map/KakaoMap";
import ShopCard from "@components/Restaurant/ShopCard";
import { getRestaurantDetail } from "@services/restaurant";
import Feed from "@components/Feed/Feed";
interface RestaurantDetailProps {
  restaurantId: string;
}

const RestaurantDetail = ({ restaurantId }: RestaurantDetailProps) => {
  const [restaurantDetail, setRestaurantDetail] = useState<any>();
  const [feedList, setFeedList] = useState<any>();

  // [id] dynamic routing 사용하지 않는 경우에 pathname 사용하여 id 가져오는 방법
  // const pathname = usePathname();
  // const restaurantIdMatch = pathname.match(/restaurants\/(\d+)/);
  // // FIXME: restaurantIdMatch가 null일 경우를 처리해야 함. 현재는 1로 지정함.
  // const restaurantId = restaurantIdMatch ? parseInt(restaurantIdMatch[1], 10) : 1;
  // const restaurantId = parseInt(Id)

  const parsedId = parseInt(restaurantId, 10);
  useEffect(() => {
    // const data = generateRestaurantDetailDummyData();
    const fetchData = async () => {
      const data = await getRestaurantDetail(parsedId);

      setRestaurantDetail(data.data.response.restaurantInfo);
      setFeedList(data.data.response.content);
    };

    fetchData();
  }, [parsedId]);

  if (!restaurantDetail) return <div>Loading...</div>;

  const updateFollowStatus = (userId: number, newStatus: boolean) => {
    setFeedList((prevData: any[]) => {
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
      <Header title={restaurantDetail.restaurant.name} back="prePage" />
      <KakaoMap
        latitude={restaurantDetail.restaurant.mapY}
        longitude={restaurantDetail.restaurant.mapX}
        restaurantId={parsedId}
      />
      <ShopCard
        id={parsedId}
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
