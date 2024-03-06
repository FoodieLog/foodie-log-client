"use client";
import Header from "@components/Common/Header";
import KakaoMap from "@components/Map/KakaoMap";
import ShopCard from "@components/Common/Card/ShopCard";
import useRestaurantDetailQuery from "@hooks/queries/useRestaurantDetailQuery";
import Drawer from "../Common/Drawer/Drawer";

interface RestaurantDetailProps {
  restaurantId: string;
}

const RestaurantDetail = ({ restaurantId }: RestaurantDetailProps) => {
  const parsedId = parseInt(restaurantId, 10);

  const { data, isLoading } = useRestaurantDetailQuery(parsedId);

  // TODO: 로딩 ui 추가하기!
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full flex flex-col justify-center max-w-screen-sm mx-auto relative">
      <Header title={data?.detail.restaurant.name ?? ""} back="prePage" />
      <KakaoMap
        size={{ width: "100%", height: "calc(100vh - 60px - 56px)" }}
        latitude={data?.detail.restaurant.mapY ?? ""}
        longitude={data?.detail.restaurant.mapX ?? ""}
        restaurantId={parsedId}
      />

      <Drawer closedHeight={70 + 68}>
        <ShopCard
          id={parsedId}
          name={data?.detail.restaurant.name ?? ""}
          category={data?.detail.restaurant.category ?? ""}
          roadAddress={data?.detail.restaurant.roadAddress ?? ""}
          isLiked={data?.detail.isLiked.liked}
          shopUrl={data?.detail.restaurant.link}
        />
      </Drawer>
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
