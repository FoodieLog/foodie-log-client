"use client";
import { useState } from "react";
import { searchShop } from "@/src/services/post";
import { AiOutlineSearch } from "react-icons/ai";

function PostForm() {
  const [keyWord, setKeyword] = useState("");

  const onSubmit = async () => {
    try {
      const res = await searchShop(keyWord);
      console.log("shop search success", res);
    } catch (err) {
      console.log("shop search error", err);
    }
  };

  const searchChangehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <>
      <form onSubmit={onSubmit} className="relative w-9/12 max-sm:w-full">
        <input
          type="text"
          name="search"
          onChange={searchChangehandler}
          className="input"
          placeholder="식당을 검색해 주세요!"
        />
        <button type="button" className="absolute top-0 bottom-0 right-3 my-auto">
          <AiOutlineSearch size="1.5rem" />
        </button>
      </form>
    </>
  );
}

export default PostForm;
