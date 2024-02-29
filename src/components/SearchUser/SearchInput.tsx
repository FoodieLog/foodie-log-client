import { Close, SearchIcon } from "@assets/icons";

interface SearchInputProps {
  query: any;
  setQuery: any;
  onChangeInputHandler: any;
}

function SearchInput({ query, setQuery, onChangeInputHandler }: SearchInputProps) {
  const clearInput = () => {
    setQuery("");
  };

  return (
    <form className="w-full h-[42px] px-[12px] flex items-center justify-between border border-gray-2 rounded-[10px] focus-within:border-red">
      <input
        className="flex-grow"
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
        <SearchIcon />
      </div>
    </form>
  );
}

export default SearchInput;
