import React from "react";
import { AutoreNew, LocationOn } from "@assets/icons";
import { BasicThumbnail } from "@assets/images";
import usePostStore from "@store/usePostStore";
import useOnClickBack from "@hooks/useOnClickBack";

function PostContentShopItem() {
  const {
    content: { place_name, road_address_name },
  } = usePostStore();

  return (
    <div className="relative border border-gray-2 rounded-[5px] flex p-2 mt-5 mb-3">
      <BasicThumbnail />
      <div className="ml-[16px]">
        <p className="text-lg font-bold text-gray-10">{place_name}</p>
        <div className="flex items-center">
          <LocationOn />
          <p className="ml-[4px] text-sm font-normal text-gray-4">{road_address_name}</p>
        </div>
      </div>
      <AutoreNew className="absolute right-[8px] cursor-pointer" onClick={useOnClickBack} />
    </div>
  );
}

export default PostContentShopItem;
