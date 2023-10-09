"use client";
import React from "react";
import MyMap from "../../../../components/Map/MyMap";
import { useUserStore } from "@/src/store/useUserStore";

function Map() {
  const userId = useUserStore((state) => state.user.id);
  if (!userId) return;
  return (
    <>
      <MyMap userId={userId} header="내가 리뷰한 맛집" />
    </>
  );
}

export default Map;
