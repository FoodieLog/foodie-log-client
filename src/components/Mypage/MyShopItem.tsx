import React from "react";
import usePostStore from "@/src/store/usePostStore";
import { PiStarThin, PiStarFill } from "react-icons/pi";
import useSignUpStore from "@/src/store/useSignUpStore";
import { getIcon } from "../../utils/iconUtils";
import Link from "next/link";
import Image from "next/image";

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
  const shopCategoryIcon = `/images/foodCategoryIcons/${getIcon(item.restaurant.category)}`;
  console.log("shopCategoryIcon", shopCategoryIcon);
  const onClickShophandler = (e: React.MouseEvent) => {
    e.preventDefault();
    setNextComponent("PostImage");
    setContent({ ...content, ...item });
  };

  return (
    <div
      onClick={onClickShophandler}
      className="relative flex items-center justify-between py-3 px-10 mt-3 border hover:bg-gray-300 "
    >
      <div className="flex  items-center gap-x-5">
        <Link href={`/main/restaurants/${item.restaurant.id}`}>
          <div className="relative w-12 h-12">
            <Image
              fill
              src={shopCategoryIcon}
              alt="음식점 썸네일"
              sizes="(max-width: 48px) 48px, 48px"
              className="w-12 h-12 border rounded-full cursor-pointer"
            />
          </div>
        </Link>
        <div key={item.restaurant.id}>
          <Link href={`/main/restaurants/${item.restaurant.id}`}>
            <strong>{item.restaurant.name}</strong>
          </Link>
          <Link href={`/main/restaurants/${item.restaurant.id}`}>
            <p>{item.restaurant.roadAddress}</p>
          </Link>
          <Link href={`/main/restaurants/${item.restaurant.id}`}>
            <p>{item.restaurant.category}</p>
          </Link>
        </div>
      </div>
      <div>{item.isLiked.liked ? <PiStarFill size="2rem" color="#FF6D60" /> : <PiStarThin size="2rem" />}</div>
    </div>
  );
}

export default MyShopItem;
