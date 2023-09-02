import React from "react";
import AreaSelector from "@/src/components/Restaurant/AreaSelector";
import Bottombar from "@/src/components/Main/Bottombar";
import ShopThumbList from "@/src/components/Restaurant/ShopThumbList";

const Recommend = () => {
  return (
    <div className="recommend_container w-full flex flex-col justify-center items-center max-w-6xl mx-auto bg-orange-500">
      <AreaSelector />
      <ShopThumbList />
      <Bottombar />
    </div>
  );
};

export default Recommend;
