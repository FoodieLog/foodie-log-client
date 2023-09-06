"use client";
import ShopThumb from "./ShopThumb";
import { useState } from "react";

const ShopThumbList = ({ restaurants }: { restaurants: any[] }) => {
  console.log("restaurants", restaurants)
  return (
    <div className="w-full flex flex-col items-center p-1 max-w-[640px]">
      {restaurants.map((restaurant, index) => (
        <ShopThumb key={index} {...restaurant} />
      ))}
    </div>
  );
};

export default ShopThumbList;
