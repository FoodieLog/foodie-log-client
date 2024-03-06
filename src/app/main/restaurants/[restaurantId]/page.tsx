import React from "react";
import RestaurantDetail from "@components/Restaurant/RestaurantDetail";

interface RestaurantProps {
  params: {
    restaurantId: string;
  };
}

// props : {params : {restaurantId} } : RestaurantProps
const restaurant = ({ params: { restaurantId } }: RestaurantProps) => {
  return (
    <div className="w-full h-screen items-start flex justify-center overflow-hidden">
      <RestaurantDetail restaurantId={restaurantId} />
    </div>
  );
};

export default restaurant;
