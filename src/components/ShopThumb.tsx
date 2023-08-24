import { ShopThumbData } from "../types/apiTypes";
import { getIcon } from "../utils/iconUtils";

const ShopThumb: React.FC<ShopThumbData> = ({ id, name, category, roadAddress, feedList }) => {
  const shopCategoryIcon = `/images/foodCategoryIcons/${getIcon(category)}`;

  return (
    <div className="mt-2 w-full max-w-[640px] bg-gray-100 border rounded-sm px-1">
      <div className="flex items-center">
        <img src={shopCategoryIcon} alt="음식점 썸네일" className="w-12 h-12 border p-1 rounded-full cursor-pointer" />
        <div className="flex flex-col items-start p-1">
          <p className="font-bold text-base cursor-pointer">{name}</p>
          <p className="text-base cursor-pointer">{roadAddress}</p>
        </div>
      </div>
      {/* <p className="text-sm p-1">{category}</p> */}

      <div className="flex gap-1">
        {feedList.map((feed) => (
          <div className="flex w-1/3" key={feed.id}>
            <img
              src={feed.thumbnailUrl}
              alt="Feed thumbnail"
              className="w-full h-full object-cover border rounded cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopThumb;
