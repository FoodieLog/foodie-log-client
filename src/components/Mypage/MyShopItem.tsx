import React from "react";
import { usePostStore } from "@/src/store/usePostStore";
import { PiStarThin, PiStarFill } from "react-icons/pi";
import useSignUpStore from "@/src/store/useSignUpStore";

interface ShopProps {
  item: MapItem;
}

interface MapItem {
  isLiked: {
    id: number;
    liked: boolean;
  };
  restaurant: {
    category: string;
    id: number;
    link: string;
    mapX: string;
    mapY: string;
    name: string;
    roadAddress: string;
  };
}

function MyShopItem({ item }: ShopProps) {
  const { content, setContent } = usePostStore();
  const setNextComponent = useSignUpStore((state) => state.setNextComponent);

  const onClickShophandler = (e: React.MouseEvent) => {
    setNextComponent("PostImage");
    setContent({ ...content, ...item });
  };

  return (
    <div
      onClick={onClickShophandler}
      className="relative flex items-center justify-between py-3 px-10 mt-3 border hover:bg-gray-300 cursor-pointer"
    >
      <div className="flex  items-center gap-x-5">
        <div className="w-[40px] h-[40px] border border-gray-400 rounded-full overflow-hidden cursor-pointer">
          {/* <Image src={"#"} alt="식당 썸네일" width={40} height={40} /> */}
        </div>
        <div key={item.restaurant.id}>
          <strong>{item.restaurant.name}</strong>
          <p>{item.restaurant.roadAddress}</p>
          <p>{item.restaurant.category}</p>
        </div>
      </div>
      <div>{item.isLiked.liked ? <PiStarFill size="2rem" color="#FF6D60" /> : <PiStarThin size="2rem" />}</div>
    </div>
  );
}

export default MyShopItem;
