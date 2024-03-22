import React, { useRef } from "react";
import useDetectClose from "@hooks/useDetectClose";

interface AreaSelectBoxProps {
  optionType: string;
  optionList: string[];
  selectedValue: string;
  clickRegionHandler: (optionType: string, selectedValue: string) => void;
}

function AreaOptionList({ optionType, optionList, selectedValue, clickRegionHandler }: AreaSelectBoxProps) {
  const dropdownRef = useRef<HTMLUListElement>(null);
  const { isOpen, toggleOpen } = useDetectClose(dropdownRef, false);

  const toggleOptionList = () => toggleOpen();

  const selectOptionHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    clickRegionHandler(optionType, e.currentTarget.innerText);
    toggleOpen();
  };

  return (
    <ul
      ref={dropdownRef}
      onClick={toggleOptionList}
      className="w-full h-[40px] border rounded-[5px] px-4 appearance-none bg-drop-down bg-no-repeat bg-right relative cursor-pointer"
    >
      <li className="absolute top-1/2 translate-y-[-50%]">{selectedValue || "선택"}</li>
      {isOpen && !!optionList.length && (
        <div
          className={`z-20 border border-gray-2 rounded-[5px] absolute top-[48px] left-0 w-full overflow-y-auto ${
            isOpen ? "max-h-[250px]" : "max-h-0"
          }`}
        >
          {optionList.map((optionItem) => (
            <li key={optionItem} className="w-full h-[40px] bg-gray-0 flex itemx-center">
              <button type="button" onClick={selectOptionHandler} className="w-full bg-gray-0 text-left px-[16px]">
                {optionItem}
              </button>
            </li>
          ))}
        </div>
      )}
    </ul>
  );
}

export default AreaOptionList;
