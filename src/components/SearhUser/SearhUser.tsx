"use client";
import { useState } from "react";
import { SlClose } from "react-icons/sl";
import { UserImage } from "@/public/images";
import { searchUser, APIUserSearchResponse } from "@/src/services/apiFeed";
import UserThumbImg from "@components/Common/Profile/UserThumbImg";
import Link from "next/link";

const SearchUser: React.FC = () => {
  //#region useState
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<APIUserSearchResponse["response"]["content"] | []>([]);
  //#endregion

  let timeoutId: NodeJS.Timeout;

  //#region functions
  const handleClearInput = () => {
    setSearchTerm("");
    setSearchResults([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (timeoutId) clearTimeout(timeoutId); // 기존의 debounce 타이머를 삭제

    timeoutId = setTimeout(() => {
      if (value) {
        searchUser(value).then((response) => {
          setSearchResults(response.response.content);
        });
      } else {
        setSearchResults([]); // 검색어가 비었을 때는 결과를 비웁니다.
      }
    }, 300);
  };
  //#endregion

  return (
    <div className="w-full flex flex-col items-center justify-between px-4 mt-3">
      <div className="w-full flex items-center justify-between border rounded-2xl py-2 px-1 focus-within:border-gray-400">
        <input
          className="flex-grow px-4 outline-none"
          type="text"
          placeholder="유저 검색..."
          onChange={handleInputChange}
          value={searchTerm}
        />
        {searchTerm && <SlClose className="mr-4 cursor-pointer text-2xl text-slate-400" onClick={handleClearInput} />}
      </div>
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
