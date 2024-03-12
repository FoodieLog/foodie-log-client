"use client";
import { useState } from "react";
import useSignUpStore from "@store/useSignUpStore";
import PostImage from "@components/PostForm/PostImage";
import PostContent from "@components/PostForm/PostContent";
import Header from "@components/Common/Header";
import PostShopList from "@components/PostForm/PostShopList";
import SearchInput from "@components/Common/Input/SearchInput";
import useDebounce from "@hooks/useDebounce";

function PostSearch() {
  const [keyword, setKeyword] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const nextComponent = useSignUpStore((state) => state.nextComponent);
  const debouncedValue = useDebounce(keyword, 500);

  const inputKeywordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    setIsSubmit(false);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!keyword) return;
    setIsSubmit(true);
  };

  if (nextComponent === "PostImage") {
    return <PostImage />;
  } else if (nextComponent === "PostContent") {
    return <PostContent />;
  }

  return (
    <section className="w-full sm:max-w-[640px]  mx-auto">
      <Header title="맛집 검색" back="prePage" />
      <div className="mt-3 mx-3">
        <SearchInput
          query={keyword}
          setQuery={setKeyword}
          onChangeInputHandler={inputKeywordHandler}
          onSubmit={onSubmit}
        />
        <PostShopList isSubmit={isSubmit} keyword={debouncedValue} />
      </div>
    </section>
  );
}

export default PostSearch;
