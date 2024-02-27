"use client";
import { useState } from "react";
import { searchUser } from "@services/apiFeed";
import { Close, SearchIcon } from "@assets/icons";
import { APIUserSearchResponse } from "@@types/apiTypes";

interface SearchInputProps {
  setSearchResults: React.Dispatch<React.SetStateAction<APIUserSearchResponse["response"]["content"] | []>>;
}

function SearchInput({ setSearchResults }: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  let timeoutId: NodeJS.Timeout;

  const handleClearInput = () => {
    setSearchTerm("");
    setSearchResults([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    if (timeoutId) clearTimeout(timeoutId); // 기존의 debounce 타이머를 삭제

    timeoutId = setTimeout(() => {
      if (e.target.value) {
        searchUser(e.target.value).then((response) => {
          setSearchResults(response.response.content);
        });
      } else {
        setSearchResults([]); // 검색어가 비었을 때는 결과를 비웁니다.
      }
    }, 300);
  };

  return (
    <div className="w-full h-[42px] px-[12px] flex items-center justify-between border border-gray-2 rounded-[10px] focus-within:border-red">
      <input
        className="flex-grow"
        type="text"
        placeholder="유저 검색..."
        onChange={handleInputChange}
        value={searchTerm}
      />
      <div className="flex gap-[6px] items-center">
        {searchTerm && (
          <button type="button" onClick={handleClearInput}>
            <Close />
          </button>
        )}
        <SearchIcon />
      </div>
    </div>
  );
}

export default SearchInput;
