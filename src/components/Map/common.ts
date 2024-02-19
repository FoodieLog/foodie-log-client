import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export const onMarkerClick = (router: AppRouterInstance, restaurantId: number) => {
  router.push(`/main/restaurants/${restaurantId}`);
};

export const markerSize: { width: number; height: number } = {
  width: 24,
  height: 35,
};

export const markerImageSrc: string = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
