"use client";
import MyListMap from "@components/Map/MyListMap";
import Header from "@components/Common/Header";
import { MapItem } from "@@types/apiTypes";
import { MyMapType } from "@@types/mypage";
import useMyMapQuery from "@hooks/queries/useMyMapQuery";
import ShopCard from "@components/Common/Card/ShopCard";
import Drawer from "@components/Common/Drawer/Drawer";
import RestaurantCategorySlider from "@components/Restaurant/RestaurantCategorySlider";
import { useState } from "react";
import Skeleton from "@components/Common/Skeleton";
import { useUserStore } from "@/src/store/useUserStore";
import { usePathname } from "next/navigation";

function MyMap({ userId, header }: MyMapType) {
  const { data, isLoading } = useMyMapQuery(userId);
  const [selected, setSelected] = useState<string[]>([]);
  const { user } = useUserStore();
  const pathname = usePathname();

  const filteredRestaurant = selected.length
    ? data?.myMap.filter((data: MapItem) => selected.includes(data.restaurant.category))
    : data?.myMap;

  const headerString =
    header === "내가 리뷰한 맛집"
      ? header
      : pathname === "/main/liked"
      ? `${user.nickName}${header}`
      : `${data?.nickName}${header}`;

  //TODO: 로딩 UI 추가하기
  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <section className="w-full sm:max-w-[640px] mx-auto h-[100vh] overflow-hidden relative">
      <Header title={headerString} back="prePage" />
      <div className="flex flex-col items-center">
        <MyListMap mapData={data?.myMap} size={{ width: "100%", height: "calc(100vh - 56px - 56px)" }} />
        <Drawer
          open={false}
          scroller
          closedHeight={250}
          openedHeight={500}
          fixedComponent={<RestaurantCategorySlider select={{ selected, setSelected }} />}
        >
          <div className="flex flex-col gap-4">
            {filteredRestaurant.map((data: MapItem) => (
              <ShopCard
                key={data?.restaurant.id}
                id={data?.restaurant.id}
                name={data?.restaurant.name ?? ""}
                category={data?.restaurant.category ?? ""}
                roadAddress={data?.restaurant.roadAddress ?? ""}
                isLiked={data?.isLiked.liked}
                userId={userId}
                href={`/main/restaurants/${data?.restaurant.id}`}
              />
            ))}
          </div>
        </Drawer>
      </div>
    </section>
  );
}

export default MyMap;
