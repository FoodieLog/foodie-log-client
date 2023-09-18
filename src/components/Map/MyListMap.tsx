import React, { useState, useEffect } from "react";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
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
    <div className="w-full h-[360px] p-1 bg-slate-300">
      <Map center={{ lat: 36.2683, lng: 127.6358 }} style={{ width: "100%", height: "100%" }} level={15}>
        {/* <MarkerClusterer averageCenter={true} minLevel={10}> */}
          {mapData.map((data) => {
            const lat = parseFloat(data.restaurant.mapY);
            const lng = parseFloat(data.restaurant.mapX);
            return <MapMarker key={data.restaurant.id} position={{ lat, lng }} title={data.restaurant.name} />;
          })}
        {/* </MarkerClusterer> */}
      </Map>
    </div>
  );
}

export default MyListMap;
