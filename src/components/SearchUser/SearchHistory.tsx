import useSearchStore from "@store/useSearchStore";
import { searchUser } from "@services/feed";
import { CloseSmall } from "@assets/icons";
import { Dispatch, SetStateAction } from "react";
import { APIUserSearchResponse } from "@/src/types/apiTypes";

interface SearchHistoryProps {
  searchBox: {
    id: number;
    keyword: string;
  };
  setSearchResults: Dispatch<SetStateAction<APIUserSearchResponse["response"]["content"] | []>>;
}

function SearchHistory({ searchBox, setSearchResults }: SearchHistoryProps) {
  const { deleteSearchHistory } = useSearchStore();

  const getSearchesHandler = async () => {
    try {
      const { response } = await searchUser(searchBox.keyword);
      setSearchResults(response.content);
    } catch (error) {
      //Todo: 에러 핸들링 추가
    }
  };

  const onClickDeleteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!searchBox.id) return;
    deleteSearchHistory(searchBox.id);
  };

  return (
    <li className="h-[40px] flex justify-between items-center">
      <button type="button" onClick={getSearchesHandler} className="font-[14px] text-gray-10">
        {searchBox.keyword}
      </button>
      <button
        type="button"
        onClick={onClickDeleteHandler}
        className="w-[24px] h-[24px] flex justify-center items-center"
      >
        <CloseSmall />
      </button>
    </li>
  );
}

export default SearchHistory;
