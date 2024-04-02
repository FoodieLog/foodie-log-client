import Image from "next/image";
import { AutoreNew, LocationOn } from "@assets/icons";
import { BasicThumbnail } from "@assets/images";
import usePostStore from "@store/usePostStore";
import useOnClickBack from "@hooks/useOnClickBack";

interface PostContentShopItemProps {
  isShowEdit: boolean;
}

function PostContentShopItem({ isShowEdit }: PostContentShopItemProps) {
  const {
    content: { place_name, road_address_name },
  } = usePostStore();

  return (
    <div className="relative border border-gray-2 rounded flex p-2 mt-5 mb-3">
      <Image src={BasicThumbnail} width={50} height={50} alt="기본 이미지" />
      <div className="ml-4">
        <p className="text-lg font-bold text-gray-10">{place_name}</p>
        <div className="flex items-center">
          <LocationOn />
          <p className="ml-1 text-sm font-normal text-gray-4">{road_address_name}</p>
        </div>
      </div>
      {!isShowEdit && (
        <div className="absolute right-0 cursor-pointer w-6 h-6">
          <AutoreNew color="#777777" onClick={useOnClickBack} />
        </div>
      )}
    </div>
  );
}

export default PostContentShopItem;
