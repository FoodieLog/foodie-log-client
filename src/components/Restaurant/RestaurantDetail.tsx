"use client";
import Header from "@components/Common/Header";
import KakaoMap from "@components/Map/KakaoMap";
import ShopCard from "@components/Common/Card/ShopCard";
import useRestaurantDetailQuery from "@hooks/queries/useRestaurantDetailQuery";
import Drawer from "@components/Common/Drawer/Drawer";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Content } from "@@types/apiTypes";
import Link from "next/link";
import Skeleton from "@components/Common/Skeleton";
import { NoImage } from "@assets/images";

interface RestaurantDetailProps {
  restaurantId: string;
}

const RestaurantDetail = ({ restaurantId }: RestaurantDetailProps) => {
  const parsedId = parseInt(restaurantId, 10);
  const { data, isLoading } = useRestaurantDetailQuery(parsedId);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const uniqueImages = new Set<string>();

    data?.feedList.forEach((feedData: Content) => {
      feedData.feed.feedImages.forEach((imageURLObject: { imageUrl: string }) => {
        if (uniqueImages.size < 3) {
          uniqueImages.add(imageURLObject.imageUrl);
        }
      });
    });

    setImages(Array.from(uniqueImages));
  }, [data?.feedList]);

  // TODO: 로딩 ui 추가하기!
  if (isLoading) return <Skeleton />;

  return (
    <div className="w-full flex flex-col justify-center max-w-screen-sm mx-auto relative">
      <Header title={data?.detail.restaurant.name ?? ""} back="prePage" />
      <KakaoMap
        size={{ width: "100%", height: "calc(100vh - 60px - 56px)" }}
        latitude={data?.detail.restaurant.mapY ?? ""}
        longitude={data?.detail.restaurant.mapX ?? ""}
        restaurantId={parsedId}
        isLiked={data?.detail.isLiked.liked ?? false}
      />

      <Drawer openedHeight={351} closedHeight={70 + 68} scroller>
        <div className="flex flex-col gap-3">
          <ShopCard
            id={parsedId}
            name={data?.detail.restaurant.name ?? ""}
            category={data?.detail.restaurant.category ?? ""}
            roadAddress={data?.detail.restaurant.roadAddress ?? ""}
            isLiked={data?.detail.isLiked.liked}
            shopUrl={data?.detail.restaurant.link}
          />
          <hr />
          <div className="flex justify-between p-2 font-[600]">
            <p>
              <span className="text-red">&quot;{data?.detail.restaurant.name}&quot; </span>
              {data?.feedList.length}개의 결과
            </p>
            {data?.feedList.length && (
              <Link href={`/main/restaurants/${parsedId}/feed`} className="text-red">
                피드 더보기
              </Link>
            )}
          </div>
          <div className="flex justify-between space-x-4 pr-2 pl-2">
            {images.map((imageUrl) => (
              <div key={imageUrl} className="relative w-[120px] h-[120px]">
                <Image
                  className="rounded-[10px]"
                  src={imageUrl}
                  alt="피드 이미지"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
            {Array.from({ length: 3 - images.length }).map((_, index) => (
              <div key={index} className="relative w-[120px] h-[120px]">
                <Image className="rounded-[10px]" src={NoImage} fill alt="피드 이미지" style={{ objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default RestaurantDetail;
