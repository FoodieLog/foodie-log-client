import { Close, SearchIcon } from "@assets/icons";
import { Dispatch, SetStateAction } from "react";

interface SearchInputProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  onChangeInputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

function SearchInput({ query, setQuery, onChangeInputHandler, onSubmit }: SearchInputProps) {
  const clearInput = () => {
    setQuery("");
  };

  const defaultSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={onSubmit || defaultSubmit}
      className="w-full h-[42px] px-[12px] flex items-center justify-between border border-gray-2 rounded-[10px] focus-within:border-red"
    >
      <input
        className="group flex-grow"
        type="text"
        placeholder="검색 내용을 입력하세요!"
        onChange={onChangeInputHandler}
        value={query}
      />
      <div className="flex gap-[6px] items-center">
        {query && (
          <button type="button" onClick={clearInput}>
            <Close />
          </button>
        )}
        <SearchIcon onClick={onSubmit} className={`${onSubmit && "cursor-pointer"}`} />
      </div>
    </form>
  );
}

export default SearchInput;
