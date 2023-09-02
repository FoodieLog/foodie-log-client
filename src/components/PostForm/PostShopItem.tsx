import React from "react";
import { usePostStore } from "@/src/store/usePostStore";
import { LiaExchangeAltSolid } from "react-icons/lia";
import useSignUpStore from "@/src/store/useSignUpStore";

interface ShopProps {
  type: string;
  item: ShopItem;
}

interface ShopItem {
  id: string;
  place_name: string;
  place_url: string;
  category_name: string;
  address_name: string;
  road_address_name: string;
  phone: string;
  x: string;
  y: string;
}

function PostShopItem({ type, item }: ShopProps) {
  const { content, setContent } = usePostStore();
  const setNextComponent = useSignUpStore((state) => state.setNextComponent);

  const onClickhandler = (e: React.MouseEvent) => {
    setNextComponent("PostImage");
    setContent({ ...content, ...item });
  };

  const resetShop = (e: React.MouseEvent) => {
    e.preventDefault();
    setNextComponent("PostSearch");
  };

  return (
    <div
      onClick={onClickhandler}
      className="flex items-center gap-5 px-5 py-3 mt-5 border hover:bg-gray-300 cursor-pointer"
    >
      <div className="w-[40px] h-[40px] border border-gray-400 rounded-full overflow-hidden cursor-pointer">
        {/* <Image src={"#"} alt="식당 썸네일" width={40} height={40} /> */}
      </div>
      <div>
        <strong>{item.place_name}</strong>
        <p>{item.road_address_name}</p>
        <p>{item.category_name}</p>
      </div>
      {type === "selected" && (
        <LiaExchangeAltSolid className="w-5 h-5 cursor-pointer hover:text-red-500" onClick={resetShop} />
      )}
    </div>
  );
}

export default PostShopItem;
