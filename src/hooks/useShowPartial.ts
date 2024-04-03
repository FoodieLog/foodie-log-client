import { usePathname } from "next/navigation";
import { useUserStore } from "../store/useUserStore";
// import { showGNBRouteList } from "@constants";

function useShowPartial() {
  const { user } = useUserStore();

  const showGNBRouteList = ["/main/home", "/main/recommend", `/main/${user.id}`];

  const pathname = usePathname();
  const regex = /main\/\d/g;
  const isShow = showGNBRouteList.includes(pathname) || regex.test(pathname);
  return { pathname, isShow };
}

export default useShowPartial;
