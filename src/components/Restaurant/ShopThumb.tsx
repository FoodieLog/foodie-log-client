import Link from "next/link";
import ShopCard from "@/src/components/Restaurant/ShopCard";
import Image from "next/image";
import { RecommendedRestaurant } from "@/src/types/recommend";

const ShopThumb: React.FC<RecommendedRestaurant> = ({
  restaurantId: id,
  name,
  category = "",
  roadAddress,
  feedList,
}) => {
  const fillDefaultThumbnails = () => {
    const defaultImgCount = 3 - feedList.length;
    const defaultImgs = new Array(defaultImgCount).fill("/icon-256x256.png");
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
              {typeof thumbnail === "string" ? (
                <Image
                  src={thumbnail}
                  alt="Default thumbnail"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
