"use client";
import React, { useState } from "react";
import AreaSelector from "@components/Restaurant/AreaSelector";
import ShopThumbList from "@components/Restaurant/ShopThumbList";
import { getRecommendedRestaurant } from "@services/restaurant";

const Recommend = () => {
  const [recommendedRestaurants, setRecommendedRestaurants] = useState([]);

  const handleSelectedAreaChange = async (searchQuery: string) => {
    try {
      const response = await getRecommendedRestaurant(searchQuery);
      if (response.data.status === 200) {
        setRecommendedRestaurants(response.data.response.restaurantList);
      } else {
        console.error("추천 정보 가져오기 실패");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="recommend_container w-full flex flex-col justify-center items-center max-w-6xl sm:mx-auto pb-[110px]">
      <AreaSelector onSelectedAreaChange={handleSelectedAreaChange} />
      <ShopThumbList restaurants={recommendedRestaurants} />
    </div>
  );
};

export default Recommend;
