import { RestaurantCategory } from "@@types/restaurant";
import { categoryTags, tagNames } from "@constants";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";

interface FeedsCategorySliderProps {
  setCategory: Dispatch<SetStateAction<RestaurantCategory>>;
}

const FeedsCategorySlider = ({ setCategory }: FeedsCategorySliderProps) => {
  const [selected, setSelected] = useState<string>("전체");

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
            className={`flex p-2.5 font-bold whitespace-nowrap ${
              selected === tagName && "border-b-2 border-red text-red"
            }  `}
            onClick={() => {
              setSelected(tagName);
              setCategory(categoryTags[tagName]);
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
