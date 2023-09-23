"use client";
import { useEffect, useState } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
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
  const [hydration, setHydration] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setHydration(true);
  }, []);

  const onMarkerClick = (restaurantId: number) => {
    router.push(`/main/restaurants/${restaurantId}`);
  };

  return (
    <div className="w-full h-[360px] p-1 bg-slate-300">
      {hydration && (
        <Map center={{ lat: 36.2683, lng: 127.6358 }} style={{ width: "100%", height: "100%" }} level={15}>
          {mapData.map((data) => {
            const lat = parseFloat(data.restaurant.mapY);
            const lng = parseFloat(data.restaurant.mapX);
            return (
              <MapMarker
                key={data.restaurant.id}
                position={{ lat, lng }}
                title={data.restaurant.name}
                clickable={true}
                onClick={() => onMarkerClick(data.restaurant.id)}
              >
                <span className="center">{data.restaurant.name}</span>
              </MapMarker>
            );
          })}
        </Map>
      )}
    </div>
  );
}

export default MyListMap;
