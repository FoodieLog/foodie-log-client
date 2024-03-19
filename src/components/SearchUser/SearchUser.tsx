"use client";
import { useState, useEffect } from "react";
import { searchUser } from "@services/feed";
import { APIUserSearchResponse } from "@@types/apiTypes";
import { useToast } from "@/components/ui/use-toast";
import { TOAST_MESSAGES } from "@constants/toast";
import SearchInput from "@components/Common/Input/SearchInput";
import SearchUserList from "@components/SearchUser/SearchUserList";
import SearchHistory from "@components/SearchUser/SearchHistory";
import useDebounce from "@hooks/useDebounce";
import useSearchStore from "@store/useSearchStore";
import getKey from "@utils/getKey";

const SearchUser: React.FC = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<APIUserSearchResponse["response"]["content"] | []>([]);
  const { searchHistory, setSearchHistory } = useSearchStore();

  const { toast } = useToast();

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
      toast(TOAST_MESSAGES.ERROR_PLEASE_RETRY);
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
