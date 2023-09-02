"use client";
import ShopThumb from "./ShopThumb";
import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";
import { generateShopDummyData } from "../../utils/dummyDataUtils";

const ShopThumbList = () => {
  const [dummyShopData, setDummyShopData] = useState<any[]>([]);

  useEffect(() => {
    const DUMMY_DATA = generateShopDummyData();
    setDummyShopData(DUMMY_DATA);
  }, []);

  return (
    <div className="w-full flex flex-col items-center p-1 max-w-[640px]">
      {dummyShopData.map((shopData,index) => (
        <ShopThumb key={index} {...shopData} />
      ))}
    </div>
  );
};

export default ShopThumbList;
