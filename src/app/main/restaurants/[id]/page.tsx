import React from "react";
import RestaurantDetail from "@/src/components/Restaurant/RestaurantDetail";

interface RestaurantProps {
  params: {
    id: string;
  };
}

// props : {params : {id} } : RestaurantProps
const restaurant = ({ params: { id } }: RestaurantProps) => {
  return (
    <div className="w-full bg-orange-500 flex justify-center">
      <RestaurantDetail Id={id} />
    </div>
  );
};

export default restaurant;
