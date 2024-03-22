import React from "react";
import { area } from "@constants";
import { AreaType, RegionType } from "@@types/recommend";
import AreaOptionList from "@components/Restaurant/AreaOptionList";

interface AreaSelectorProps {
  selectedRegion: RegionType;
  clickRegionHandler: (optionType: string, selectedValue: string) => void;
}

function AreaSelector({ selectedRegion, clickRegionHandler }: AreaSelectorProps) {
  const { city, doName, sigungu } = selectedRegion;

  const regionList = Object.keys(area);
  const doList = city ? Object.keys((area as AreaType)[city]) : [];
  const siGunGuList = (city && doName ? (area as AreaType)[city][doName] : []) || [];

  return (
    <div className="flex flex-col gap-2.5 w-full">
      <div className="flex gap-2.5">
        <AreaOptionList
          optionType={"city"}
          optionList={regionList}
          selectedValue={city}
          clickRegionHandler={clickRegionHandler}
        />
        <AreaOptionList
          optionType={"doName"}
          optionList={doList}
          selectedValue={doName}
          clickRegionHandler={clickRegionHandler}
        />
      </div>
      <div>
        <AreaOptionList
          optionType={"sigungu"}
          optionList={siGunGuList}
          selectedValue={sigungu}
          clickRegionHandler={clickRegionHandler}
        />
      </div>
    </div>
  );
}

export default AreaSelector;
