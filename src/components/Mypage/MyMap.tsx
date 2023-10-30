"use client";
import React, { useEffect, useState } from "react";
import { getMyMap } from "@/src/services/mypage";
import { getLikedShop } from "@/src/services/apiFeed";
import { LikedMapResponse, MapItem } from "@/src/types/apiTypes";
import MyListMap from "@/src/components/Map/MyListMap";
import MyShopItem from "@/src/components/Mypage/MyShopItem";
import Header from "@/src/components/Common/Header";
import { MyMapProps } from "@/src/types/mypage";

function MyMap({ userId }: MyMapProps) {
  const [mapData, setMapData] = useState<MapItem[]>([]);

  useEffect(() => {
    checkMyMap();
    getMyLiked();
  }, []);

  const checkMyMap = async () => {
    if (!userId) return;
    try {
      const { data } = await getMyMap(userId);
      setMapData(data.response.content);
    } catch (err) {
      console.log("마이 맵 실패", err);
    }
  };

  const getMyLiked = async () => {
    if (userId) return;
    try {
      const { response } = (await getLikedShop()) as LikedMapResponse;
      setMapData(response.content);
    } catch (err) {
      console.log("나의 좋아요 에러");
    }
  };

  const removeItemFromList = (id: number) => {
    setMapData((prevData) => prevData.filter((item) => item.restaurant.id !== id));
  };

  return (
    <section className="w-full sm:max-w-[640px] mx-auto">
      <Header title="나의 맛집 리스트" type="arrow" back="prePage" />
      <div className="flex flex-col items-center">
        <MyListMap mapData={mapData} />
        <div className="w-full sm:max-w-[640px] ">
          {mapData.map((data: MapItem) => (
            <MyShopItem key={data.restaurant.id} item={data} removeItem={removeItemFromList} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default MyMap;
