import { usePathname } from "next/navigation";
import { showGNBRouteList } from "@constants";

function useShowPartial() {
  const pathname = usePathname();
  const regex = /main\/\d/g;
  const isShow = showGNBRouteList.includes(pathname) || regex.test(pathname);
  return { pathname, isShow };
}

export default useShowPartial;
