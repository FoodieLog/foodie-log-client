"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import BackButtonMain from "./Button/BackButtonMain";
import KakaoMap from "./KakaoMap";
import ShopCard from "./ShopCard";
import Feeds from "./Feeds";
import { generateRestaurantDetailDummyData } from "../utils/dummyDataUtils";

const RestaurantDetail = () => {
  const [restaurantDetail, setRestaurantDetail] = useState<any>();
  const pathname = usePathname();

  const restaurantIdMatch = pathname.match(/restaurants\/(\d+)/);
  // FIXME: restaurantIdMatch가 null일 경우를 처리해야 함. 현재는 1로 지정함.
  const restaurantId = restaurantIdMatch ? parseInt(restaurantIdMatch[1], 10) : 1;

  useEffect(() => {
    const data = generateRestaurantDetailDummyData();
    setRestaurantDetail(data);
  }, []);

  if (!restaurantDetail) return <div>Loading...</div>;

  return (

    <div className="w-full flex flex-col justify-center max-w-screen-sm mx-auto">
      <BackButtonMain />
      <KakaoMap 
        latitude={restaurantDetail.location.mapx}
        longitude={restaurantDetail.location.mapy}  
      />
      <ShopCard
        id={restaurantId}
        name={restaurantDetail.name}
        category={restaurantDetail.category}
        roadAddress={restaurantDetail.roadAddress}
        isLiked={restaurantDetail.isLiked}
        shopUrl={restaurantDetail.link}
      />
      <Feeds />
    </div>
  );
};

export default RestaurantDetail;
