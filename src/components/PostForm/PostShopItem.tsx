import React from "react";
import usePostStore from "@store/usePostStore";
import useSignUpStore from "@store/useSignUpStore";
import LocationOn from "@assets/icons/common/location_on.svg";
import { ShopItem } from "@@types/post";

interface PostShopItemProps {
  item: ShopItem;
  keyword: string;
}

function PostShopItem({ item, keyword }: PostShopItemProps) {
  const { content, setContent } = usePostStore();
  const setNextComponent = useSignUpStore((state) => state.setNextComponent);

  const onClickhandler = (e: React.MouseEvent) => {
    e.preventDefault();
    setNextComponent("PostImage");
    setContent({ ...content, ...item });
  };

  return (
    <div onClick={onClickhandler} className="py-3 hover:bg-gray-1 cursor-pointer relative">
      <div className="flex items-center">
        <LocationOn color="red" />
        <p className="ml-1.5 text-lg text-gray-10 w-[90%] overflow-hidden whitespace-nowrap text-ellipsis">
          {keyword && item.place_name.includes(keyword) ? (
            <>
              {item.place_name.split(keyword)[0]}
              <span className="text-red">{keyword}</span>
              {item.place_name.split(keyword)[1]}
            </>
          ) : (
            item.place_name
          )}
        </p>
      </div>
      <p className="text-sm text-gray-3">{item.road_address_name}</p>
    </div>
  );
}

export default PostShopItem;
