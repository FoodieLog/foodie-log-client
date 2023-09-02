import Link from "next/link";
import { ShopThumbData } from "../../types/apiTypes";
import { getIcon } from "../../utils/iconUtils";
import ShopCard from "./ShopCard";
import Image from "next/image";

const ShopThumb: React.FC<ShopThumbData> = ({ id, name, category, roadAddress, feedList }) => {
  const shopCategoryIcon = `/images/foodCategoryIcons/${getIcon(category)}`;

  return (
    <div className="mt-2 w-full max-w-[640px] bg-gray-100 border rounded-sm px-1">
      <ShopCard id={id} name={name} category={category} roadAddress={roadAddress} />

      <div className="flex gap-1">
        {feedList.map((feed) => (
          <div className="flex w-1/3" key={feed.id}>
            <Link href={`/main/restaurants/${id}`}>
              {/* {console.log(feed.thumbnailUrl)} */}
              {/* FIXME : img 를 Image 컴포넌트로 바꾸기 */}
              <img
                src={feed.thumbnailUrl}
                alt="Feed thumbnail"
                className="w-full h-full object-cover border rounded cursor-pointer"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopThumb;
