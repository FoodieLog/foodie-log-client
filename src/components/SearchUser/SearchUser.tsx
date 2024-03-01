"use client";
import SearchInput from "@components/SearchUser/SearchInput";
import SearchUserList from "@components/SearchUser/SearchUserList";
import SearchHistory from "@components/SearchUser/SearchHistory";
import useDebounce from "@/src/hooks/useDebounce";
import useSearchStore from "@store/useSearchStore";
import getKey from "@utils/getKey";
import { useState, useEffect } from "react";
import { searchUser } from "@services/apiFeed";
import { APIUserSearchResponse } from "@/src/services/apiFeed";

const SearchUser: React.FC = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<APIUserSearchResponse["response"]["content"] | []>([]);
  const { searchHistory, setSearchHistory, deleteSearchHistory } = useSearchStore();

  const debouncedQuery = useDebounce(query, 500);
  const key = getKey();

  useEffect(() => {
    if (debouncedQuery === "") {
      setSearchResults([]);
    } else {
      getSearches();
    }
  }, [debouncedQuery]);

  const getSearches = async () => {
    try {
      const { response } = await searchUser(debouncedQuery);
      setSearchResults(response.content);
      setSearchHistory({ id: key, keyword: debouncedQuery });
    } catch (error) {
      //Todo: 에러 핸들링 추가
    }
  };

  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="w-full flex flex-col items-center justify-between px-4 mt-3">
      <SearchInput query={query} setQuery={setQuery} onChangeInputHandler={onChangeInputHandler} />
      {searchResults.length ? (
        <ul className="w-full mt-[16px]">
          {searchResults.map((user) => (
            <SearchUserList key={user.id} user={user} />
          ))}
        </ul>
      ) : (
        <ul className="w-full mt-[16px]">
          {searchHistory.map((searchBox) => (
            <SearchHistory key={searchBox.id} searchBox={searchBox} setSearchResults={setSearchResults} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchUser;
