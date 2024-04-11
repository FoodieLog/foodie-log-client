import { useEffect } from "react";
import { useRecommendStore } from "@store/useRecommendStore";
import { usePathname } from "next/navigation";

function useResetRecommend() {
  const pathname = usePathname();
  const { resetSelect } = useRecommendStore();

  useEffect(() => {
    if (!pathname.includes("recommend")) resetSelect();
  }, [pathname]);
}

export default useResetRecommend;
