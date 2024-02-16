import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

// Marker Click Event
export const onMarkerClick = (router: AppRouterInstance, restaurantId: number) => {
  router.push(`/main/restaurants/${restaurantId}`);
};

// Marker Size
export const markerSize: { width: number; height: number } = {
  width: 24,
  height: 35,
};

// Marker Image Source
export const markerImageSrc: string = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
