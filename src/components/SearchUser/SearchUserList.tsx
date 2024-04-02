import Link from "next/link";
import UserThumbImg from "@components/Common/Profile/UserThumbImg";

interface SearchUserListProps {
  user: {
    id: number;
    nickName: string;
    profileImageUrl: string | null;
    aboutMe: string | null;
  };
}

function SearchUserList({ user }: SearchUserListProps) {
  return (
    <li key={user.id} className="w-full flex items-center mt-2 hover:bg-slate-100">
      <Link href={`/main/${user.id}`} className="flex w-12 h-12 flex-shrink-0">
        <UserThumbImg src={user.profileImageUrl} />
      </Link>
      <Link href={`/main/${user.id}`} className="relative flex flex-col pl-2 flex-grow">
        <span className="font-bold overflow-ellipsis overflow-hidden">{user.nickName}</span>
        <span className="text-sm overflow-ellipsis overflow-hidden">{user.aboutMe}</span>
      </Link>
    </li>
  );
}

export default SearchUserList;
