"use client";
import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getMyMap } from "../../services/mypage";
import { postFeed } from "../../services/post";
import { useUserStore } from "../../store/useUserStore";
import { getLikedShop } from "../../services/apiFeed";
import { LikedMapResponse, MapItem } from "@/src/types/apiTypes";
import MyListMap from "../../components/Map/MyListMap";
import MyShopItem from "./MyShopItem";
import Header from "../Common/Header";

function MyMap({ userId }: { userId: number }) {
  const [mapData, setMapData] = useState<MapItem[]>([]);

  useEffect(() => {
    checkMyMap();
  }, []);

  useEffect(() => {
    getMyLiked();
  }, []);

  const checkMyMap = async () => {
    if (!userId) return;
    try {
      const { data } = await getMyMap(userId);
      setMapData(data.response.content);
      console.log("마미 맵 성공", data);
    } catch (err) {
      console.log("마이 맵 실패", err);
    }
  };

  const getMyLiked = async () => {
    if (userId) return;
    try {
      const { response } = (await getLikedShop()) as LikedMapResponse;
      setMapData(response.content);
      console.log("나의 좋아요", response.content);
    } catch (err) {
      console.log("나의 좋아요 에러");
    }
  };

  // const queryClient = useQueryClient();

  // const { data, isLoading, isError, error } = useQuery({ queryKey: ["mapData"], queryFn: () => getMyMap(userId) });

  // const mutation = useMutation({
  //   mutationFn: postFeed,
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries({ queryKey: ["mapData"] });
  //   },
  // });

  // if (isLoading) {
  //   return <div>로딩중</div>;
  // }

  return (
    <section className="w-full sm:max-w-[640px] mx-auto">
      <Header title="나의 맛집 리스트" type="arrow" back="prePage" />
      <div className="flex flex-col items-center">
        <MyListMap mapData={mapData} />
        <div className="w-full sm:max-w-[640px] ">
          {mapData.map((data: MapItem) => (
            <MyShopItem key={data.restaurant.id} item={data} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default MyMap;
