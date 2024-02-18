import React, { useState } from "react";
import PropTypes from "prop-types";
import { area } from "@/src/constants";
import { BiSearch } from "react-icons/bi";
import { GrPowerReset } from "react-icons/gr";
import useHideOnScroll from "@/src/hooks/useHideOnScroll";
import { AreaType, AreaSelectorProps } from "@/src/types/recommend";

const AreaSelector: React.FC<AreaSelectorProps> = ({ onSelectedAreaChange }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>("수도권");
  const [selectedDo, setSelectedDo] = useState<string>("");
  const [selectedSiGunGu, setSelectedSiGunGu] = useState<string>("");

  const regionList = Object.keys(area);
  const doList = selectedRegion ? Object.keys((area as AreaType)[selectedRegion]) : [];
  const siGunGuList = (selectedRegion && selectedDo ? (area as AreaType)[selectedRegion][selectedDo] : []) || [];

  const isVisible = useHideOnScroll();

  const allValuesSelected = () => {
    return selectedRegion && selectedDo;
  };

  const handleSearch = () => {
    if (onSelectedAreaChange) {
      const searchQuery = selectedSiGunGu ? `${selectedDo} ${selectedSiGunGu}` : selectedDo;

      onSelectedAreaChange(searchQuery);
    }
  };

  return (
    <div
      className={`z-20 w-full border-b border-solid items-center
     bg-white border border-gray-300 sm:rounded-md p-2 sm:mx-mt-4 sm:w-[480px]
     ${isVisible ? "fixed top-0" : "fixed -top-16"} transition-top duration-300`}
    >
      <div className="flex items-center justify-evenly w-full">
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="border-none outline-none bg-transparent w-16 text-sm items-center"
        >
          <option value="">선택</option>
          {regionList.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>

        <select
          value={selectedDo}
          onChange={(e) => setSelectedDo(e.target.value)}
          className="border-none outline-none bg-transparent w-24 text-sm items-center"
        >
          <option value="">선택</option>
          {doList.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>

        <select
          value={selectedSiGunGu}
          onChange={(e) => setSelectedSiGunGu(e.target.value)}
          className="border-none outline-none bg-transparent w-20 text-sm items-center"
        >
          <option value="">선택</option>
          {siGunGuList.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>

        <button
          className={`ml-2 px-2 py-1 text-lg ${allValuesSelected() ? "text-blue-500" : ""}`}
          onClick={handleSearch}
          disabled={!allValuesSelected()}
        >
          <BiSearch />
        </button>

        <button
          className="px-2 py-1 text-lg "
          onClick={() => {
            setSelectedRegion("");
            setSelectedDo("");
            setSelectedSiGunGu("");
          }}
        >
          <GrPowerReset />
        </button>
      </div>
    </div>
  );
};

AreaSelector.propTypes = {
  onSelectedAreaChange: PropTypes.func,
};

export default AreaSelector;
