"use client";
import { useRef, useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const KakaoMap = ({ latitude, longitude }) => {
  const mapRef = useRef();

  // 초기 크기 설정
  let initialWidth;
  if (typeof window !== "undefined") {
    initialWidth = window.innerWidth > 640 ? "640px" : `${window.innerWidth}px`;
    console.log("initialWidth:", initialWidth);
  }
  const [mapSize, setMapSize] = useState({
    width: "640px",
    height: "640px",
  });

  const parsedLat = parseFloat(latitude);
  const parsedLng = parseFloat(longitude);

  const handleResize = () => {
    const windowWidth = window.innerWidth;
    let newSize;
    if (windowWidth <= 640) {
      newSize = `${windowWidth}px`;
    } else {
      newSize = "640px";
    }

    setMapSize({
      width: newSize,
      height: newSize,
    });
  };

  useEffect(() => {
    const map = mapRef.current;
    if (map) map.relayout();
  }, [mapSize]);

  useEffect(() => {
    handleResize(); // 초기 로딩 시 사이즈 체크 및 적용
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div className="flex flex-col w-full items-center justify-center">
        <Map center={{ lat: parsedLat, lng: parsedLng }} style={mapSize} ref={mapRef}>
          <MapMarker position={{ lat: parsedLat, lng: parsedLng }}></MapMarker>
        </Map>
      </div>
    </div>
  );
};

export default KakaoMap;
