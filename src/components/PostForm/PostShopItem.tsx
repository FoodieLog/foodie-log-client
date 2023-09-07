import React from "react";
import { usePostStore } from "@/src/store/usePostStore";
import { LiaExchangeAltSolid } from "react-icons/lia";
import useSignUpStore from "@/src/store/useSignUpStore";
import useOnClickBack from "../../hooks/useOnClickBack";

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
    e.preventDefault();
    if (type === "search") {
      setNextComponent("PostImage");
      setContent({ ...content, ...item });
    }
  };

  return (
    <div
      onClick={onClickhandler}
      className="flex items-center justify-between gap-5 px-5 py-3 mt-5 border hover:bg-gray-300 cursor-pointer"
    >
      <div>
        <div key={item.id}>
          <strong>{item.place_name}</strong>
          <p>{item.road_address_name}</p>
          <p>{item.category_name}</p>
        </div>
      </div>
      {type === "selected" && (
        <LiaExchangeAltSolid className="w-5 h-5 cursor-pointer hover:text-red-500" onClick={useOnClickBack} />
      )}
    </div>
  );
}

export default PostShopItem;
