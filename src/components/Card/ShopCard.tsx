import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { getIcon } from "@utils/iconUtils";
import { likeRestaurant, unlikeRestaurant } from "@services/apiFeed";
import { LocationOn, FullHeartStraight, HeartStraight, OpenInNew } from "@/src/assets/icons";

interface ShopCardProps {
  id: number;
  name: string;
  category: string;
  roadAddress: string;
  isLiked?: boolean;
  shopUrl?: string;
  disableClick?: boolean;
  styles?: string;
}

const ShopCard: React.FC<ShopCardProps> = ({
  id,
  name,
  category,
  roadAddress,
  isLiked,
  shopUrl,
  disableClick,
  styles,
}) => {
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
      className={`p-[8px] flex items-center justify-between rounded-[4px] ${styles}`}
      style={{ pointerEvents: disableClick ? "none" : "auto" }}
    >
      <Link href={`/main/restaurants/${id}`} className="flex items-center">
        <div className="relative w-[50px] h-[50px] rounded-[4px]">
          <Image width={50} height={50} src={getIcon(category)} alt="음식점 썸네일" />
        </div>
        <div className="flex flex-col gap-1 items-start ml-3">
          <div className="flex items-center">
            <span className="font-bold text-[18px]">{name}</span>
            {/* 카테고리 태그 컴포넌트 추가 예정 */}
          </div>
          <div className="flex items-center gap-1">
            <LocationOn />
            <span className="text-[14px] text-gray-4">{roadAddress}</span>
          </div>
        </div>
      </Link>
      {(isLiked !== undefined || shopUrl) && (
        <div className="flex items-center gap-1">
          {isLiked !== undefined && (
            <button className="text-[24px] mr-2" onClick={handleLikeToggle}>
              {like ? <FullHeartStraight /> : <HeartStraight />}
            </button>
          )}
          {shopUrl && (
            <a href={shopUrl} target="_blank" rel="noopener noreferrer">
              <OpenInNew />
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default ShopCard;
