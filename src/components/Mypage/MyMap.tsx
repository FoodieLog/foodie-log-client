"use client";
import { useEffect, useState } from "react";
import { getMyMap } from "@services/mypage";
import { getLikedShop } from "@services/apiFeed";
import { LikedMapResponse, MapItem } from "@@types/apiTypes";
import { MyMapProps } from "@@types/mypage";
import MyListMap from "@components/Map/MyListMap";

function MyMap({ userId }: MyMapProps) {
  const [mapData, setMapData] = useState<MapItem[]>([]);
  const [reload, setReload] = useState(false);

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

  return (
    <section className="w-full sm:max-w-[640px] mx-auto">
      <div className="flex flex-col items-center">
        <MyListMap mapData={mapData} />
      </div>
    </section>
  );
}

export default MyMap;
