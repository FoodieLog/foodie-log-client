import { useUserStore } from "@store/useUserStore";
import { postLogout, postDeleteToken } from "@services/settings";
import { useRouter } from "next/navigation";

const useLogout = () => {
  const router = useRouter();
  const { clearUser } = useUserStore();

  const logout = async () => {
    try {
      await postLogout();
    } catch (error) {
      console.error("로그아웃 요청 실패");
    }

    try {
      await postDeleteToken();
    } catch (error) {
      console.error("로그아웃 토큰 삭제 실패");
    }
    clearUser();
    router.replace("/accounts/login");
  };

  return { logout };
};

export default useLogout;
