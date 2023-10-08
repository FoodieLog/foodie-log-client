import React from "react";
import MyMap from "../../../components/Map/MyMap";

function Map() {
  return (
    <div className="w-full">
      <MyMap userId={0} header="나의 맛집 리스트" />
    </div>
  );
}

export default Map;
