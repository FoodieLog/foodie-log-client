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

  const fillDefaultThumbnails = () => {
    const defaultImgCount = 3 - feedList.length;
    const defaultImgs = new Array(defaultImgCount).fill('/icon-256x256.png');
    return [...feedList, ...defaultImgs];
  };

  const thumbnailsToShow = fillDefaultThumbnails();

  return (
    <div className="mt-2 w-full max-w-[640px] border-b rounded-sm px-1 pb-1">
      <ShopCard id={id} name={name} category={category} roadAddress={roadAddress} />
      <div className="flex gap-1">
        {thumbnailsToShow.map((thumbnail, index) => (
          <div className="w-1/3 border" key={index} style={{ position: "relative" }}>
            <div style={{ paddingBottom: "100%" }}></div>
            <Link href={`/main/restaurants/${id}`}>
              {typeof thumbnail === 'string' ? (
                <Image
                  src={thumbnail}
                  alt="Default thumbnail"
                  sizes="100vw"
                  fill
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Image
                  src={thumbnail.thumbnailUrl}
                  alt="Feed thumbnail"
                  sizes="100vw"
                  fill
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  onError={(e) => console.error(e.currentTarget.id)}
                  onLoadingComplete={(img) => console.log(img.naturalWidth)}
                />
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopThumb;
