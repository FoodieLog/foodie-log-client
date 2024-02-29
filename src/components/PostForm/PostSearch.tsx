"use client";
import { useState } from "react";
import { getSearchShop } from "@services/post";
import useSignUpStore from "@store/useSignUpStore";
import PostImage from "@components/PostForm/PostImage";
import PostContent from "@components/PostForm/PostContent";
import Header from "@components/Common/Header";
import { ShopItem } from "@@types/post";
import PostShopList from "@components/PostForm/PostShopList";
import SearchInput from "@components/SearchUser/SearchInput";
import EmptyList from "@components/PostForm/EmptyList";

function PostSearch() {
  const [keyword, setKeyword] = useState("");
  const [shopList, setShopList] = useState<ShopItem[]>([]);
  const [isShowEmpty, setIsShowEmpty] = useState(false);
  const nextComponent = useSignUpStore((state) => state.nextComponent);

  const inputKeywordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    if (!e.target.value) setShopList([]);
    setIsShowEmpty(false);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await getSearchShop(keyword);
      if (res.data.response.documents.length === 0) {
        setIsShowEmpty(true);
        setShopList([]);
      } else setShopList(res.data.response.documents);
    } catch (err) {
      // todo: 사용자 에러 표시
      console.log("shop search error", err);
    }
  };

  if (nextComponent === "PostImage") {
    return <PostImage />;
  } else if (nextComponent === "PostContent") {
    return <PostContent />;
  }

  return (
    <section className="w-full sm:max-w-[640px]  mx-auto">
      <Header title="식당 검색" back="prePage" />
      <div className="mt-3 mx-3">
        <SearchInput
          query={keyword}
          setQuery={setKeyword}
          onChangeInputHandler={inputKeywordHandler}
          onSubmit={onSubmit}
        />
        {isShowEmpty ? <EmptyList keyword={keyword} /> : <PostShopList shopList={shopList} keyword={keyword} />}
      </div>
    </section>
  );
}

export default PostSearch;
