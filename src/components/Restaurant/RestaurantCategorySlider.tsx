import { motion } from "framer-motion";
import {
  Asian,
  Bar,
  Cafe,
  Dessert,
  Japanese,
  Korean,
  Snack,
  Western,
  AsianSelected,
  BarSelected,
  CafeSelected,
  DessertSelected,
  JapaneseSelected,
  KoreanSelected,
  SnackSelected,
  WesternSelected,
} from "@assets/icons";
import { useState } from "react";

const RestaurantCategorySlider = () => {
  const tagNames = ["한식", "카페", "디저트", "분식", "아시안", "일식", "양식", "주점"];
  const [selected, setSelected] = useState<string[]>([]);

  const onSelectToggleHandler = (tagName: string) => {
    if (selected.includes(tagName)) {
      setSelected(selected.filter((selectedTag) => tagName !== selectedTag));
    } else {
      setSelected([...selected, tagName]);
    }
  };

  const tagIcons: { [key: string]: { selected: React.JSX.Element; unSelected: React.JSX.Element } } = {
    한식: { unSelected: <Korean />, selected: <KoreanSelected /> },
    카페: { unSelected: <Cafe />, selected: <CafeSelected /> },
    디저트: { unSelected: <Dessert />, selected: <DessertSelected /> },
    분식: { unSelected: <Snack />, selected: <SnackSelected /> },
    아시안: { unSelected: <Asian />, selected: <AsianSelected /> },
    일식: { unSelected: <Japanese />, selected: <JapaneseSelected /> },
    양식: { unSelected: <Western />, selected: <WesternSelected /> },
    주점: { unSelected: <Bar />, selected: <BarSelected /> },
  };

  const sliderVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
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
            className={`flex gap-1 py-[6px] px-[8px] whitespace-nowrap justify-center items-center rounded-[15px] ${
              selected.includes(tagName) ? "bg-red-1" : "bg-gray-1"
            } w-full h-[25px]`}
            onClick={() => {
              onSelectToggleHandler(tagName);
            }}
          >
            {selected.includes(tagName) ? tagIcons[tagName].selected : tagIcons[tagName].unSelected}
            <span className={`text-[14px] text-${selected.includes(tagName) ? "red" : "gray-10"} `}>{tagName}</span>
          </button>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default RestaurantCategorySlider;
