import React, { useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useQuery } from "@tanstack/react-query";
import { getMyMap } from "../../services/mypage";

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
  return (
    <div className="w-[600px] h-[600px]">
      <Map center={{ lat: 36.2683, lng: 127.6358 }} style={{ width: "100%", height: "100%" }} level={15}>
        {mapData.map((data) => {
          const lat = parseFloat(data.restaurant.mapY);
          const lng = parseFloat(data.restaurant.mapX);
          return <MapMarker key={data.restaurant.id} position={{ lat, lng }} title={data.restaurant.name} />;
        })}
      </Map>
    </div>
  );
}

export default MyListMap;
