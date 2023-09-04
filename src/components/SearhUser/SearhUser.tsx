"use client";
import { useState, useEffect } from "react";
import { searchUser, APIUserSearchResponse } from "@/src/services/apiFeed";
import Image from "next/image";
import { PiUserCircleBold } from "react-icons/pi";
import { SlClose } from "react-icons/sl";

const SearchUser: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<APIUserSearchResponse["response"]["content"] | []>([]);
  let timeoutId: NodeJS.Timeout;

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
          console.log("[serchResult resopnse] : ", response.response.content);
        });
      } else {
        setSearchResults([]); // 검색어가 비었을 때는 결과를 비웁니다.
      }
    }, 300);
  };

  return (
    <div className="w-full flex flex-col items-center justify-between px-4 mt-6">
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
      <div className="w-full px-5 mt-4">
        {searchResults.map((user) => (
          <div key={user.id} className="w-full flex items-center mt-2">
            <div className="flex w-12 h-12 flex-shrink-0">
              {user.profileImageUrl ? (
                <Image
                  src={user.profileImageUrl}
                  alt="사용자 썸네일"
                  width={48}
                  height={48}
                  className="border rounded-full cursor-pointer"
                />
              ) : (
                <PiUserCircleBold className="w-12 h-12 text-zinc-500" />
              )}
            </div>
            <div className="relative flex flex-col pl-2 flex-grow">
              <span className="font-bold overflow-ellipsis overflow-hidden">{user.nickName}</span>
              <span className="text-sm overflow-ellipsis overflow-hidden">{user.aboutMe}</span> {/* w-[500px] 제거 */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchUser;
