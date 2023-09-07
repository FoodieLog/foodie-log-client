"use client";
import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getMyMap } from "../../services/mypage";
import { postFeed } from "../../services/post";
import { useUserStore } from "../../store/useUserStore";
import MyListMap from "../../components/Map/MyListMap";
import MyShopItem from "./MyShopItem";
import Header from "../Common/Header";

interface MapItem {
  isLiked: {
    id: number;
    liked: boolean;
  };
  restaurant: {
    category: string;
    id: number;
    link: string;
    mapX: string;
    mapY: string;
    name: string;
    roadAddress: string;
  };
}

function MyMap({ userId }: { userId: number }) {
  const [mapData, setMapData] = useState<MapItem[]>([]);

  useEffect(() => {
    checkMyMap();
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
    <>
      <Header title="나의 맛집 리스트" type="arrow" back="prePage" />
      <MyListMap mapData={mapData} />
      <div>
        {mapData.map((data: MapItem) => (
          <MyShopItem key={data.restaurant.id} item={data} />
        ))}
      </div>
    </>
  );
}

export default MyMap;
