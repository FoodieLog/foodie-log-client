"use client"
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { area } from "@/src/constants";
import { BiSearch } from "react-icons/bi";
import { GrPowerReset } from "react-icons/gr";
import useHideOnScroll from '../hooks/useHideOnScroll';

type AreaType = {
  [key: string]: {
    [key: string]: string[];
  };
};

interface AreaSelectorProps {
  onSelectedAreaChange?: (selectedArea: {
    selectedRegion: string;
    selectedDo: string;
    selectedSiGunGu: string;
  }) => void;
}

const AreaSelector: React.FC<AreaSelectorProps> = ({ onSelectedAreaChange }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>("수도권");
  const [selectedDo, setSelectedDo] = useState<string>("서울시");
  const [selectedSiGunGu, setSelectedSiGunGu] = useState<string>("");

  const [doOptions, setDoOptions] = useState<string[]>([]);
  const [siGunGuOptions, setSiGunGuOptions] = useState<string[]>([]);

  const [message, setMessage] = useState<string>("");

  const isVisible = useHideOnScroll();

  useEffect(() => {
    if (selectedDo && selectedSiGunGu) {
      setMessage(`${selectedDo} ${selectedSiGunGu} 맛집을 검색해 볼까요?`);
    } else {
      setMessage("");
    }
  }, [selectedDo, selectedSiGunGu]);

  // 모든 값이 선택되었는지 확인하는 함수
  const allValuesSelected = () => {
    return selectedRegion && selectedDo && selectedSiGunGu &&
      selectedRegion !== "선택" && selectedDo !== "선택" && selectedSiGunGu !== "";
  };

  useEffect(() => {
    if (selectedRegion && (area as AreaType)[selectedRegion]) {
      setDoOptions(Object.keys((area as AreaType)[selectedRegion]));
    } else {
      setDoOptions([]);
      setSelectedDo("");
      setSelectedSiGunGu("");
    }
  }, [selectedRegion]);

  useEffect(() => {
    if (selectedDo && (area as AreaType)[selectedRegion] && (area as AreaType)[selectedRegion][selectedDo]) {
      setSiGunGuOptions((area as AreaType)[selectedRegion][selectedDo]);
    } else {
      setSiGunGuOptions([]);
      setSelectedSiGunGu("");
    }
  }, [selectedDo, selectedRegion]);

  useEffect(() => {
    if (onSelectedAreaChange) {
      onSelectedAreaChange({
        selectedRegion,
        selectedDo,
        selectedSiGunGu,
      });
    }
  }, [selectedRegion, selectedDo, selectedSiGunGu, onSelectedAreaChange]);

  return (
    <div className={`z-20 w-full sticky border-b border-solid item-center 
     bg-white border border-gray-300 sm:rounded-md p-1 m-0 sm:m-4 sm:w-[480px]
     ${isVisible ? "top-0" : "-top-16"} transition-top duration-300`}>
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
          onClick={() => {
            // 검색 로직 추가
          }}
          disabled={!allValuesSelected()}
        >
          <BiSearch />
        </button>

        <button
          className="px-2 py-1 text-lg "
          onClick={() => {
            setSelectedRegion("선택");
            setSelectedDo("선택");
            setSelectedSiGunGu("선택");
          }}
        >
          <GrPowerReset />
        </button>
      </div>
      {message && <div className="text-black text-center mt-2">{message}</div>}
    </div>
  );
};

AreaSelector.propTypes = {
  onSelectedAreaChange: PropTypes.func,
};

export default AreaSelector;
