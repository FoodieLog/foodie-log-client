"use client";
import { useEffect, useState } from "react";
import { getMyMap } from "../../services/mypage";
import { getLikedShop } from "../../services/apiFeed";
import { LikedMapResponse, MapItem } from "@/src/types/apiTypes";
import { MyMap } from "@/src/types/mypage";
import MyListMap from "./MyListMap";
import MyShopItem from "../Mypage/MyShopItem";
import Header from "../Common/Header";
import { useToast } from "@/components/ui/use-toast";

function MyMap({ userId, header }: MyMap) {
  const [mapData, setMapData] = useState<MapItem[]>([]);
  const [nickName, setNickName] = useState("");
  const [reload, setReload] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    checkMyMap();
    getMyLiked();
  }, [reload]);

  const checkMyMap = async () => {
    if (!userId) return;
    try {
      const { data } = await getMyMap(userId);
      setMapData(data.response.content);
      setNickName(data.response.nickName);
    } catch (err) {
      toast({ description: "에러가 발생했습니다. 다시 시도해주세요!" });
    }
  };

  const getMyLiked = async () => {
    if (userId) return;
    try {
      const { response } = (await getLikedShop()) as LikedMapResponse;
      setMapData(response.content);
    } catch (err) {
      toast({ description: "에러가 발생했습니다. 다시 시도해주세요!" });
    }
  };

  return (
    <section className="w-full sm:max-w-[640px] mx-auto">
      <Header title={header === "내가 리뷰한 맛집" ? header : `${nickName}${header}`} type="arrow" back="prePage" />
      <div className="flex flex-col items-center">
        <MyListMap mapData={mapData} />
        <div className="w-full sm:max-w-[640px] overflow-y-auto max-h-[calc(100vh-55vh)]">
          {mapData.map((data: MapItem) => (
            <MyShopItem key={data.restaurant.id} item={data} setReload={setReload} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default MyMap;
