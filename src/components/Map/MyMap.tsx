"use client";
import MyListMap from "@components/Map/MyListMap";
import MyShopItem from "@components/Mypage/MyShopItem";
import Header from "@components/Common/Header";
import { MapItem } from "@@types/apiTypes";
import { MyMap } from "@@types/mypage";
import useMyMapQuery from "@hooks/queries/useMyMapQuery";

function MyMap({ userId, header }: MyMap) {
  const { data, isLoading } = useMyMapQuery(userId);

  //TODO: 로딩 UI 추가하기
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="w-full sm:max-w-[640px] mx-auto">
      <Header title={header === "내가 리뷰한 맛집" ? header : `${data?.nickName}${header}`} back="prePage" />
      <div className="flex flex-col items-center">
        <MyListMap mapData={data?.myMap} />
        <div className="w-full sm:max-w-[640px] overflow-y-auto max-h-[calc(100vh-55vh)]">
          {data?.myMap.map((data: MapItem) => (
            <MyShopItem key={data.restaurant.id} item={data} userId={userId} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default MyMap;
