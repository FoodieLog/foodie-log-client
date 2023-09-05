"use client";
import React from "react";
import MyMap from "../../../../components/Mypage/MyMap";
import { useUserStore } from "@/src/store/useUserStore";

function Map() {
  const userId = useUserStore((state) => state.user.id);
  if (!userId) return;
  return (
    <>
      <MyMap userId={userId} />
    </>
  );
}

export default Map;
