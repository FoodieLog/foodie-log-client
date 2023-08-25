"use client";

import { faker } from "@faker-js/faker";
import Feed from "./Feed";
import { useEffect, useState } from "react";
import { FeedData } from '../types/apiTypes';
import { generateFeedDummyData } from '../utils/dummyDataUtils';

const Feeds = () => {
  const [dummyFeedsData, setDummyFeedsData] = useState<FeedData[]>([]);
  useEffect(() => {
    const DUMMY_DATA = generateFeedDummyData();
    setDummyFeedsData(DUMMY_DATA);
  }, []);

  return (
    <div className="flex flex-col items-center">
      {dummyFeedsData.map((feedData, index) => (
        <Feed key={index} {...feedData} />
      ))}
    </div>
  );
};

export default Feeds;
