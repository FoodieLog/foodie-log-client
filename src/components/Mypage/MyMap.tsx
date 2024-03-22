"use client";
import { MyMapProps } from "@@types/mypage";
import MyListMap from "@components/Map/MyListMap";
import useMyMapQuery from "@hooks/queries/useMyMapQuery";

function MyMap({ userId }: MyMapProps) {
  const { data } = useMyMapQuery(userId);

  return (
    <section className="w-full sm:max-w-[640px] mx-auto">
      <div className="flex flex-col items-center">
        <MyListMap mapData={data?.myMap} />
      </div>
    </section>
  );
}

export default MyMap;
