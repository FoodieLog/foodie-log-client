"use client";
import { useRef, useEffect, MutableRefObject } from "react";
import { useRouter } from "next/navigation";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { markerImageSrc, markerSize } from "@components/Map/common";

interface KakaoMapProps {
  size?: { width: string; height: string };
  latitude: string;
  longitude: string;
  restaurantId: number;
}

const KakaoMap = ({ size = { width: "100%", height: "360px" }, latitude, longitude, restaurantId }: KakaoMapProps) => {
  //#region States
  const mapRef: MutableRefObject<undefined> = useRef();
  //#endregion

  //#region Variables
  const router = useRouter();
  const parsedLat: number = parseFloat(latitude);
  const parsedLng: number = parseFloat(longitude);
  const level: number = 3;
  //#endregion

  //#region useEffect
  useEffect(() => {
    const map = mapRef.current;
    if (map) {
      // map.disableHD();
      // map.relayout();
    }
  }, [size]);
  //#endregion

  return (
    <div>
      <div className="p-1 bg-slate-300">
        <Map center={{ lat: parsedLat, lng: parsedLng }} style={size} ref={mapRef} level={level}>
          <MapMarker
            position={{ lat: parsedLat, lng: parsedLng }}
            clickable={true}
            onClick={() => {
              router.push(`/main/restaurants/${restaurantId}`);
            }}
            image={{
              src: markerImageSrc, // 마커이미지의 주소입니다
              size: markerSize, // 마커이미지의 크기입니다
            }}
          ></MapMarker>
        </Map>
      </div>
    </div>
  );
};

export default KakaoMap;
