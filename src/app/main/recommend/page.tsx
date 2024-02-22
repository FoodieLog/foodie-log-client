"use client";
import React, { useState } from "react";
import AreaSelector from "@/src/components/Restaurant/AreaSelector";
import ShopThumbList from "@/src/components/Restaurant/ShopThumbList";
import { getRestaurantRecommended } from "@/src/services/apiRestaurant";
import { RecommendedRestaurant } from "@/src/types/recommend";

const Recommend = () => {
  const [recommendedRestaurants, setRecommendedRestaurants] = useState<RecommendedRestaurant[]>([]);

  const handleSelectedAreaChange = async (searchQuery: string) => {
    try {
      const response = await getRestaurantRecommended(searchQuery);
      if (response.status === 200) {
        setRecommendedRestaurants(response.response.restaurantList);
      } else {
        console.error("추천 정보 가져오기 실패");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="recommend_container w-full flex flex-col justify-center items-center max-w-6xl sm:mx-auto">
      <AreaSelector onSelectedAreaChange={handleSelectedAreaChange} />
      <ShopThumbList restaurants={recommendedRestaurants} />
    </div>
  );
};

export default Recommend;
