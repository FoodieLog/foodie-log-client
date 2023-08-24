import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { getIcon } from "../utils/iconUtils";
import { FiExternalLink } from "react-icons/fi";
import { useState } from 'react';

interface ShopCardProps {
  name: string;
  category: string;
  roadAddress: string;
  isLiked?: boolean;
  shopUrl?: string;
}

const ShopCard: React.FC<ShopCardProps>= ({name, category, roadAddress, isLiked, shopUrl}) => {
  const shopCategoryIcon = `/images/foodCategoryIcons/${getIcon(category)}`;
  const [like, setLike] = useState(isLiked)
  return (
    <div className='flex items-center'>
      <div className="flex items-center">
        <img src={shopCategoryIcon} alt="음식점 썸네일" className="w-12 h-12 border p-1 rounded-full cursor-pointer" />
        <div className="flex flex-col items-start p-1">
          <p className="font-bold text-base cursor-pointer">{name}</p>
          <p className="text-base cursor-pointer">{roadAddress}</p>
        </div>
      </div>
      <div className='flex flex-1'>
        {isLiked !== undefined && (
          <button className="text-[24px]" onClick={() => setLike(!like)}>
            {like ? <AiFillHeart /> : <AiOutlineHeart />}
          </button>
        )}
        {shopUrl && (
          <a href={shopUrl} target="_blank" rel="noopener noreferrer">
            <FiExternalLink className="text-[24px] cursor-pointer" />
          </a>
        )}
      </div>
    </div>
  );
};

export default ShopCard;
