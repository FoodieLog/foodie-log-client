"use client";
import { useRef, useEffect, useState, MutableRefObject } from "react";
import { useRouter } from "next/navigation";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { markerImageSrc, markerSize, onMarkerClick } from "@components/Map/common";

const KakaoMap = ({
  latitude,
  longitude,
  restaurantId,
}: {
  latitude: string;
  longitude: string;
  restaurantId: number;
}) => {
  //#region States
  const mapRef: MutableRefObject<undefined> = useRef();
  const [mapSize, setMapSize] = useState({
    width: "100%",
    height: "360px",
  });
  //#endregion

  //#region Variables
  const router: AppRouterInstance = useRouter();
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
  }, [mapSize]);
  //#endregion

  return (
    <div>
      <div className="p-1 bg-slate-300">
        <Map center={{ lat: parsedLat, lng: parsedLng }} style={mapSize} ref={mapRef} level={level}>
          <MapMarker
            position={{ lat: parsedLat, lng: parsedLng }}
            clickable={true}
            onClick={() => onMarkerClick(router, restaurantId)}
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
