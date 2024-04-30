import Link from "next/link";
import UserThumbImg from "@components/Common/Profile/UserThumbImg";
import Badge from "@assets/icons/common/Badge.svg";

interface SearchUserListProps {
  user: {
    id: number;
    nickName: string;
    profileImageUrl: string | null;
    aboutMe: string | null;
    badgeFlag: "Y" | "N" | undefined;
  };
}

function SearchUserList({ user }: SearchUserListProps) {
  return (
    <li key={user.id} className="w-full flex items-center mt-2 hover:bg-slate-100">
      <Link href={`/main/${user.id}`} className="flex w-12 h-12 flex-shrink-0">
        <UserThumbImg src={user.profileImageUrl} />
      </Link>
      <Link href={`/main/${user.id}`} className="relative flex flex-col pl-2 flex-grow">
        <div className="flex items-center gap-1">
          {user.badgeFlag === "Y" && <Badge />}
          <span className="font-bold overflow-ellipsis overflow-hidden">{user.nickName}</span>
        </div>
        <span className="text-sm overflow-ellipsis overflow-hidden">{user.aboutMe}</span>
      </Link>
    </li>
  );
}

export default SearchUserList;
