"use client";
import { useState, useEffect } from "react";
import { getSearchShop } from "@services/post";
import { AiOutlineSearch } from "react-icons/ai";
import useSignUpStore from "@store/useSignUpStore";
import PostImage from "@components/PostForm/PostImage";
import PostContent from "@components/PostForm/PostContent";
import Header from "@components/Common/Header";
import { ShopItem } from "@@types/post";
import PostShopList from "@components/PostForm/PostShopList";
import SearchInput from "@components/SearchUser/SearchInput";
import useDebounce from "@/src/hooks/useDebounce";

function PostSearch() {
  const [query, setQuery] = useState("");
  const [shopList, setShopList] = useState<ShopItem[]>([]);
  const nextComponent = useSignUpStore((state) => state.nextComponent);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery === "") {
      setShopList([]);
    } else {
      getSearches();
    }
  }, [debouncedQuery]);

  const getSearches = async () => {
    try {
      const { data } = await getSearchShop(debouncedQuery);
      setShopList(data.response.documents);
    } catch (error) {
      // Todo: 에러 핸들링 추가
    }
  };

  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
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
        <SearchInput query={query} setQuery={setQuery} onChangeInputHandler={onChangeInputHandler} />
        <PostShopList shopList={shopList} />
      </div>
    </section>
  );
}

export default PostSearch;
