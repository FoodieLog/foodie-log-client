import React from "react";
import MyMap from "@/src/components/Map/MyMap";

const Map = ({ params }: { params: { id: string } }) => {
  const userId = parseInt(params.id);

  return <MyMap userId={userId} />;
};

export default Map;
