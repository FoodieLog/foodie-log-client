import { usePathname } from "next/navigation";
import { showGNBRouteList } from "@constants";

function useShowPartial() {
  const pathname = usePathname();
  const isShow = showGNBRouteList.includes(pathname);
  return { pathname, isShow };
}

export default useShowPartial;
