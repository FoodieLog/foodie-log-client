import Link from "next/link";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { getIcon } from "../../utils/iconUtils";
import { FiExternalLink } from "react-icons/fi";
import { useState } from "react";
import Image from "next/image";
import { PiStarFill, PiStarThin } from "react-icons/pi";
import { likeRestaurant, unlikeRestaurant } from "@/src/services/apiFeed";

interface ShopCardProps {
  id: number;
  name: string;
  category: string;
  roadAddress: string;
  isLiked?: boolean;
  shopUrl?: string;
  disableClick?: boolean;
}

const ShopCard: React.FC<ShopCardProps> = ({ id, name, category, roadAddress, isLiked, shopUrl, disableClick }) => {
  const shopCategoryIcon = `/images/foodCategoryIcons/${getIcon(category)}`;
  const [like, setLike] = useState(isLiked);

  const handleLikeToggle = async () => {
    try {
      if (like) {
        await unlikeRestaurant(id);
      } else {
        await likeRestaurant(id);
      }
      setLike(!like);
    } catch (error) {
      console.error("식당 좋아요/좋아요 취소 동작 중 오류가 발생했습니다.", error);
    }
  };

  return (
    <div
      className="flex items-center justify-between px-4 py-2"
      style={{ pointerEvents: disableClick ? "none" : "auto" }}
    >
      {" "}
      {/* Change flex layout to justify-between */}
      <div className="flex items-center">
        <Link href={`/main/restaurants/${id}`}>
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
        <div className="flex flex-col items-start p- ml-3">
          <Link href={`/main/restaurants/${id}`}>
            <p className="font-bold text-base cursor-pointer">{name}</p>
          </Link>
          <Link href={`/main/restaurants/${id}`}>
            <p className="text-sm cursor-pointer">{roadAddress}</p>
          </Link>
        </div>
      </div>
      {(isLiked !== undefined || shopUrl) && ( // Adjust this condition to show the right section only when needed
        <div className="flex items-center">
          {isLiked !== undefined && (
            <button className="text-[24px] mr-2" onClick={handleLikeToggle}>
              {like ? <PiStarFill size="2rem" color="#FF6D60" /> : <PiStarThin size="2rem" />}
            </button>
          )}
          {shopUrl && (
            <a href={shopUrl} target="_blank" rel="noopener noreferrer">
              <FiExternalLink className="text-[24px] cursor-pointer ml-4 mr-2" />
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default ShopCard;
