"use client";
import { MyMapProps } from "@@types/mypage";
import MyListMap from "@components/Map/MyListMap";
import useMyMapQuery from "@hooks/queries/useMyMapQuery";

function MyMap({ userId }: MyMapProps) {
  const { data } = useMyMapQuery(userId);
  const mapHeight = window.innerHeight - 370;

  return (
    <section className="w-full sm:max-w-[640px] mx-auto">
      <div className="flex flex-col items-center">
        <MyListMap mapData={data?.myMap} size={{ width: "100%", height: `${mapHeight}px` }} />
      </div>
    </section>
  );
}

export default MyMap;
