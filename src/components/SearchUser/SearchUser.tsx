"use client";
import Link from "next/link";
import { useState } from "react";
import { UserImage } from "@/public/images";
import { APIUserSearchResponse } from "@/src/services/apiFeed";
import UserThumbImg from "@components/Common/Profile/UserThumbImg";
import SearchInput from "@components/SearchUser/SearchInput";

const SearchUser: React.FC = () => {
  const [searchResults, setSearchResults] = useState<APIUserSearchResponse["response"]["content"] | []>([]);

  return (
    <div className="w-full flex flex-col items-center justify-between px-4 mt-3">
      <SearchInput setSearchResults={setSearchResults} />
      <div className="w-full px-5 mt-4 ">
        {searchResults.map((user) => (
          <div key={user.id} className="w-full flex items-center mt-2 hover:bg-slate-100">
            <Link href={`/main/${user.id}`} className="flex w-12 h-12 flex-shrink-0">
              {user.profileImageUrl ? (
                <UserThumbImg src={user.profileImageUrl} />
              ) : (
                <UserThumbImg src={UserImage} style="p-1" />
              )}
            </Link>

            <div className="relative flex flex-col pl-2 flex-grow">
              <Link href={`/main/${user.id}`}>
                <span className="font-bold overflow-ellipsis overflow-hidden">{user.nickName}</span>
              </Link>
              <Link href={`/main/${user.id}`}>
                <span className="text-sm overflow-ellipsis overflow-hidden">{user.aboutMe}</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchUser;
