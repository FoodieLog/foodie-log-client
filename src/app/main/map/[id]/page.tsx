import React from "react";
import MyMap from "@components/Map/MyMap";

const Map = ({ params }: { params: { id: string } }) => {
  const userId = parseInt(params.id);

  return <MyMap userId={userId} header="님의 맛집 지도" />;
};

export default Map;
