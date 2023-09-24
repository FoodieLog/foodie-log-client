import Image from "next/image";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
interface MapProps {
  mapData: MapItem[];
}

interface MapItem {
  isLiked: {
    id: number;
    liked: boolean;
  };
  restaurant: {
    category: string;
    id: number;
    link: string;
    mapX: string;
    mapY: string;
    name: string;
    roadAddress: string;
  };
}

function MyListMap({ mapData }: MapProps) {
  const router = useRouter();

  const onMarkerClick = (restaurantId: number) => {
    router.push(`/main/restaurants/${restaurantId}`);
  };

  return (
    <div className="w-full h-[360px] p-1 bg-slate-300">
      <Map center={{ lat: 36.2683, lng: 127.6358 }} style={{ width: "100%", height: "100%" }} level={15}>
        {mapData.map((data) => {
          const lat = parseFloat(data.restaurant.mapY);
          const lng = parseFloat(data.restaurant.mapX);
          return (
            <Fragment key={data.restaurant.id}>
              <MapMarker // 마커를 생성합니다
                position={{ lat, lng }}
                title={data.restaurant.name}
                draggable={true}
                clickable={true}
                onClick={() => onMarkerClick(data.restaurant.id)}
                image={{
                  src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
                  size: {
                    width: 24,
                    height: 35,
                  }, // 마커이미지의 크기입니다
                }}
              />
              <CustomOverlayMap yAnchor={1} position={{ lat, lng }}>
                <div
                  onClick={() => onMarkerClick(data.restaurant.id)}
                  style={{
                    color: "191919",
                    backgroundColor: "#F6C443",
                    padding: "0 5px",
                    borderRadius: "4px",
                    marginBottom: "36px",
                    fontSize: "12px",
                  }}
                >
                  <span>{data.restaurant.name}</span>
                </div>
              </CustomOverlayMap>
            </Fragment>
          );
        })}
      </Map>
    </div>
  );
}

export default MyListMap;
