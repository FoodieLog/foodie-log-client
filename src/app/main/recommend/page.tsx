"use client";
import React, { useState } from "react";
import AreaSelector from "@components/Restaurant/AreaSelector";
import ShopThumbList from "@components/Restaurant/ShopThumbList";
import { RegionType } from "@@types/recommend";

function Recommend() {
  const [selectedRegion, setSelectedRegion] = useState<RegionType>({
    city: "수도권",
    doName: "",
    sigungu: "",
  });
  const searchQuery = `${selectedRegion.doName} ${selectedRegion.sigungu || ""}`.trim();

  const clickRegionHandler = (optionType: string, selectedValue: string) => {
    if (optionType === "city") {
      setSelectedRegion({ city: selectedValue, doName: "", sigungu: "" });
    } else if (optionType === "doName") {
      setSelectedRegion((prev) => ({ ...prev, doName: selectedValue, sigungu: "" }));
    } else {
      setSelectedRegion((prev) => ({ ...prev, [optionType]: selectedValue }));
    }
  };

  return (
    <div className="flex flex-col pb-[110px]">
      <div className="px-5">
        <div className="h-[140px] flex flex-col justify-center gap-2.5">
          <h2 className="text-2xl text-gray-10">
            <p>맛집을 추천해드릴게요!</p>
            <p>어느 지역으로 추천해드릴까요?</p>
          </h2>
          <p className="text-sm text-gray-4">(중복선택은 불가해요)</p>
        </div>
        <AreaSelector selectedRegion={selectedRegion} clickRegionHandler={clickRegionHandler} />
      </div>
      <ShopThumbList searchQuery={searchQuery} />
    </div>
  );
}

export default Recommend;
