import RestaurantDetail from "@/src/components/RestaurantDetail";

interface RestaurantProps {
  params: {
    id: string;
  };
}

const restaurant = (props : RestaurantProps) => {
  const restaurantId = (props.params.id);

  return (
    <div className="w-full bg-orange-500 flex justify-center">
      <RestaurantDetail Id={restaurantId} />
    </div>
  );
};

export default restaurant;
