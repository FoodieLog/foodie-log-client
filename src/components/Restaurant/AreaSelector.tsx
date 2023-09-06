import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { area } from "@/src/constants";
import { BiSearch } from "react-icons/bi";
import { GrPowerReset } from "react-icons/gr";
import useHideOnScroll from "../../hooks/useHideOnScroll";

type AreaType = {
  [key: string]: {
    [key: string]: string[];
  };
};

interface AreaSelectorProps {
  onSelectedAreaChange?: (searchQuery: string) => void;
}

const AreaSelector: React.FC<AreaSelectorProps> = ({ onSelectedAreaChange }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>("수도권");
  const [selectedDo, setSelectedDo] = useState<string>("서울시");
  const [selectedSiGunGu, setSelectedSiGunGu] = useState<string>("");

  const [doOptions, setDoOptions] = useState<string[]>([]);
  const [siGunGuOptions, setSiGunGuOptions] = useState<string[]>([]);

  const isVisible = useHideOnScroll();

  useEffect(() => {
    setDoOptions(selectedRegion ? Object.keys((area as AreaType)[selectedRegion]) : []);
  }, [selectedRegion]);

  useEffect(() => {
    const selectedOptions = selectedDo && (area as AreaType)[selectedRegion] 
      ? (area as AreaType)[selectedRegion][selectedDo] 
      : [];
    setSiGunGuOptions(selectedOptions || []);
  }, [selectedDo, selectedRegion]);

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
      className={`z-20 w-full sticky border-b border-solid item-center 
     bg-white border border-gray-300 sm:rounded-md p-1 m-0 sm:m-4 sm:w-[480px]
     ${isVisible ? "top-0" : "-top-16"} transition-top duration-300`}
    >
      <div className="flex items-center justify-evenly w-full">
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="border-none outline-none bg-transparent w-16 text-sm items-center"
        >
          <option value="">선택</option>
          {Object.keys(area).map((region) => (
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
          {doOptions.map((doOption) => (
            <option key={doOption} value={doOption}>
              {doOption}
            </option>
          ))}
        </select>

        <select
          value={selectedSiGunGu}
          onChange={(e) => setSelectedSiGunGu(e.target.value)}
          className="border-none outline-none bg-transparent w-20 text-sm items-center"
        >
          <option value="">선택</option>
          {siGunGuOptions.map((siGunGuOption) => (
            <option key={siGunGuOption} value={siGunGuOption}>
              {siGunGuOption}
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
