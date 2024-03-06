"use client";
import { useEffect, useState } from "react";
import Header from "@components/Common/Header";
import KakaoMap from "@components/Map/KakaoMap";
import ShopCard from "@components/Common/Card/ShopCard";
import { getRestaurantDetail } from "@services/restaurant";
import Feed from "@components/Feed/Feed";
import useRestaurantDetailQuery from "@/src/hooks/queries/useRestaurantDetailQuery";
interface RestaurantDetailProps {
  restaurantId: string;
}

const RestaurantDetail = ({ restaurantId }: RestaurantDetailProps) => {
  const parsedId = parseInt(restaurantId, 10);
  const { data, isLoading } = useRestaurantDetailQuery(parsedId);
  // const [restaurantDetail, setRestaurantDetail] = useState<any>();
  // const [feedList, setFeedList] = useState<any>();

  // [id] dynamic routing 사용하지 않는 경우에 pathname 사용하여 id 가져오는 방법
  // const pathname = usePathname();
  // const restaurantIdMatch = pathname.match(/restaurants\/(\d+)/);
  // // FIXME: restaurantIdMatch가 null일 경우를 처리해야 함. 현재는 1로 지정함.
  // const restaurantId = restaurantIdMatch ? parseInt(restaurantIdMatch[1], 10) : 1;
  // const restaurantId = parseInt(Id)

  // useEffect(() => {
  //   // const data = generateRestaurantDetailDummyData();
  //   const fetchData = async () => {
  //     const data = await getRestaurantDetail(parsedId);

  //     setRestaurantDetail(data.data.response.restaurantInfo);
  //     setFeedList(data.data.response.content);
  //   };

  //   fetchData();
  // }, [parsedId]);

  // const updateFollowStatus = (userId: number, newStatus: boolean) => {
  //   setFeedList((prevData: any[]) => {
  //     return prevData.map((content) => {
  //       if (content.feed.userId === userId) {
  //         return { ...content, followed: newStatus };
  //       }
  //       return content;
  //     });
  //   });
  // };

  // TODO: 로딩 ui 추가하기!
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full flex flex-col justify-center max-w-screen-sm mx-auto">
      <Header title={data?.detail.restaurant.name ?? ""} back="prePage" />
      <KakaoMap
        latitude={data?.detail.restaurant.mapY ?? ""}
        longitude={data?.detail.restaurant.mapX ?? ""}
        restaurantId={parsedId}
      />
      <ShopCard
        id={parsedId}
        name={data?.detail.restaurant.name ?? ""}
        category={data?.detail.restaurant.category ?? ""}
        roadAddress={data?.detail.restaurant.roadAddress ?? ""}
        isLiked={data?.detail.isLiked.liked}
        shopUrl={data?.detail.restaurant.link}
      />
      {/* {feedList &&
        feedList.map((feedItem: any, index: number) => (
          <Feed
            key={index}
            feed={feedItem.feed}
            restaurant={feedItem.restaurant}
            followed={feedItem.followed}
            liked={feedItem.liked}
          />
        ))} */}
    </div>
  );
};

export default RestaurantDetail;
