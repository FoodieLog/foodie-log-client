"use client";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const KakaoMap: React.FC<{ latitude: string; longitude: string; restaurantId: number }> = ({
  latitude,
  longitude,
  restaurantId,
}) => {
  const router = useRouter();
  const mapRef = useRef();
  const level = 3;
  const [mapSize, setMapSize] = useState({
    width: "100%",
    height: "360px",
  });

  const parsedLat = parseFloat(latitude);
  const parsedLng = parseFloat(longitude);

  useEffect(() => {
    const map = mapRef.current;
    if (map) {
      // map.disableHD();
      // map.relayout();
    }
  }, [mapSize]);

  const onMarkerClick = (restaurantId: number) => {
    router.push(`/main/restaurants/${restaurantId}`);
  };

  return (
    <div>
      <div className="p-1 bg-slate-300">
        <Map center={{ lat: parsedLat, lng: parsedLng }} style={mapSize} ref={mapRef} level={level}>
          <MapMarker
            position={{ lat: parsedLat, lng: parsedLng }}
            clickable={true}
            onClick={() => onMarkerClick(restaurantId)}
            image={{
              src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
              size: {
                width: 24,
                height: 35,
              }, // 마커이미지의 크기입니다
            }}
          ></MapMarker>
        </Map>
      </div>
    </div>
  );
};

export default KakaoMap;
