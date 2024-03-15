import { tagNames } from "@constants";
import { motion } from "framer-motion";
import { useState } from "react";

const FeedsCategorySlider = () => {
  const [selected, setSelected] = useState<string>("전체");

  //TODO:selected된 데이터 필터링

  const sliderVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={sliderVariants}
      className="flex overflow-x-auto"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {["전체", ...tagNames].map((tagName) => (
        <div key={tagName}>
          <button
            className={`flex p-[10px] whitespace-nowrap ${selected === tagName && "border-b-2 border-red"}  `}
            onClick={() => {
              setSelected(tagName);
            }}
          >
            {tagName}
          </button>
        </div>
      ))}
    </motion.div>
  );
};

export default FeedsCategorySlider;
