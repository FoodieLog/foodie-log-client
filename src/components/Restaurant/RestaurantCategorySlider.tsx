import { motion } from "framer-motion";

import { useState } from "react";
import { tagNames } from "@/src/constants";
import { getTagIcon } from "@/src/utils/iconUtils";

const RestaurantCategorySlider = () => {
  const [selected, setSelected] = useState<string[]>([]);

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
            {getTagIcon(tagName, selected.includes(tagName))}
            <span className={`text-[14px] text-${selected.includes(tagName) ? "red" : "gray-10"} `}>{tagName}</span>
          </button>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default RestaurantCategorySlider;
