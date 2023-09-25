import React, { useState } from "react";
import usePostStore from "@/src/store/usePostStore";
import { PiStarThin, PiStarFill } from "react-icons/pi";
import useSignUpStore from "@/src/store/useSignUpStore";
import { getIcon } from "../../utils/iconUtils";
import Link from "next/link";
import Image from "next/image";
import DialogConfirm from "../Dialog/DialogConfirm";
import { likeRestaurant, unlikeRestaurant } from "@/src/services/apiFeed";

interface ShopProps {
  item: MapItem;
  removeItem: (id: number) => void;
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

function MyShopItem({ item, removeItem }: ShopProps) {
  const { content, setContent } = usePostStore();
  const setNextComponent = useSignUpStore((state) => state.setNextComponent);
  const shopCategoryIcon = `/images/foodCategoryIcons/${getIcon(item.restaurant.category)}`;

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [like, setLike] = useState(item.isLiked.liked);

  // console.log("shopCategoryIcon", shopCategoryIcon);
  const onClickShophandler = (e: React.MouseEvent) => {
    e.preventDefault();
    setNextComponent("PostImage");
    setContent({ ...content, ...item });
  };

  const handleLikeToggle = async () => {
    if (like) {
      // 현재 좋아요 상태이므로 DialogConfirm를 열어서 한 번 더 확인
      setConfirmDialogOpen(true);
    } else {
      // 현재 좋아요 상태가 아니므로 바로 좋아요 설정 로직 수행
      try {
        await likeRestaurant(item.isLiked.id);
        setLike(true);
      } catch (error) {
        console.error("식당 좋아요 설정 동작 중 오류가 발생했습니다.", error);
      }
    }
  };

  const handleConfirmUnLike = async () => {
    // DialogConfirm에서 확인을 눌렀을 때만 좋아요 취소 로직 수행
    try {
      await unlikeRestaurant(item.isLiked.id);
      setLike(false);
      setConfirmDialogOpen(false);
      removeItem(item.restaurant.id);
    } catch (error) {
      console.error("식당 좋아요 취소 동작 중 오류가 발생했습니다.", error);
      setConfirmDialogOpen(false);
    }
  };

  return (
    <div
      onClick={onClickShophandler}
      className="relative flex items-center justify-between py-3 px-10 mt-3 border hover:bg-gray-300 max-sm:text-xs"
    >
      <div className="flex items-center gap-x-5 mr-4">
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
      <div onClick={handleLikeToggle}>
        {like ? <PiStarFill size="2rem" color="#FF6D60" /> : <PiStarThin size="2rem" />}
      </div>

      <DialogConfirm
        content="정말로 좋아요를 취소하시겠습니까?"
        isOpened={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={handleConfirmUnLike}
      />
    </div>
  );
}

export default MyShopItem;
