import { useQuery } from "@tanstack/react-query";
import { searchUser } from "@services/feed";

const useSearchUser = (userName?: string) => {
  return useQuery({
    queryKey: ["userList"],
    queryFn: async () => {
      const { response } = await searchUser(userName || "");
      const userList = response.content;
      return userList;
    },
    staleTime: 1000 * 60 * 10,
  });
};

export default useSearchUser;
