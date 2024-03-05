import React from "react";
import RestaurantDetail from "@/src/components/Restaurant/RestaurantDetail";

interface RestaurantProps {
  params: {
    restaurantId: string;
  };
}

// props : {params : {restaurantId} } : RestaurantProps
const restaurant = ({ params: { restaurantId } }: RestaurantProps) => {
  return (
    <div className="w-full flex justify-center">
      <RestaurantDetail restaurantId={restaurantId} />
    </div>
  );
};

export default restaurant;
