"use client";
import { useRef, useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const KakaoMap = ({ latitude, longitude }) => {
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

  return (
    <div>
      <div className="p-2 bg-slate-300">
        <Map center={{ lat: parsedLat, lng: parsedLng }} style={mapSize} ref={mapRef} level={level}>
          <MapMarker position={{ lat: parsedLat, lng: parsedLng }}></MapMarker>
        </Map>
      </div>
    </div>
  );
};

export default KakaoMap;
