import { motion } from "framer-motion";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { tagNames } from "@/src/constants";
import Asian from "@assets/icons/tag/asian.svg";
import Bar from "@assets/icons/tag/bar.svg";
import Cafe from "@assets/icons/tag/cafe.svg";
import Japanese from "@assets/icons/tag/japanese.svg";
import Korean from "@assets/icons/tag/korean.svg";
import Snack from "@assets/icons/tag/snack.svg";
import Western from "@assets/icons/tag/western.svg";
import Fusion from "@assets/icons/tag/fusion.svg";
import Etc from "@assets/icons/tag/etc.svg";
import AsianSelected from "@assets/icons/tag/asian_selected.svg";
import BarSelected from "@assets/icons/tag/bar_selected.svg";
import CafeSelected from "@assets/icons/tag/cafe_selected.svg";
import JapaneseSelected from "@assets/icons/tag/japanese_selected.svg";
import KoreanSelected from "@assets/icons/tag/korean_selected.svg";
import SnackSelected from "@assets/icons/tag/snack_selected.svg";
import WesternSelected from "@assets/icons/tag/western_selected.svg";
import FusionSelected from "@assets/icons/tag/fusion_selected.svg";
import EtcSelected from "@assets/icons/tag/etc_selected.svg";

interface RestaurantCategorySliderProps {
  select: {
    selected: string[];
    setSelected: Dispatch<SetStateAction<string[]>>;
  };
}

const RestaurantCategorySlider = ({ select: { selected, setSelected } }: RestaurantCategorySliderProps) => {
  const onSelectToggleHandler = (tagName: string) => {
    if (selected.includes(tagName)) {
      setSelected(selected.filter((selectedTag) => tagName !== selectedTag));
    } else {
      setSelected([...selected, tagName]);
    }
  };

  const sliderVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const tagIcons: { [key: string]: { selected: ReactNode; unSelected: ReactNode } } = {
    한식: { unSelected: <Korean />, selected: <KoreanSelected /> },
    카페: { unSelected: <Cafe />, selected: <CafeSelected /> },
    분식: { unSelected: <Snack />, selected: <SnackSelected /> },
    아시안: { unSelected: <Asian />, selected: <AsianSelected /> },
    일식: { unSelected: <Japanese />, selected: <JapaneseSelected /> },
    양식: { unSelected: <Western />, selected: <WesternSelected /> },
    주점: { unSelected: <Bar />, selected: <BarSelected /> },
    퓨전: { unSelected: <Fusion />, selected: <FusionSelected /> },
    기타: { unSelected: <Etc />, selected: <EtcSelected /> },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={sliderVariants}
      className="flex overflow-x-auto mx-2"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {tagNames.map((tagName, index) => (
        <motion.div
          key={tagName}
          className={`flex-shrink-0 ${index === 0 ? "pr-1" : index === 7 ? "pl-1" : " px-1"} 
          }`}
          whileHover={{ scale: 1.1 }}
        >
          <button
            className={`flex gap-1 py-1.5 px-2 whitespace-nowrap justify-center items-center rounded-[15px] ${
              selected.includes(tagName) ? "bg-red-1" : "bg-gray-1"
            } w-full h-[25px]`}
            onClick={() => {
              onSelectToggleHandler(tagName);
            }}
          >
            {selected.includes(tagName) ? tagIcons[tagName].selected : tagIcons[tagName].unSelected}
            <span className={`text-sm text-${selected.includes(tagName) ? "red" : "gray-10"} `}>{tagName}</span>
          </button>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default RestaurantCategorySlider;
