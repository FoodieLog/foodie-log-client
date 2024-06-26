import Link from "next/link";
import Image from "next/image";
import { getIcon } from "@utils/iconUtils";
import LocationOn from "@assets/icons/common/location_on.svg";
import FullHeartStraight from "@assets/icons/common/FullHeartStraight.svg";
import HeartStraight from "@assets/icons/common/HeartStraight.svg";
import OpenInNew from "@assets/icons/common/open_in_new.svg";
import useLikeShopMutations from "@hooks/mutations/useLikeShopMutations";

interface ShopCardProps {
  id: number;
  name: string;
  category: string;
  roadAddress: string;
  href?: string;
  isLiked?: boolean;
  shopUrl?: string;
  disableClick?: boolean;
  styles?: string;
  userId?: number;
}

const ShopCard: React.FC<ShopCardProps> = ({
  id,
  name,
  category,
  roadAddress,
  href,
  isLiked,
  shopUrl,
  disableClick,
  styles,
  userId,
}) => {
  const { likeMutation, unlikeMutation } = useLikeShopMutations(id, userId);
  const handleLikeToggle = async () => {
    try {
      if (isLiked) {
        unlikeMutation.mutate();
      } else {
        likeMutation.mutate();
      }
    } catch (error) {
      console.error("식당 좋아요/좋아요 취소 동작 중 오류가 발생했습니다.", error);
    }
  };

  return (
    <div
      className={`p-[8px] flex items-center justify-between rounded-[4px] ${styles}`}
      style={{ pointerEvents: disableClick ? "none" : "auto" }}
    >
      <Link href={href || ""} className="flex items-center">
        <div className="relative w-[50px] h-[50px] rounded-[4px]">
          <Image width={50} height={50} src={getIcon(category)} alt="음식점 썸네일" />
        </div>
        <div className="flex flex-col gap-1 items-start ml-3">
          <div className="flex items-center gap-x-2.5">
            <span className="font-bold text-[18px]">{name}</span>
            <span className="block px-1 py-0.5 rounded-[4px] text-sm bg-gray-1">{category}</span>
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
              {isLiked ? <FullHeartStraight /> : <HeartStraight />}
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
