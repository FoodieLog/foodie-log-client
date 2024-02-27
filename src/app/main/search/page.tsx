import Header from "@components/Common/Header";
import SearchUser from "@components/SearchUser/SearchUser";
import React from "react";
const Search = () => {
  return (
    <div className="w-full flex flex-col justify-center max-w-screen-sm mx-auto">
      <div className="flex flex-col items-start justify-center">
        <Header title="유저 검색" back="prePage" />
        <SearchUser />
      </div>
    </div>
  );
};
export default Search;
