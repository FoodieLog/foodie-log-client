import Link from "next/link";
import { ShopThumbData } from "../../types/apiTypes";
import { getIcon } from "../../utils/iconUtils";
import ShopCard from "./ShopCard";
import Image from "next/image";

type ExtendedShopThumbData = ShopThumbData & {
  restaurantId: number 
};

const ShopThumb: React.FC<ExtendedShopThumbData> = ({ restaurantId: id, name, category = "", roadAddress, feedList }) => {
  console.log(id, name, category, roadAddress, feedList);
  return (
    <div className="mt-2 w-full max-w-[640px] bg-gray-100 border rounded-sm px-1">
      <ShopCard id={id} name={name} category={category} roadAddress={roadAddress} />
      <div className="flex gap-1">
        {feedList.map((feed) => (
          <div className="w-1/3" key={feed.id} style={{ position: "relative" }}>
            <div style={{ paddingBottom: "100%" }}></div> {/* 1:1 비율을 위한 패딩 트릭 */}
            <Link href={`/main/restaurants/${id}`}>
              <Image
                src={feed.thumbnailUrl}
                alt="Feed thumbnail"
                sizes="100vw"
                fill
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover", // 이미지를 커버 모드로 설정
                }}
                onError={(e) => console.error(e.currentTarget.id)}
                onLoadingComplete={(img) => console.log(img.naturalWidth)}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopThumb;
