"use client";
import { useState } from "react";
import { getSearchShop } from "@services/post";
import { AiOutlineSearch } from "react-icons/ai";
import useSignUpStore from "@store/useSignUpStore";
import PostImage from "@components/PostForm/PostImage";
import PostContent from "@components/PostForm/PostContent";
import Header from "@components/Common/Header";
import { ShopItem } from "@@types/post";
import PostShopList from "@components/PostForm/PostShopList";

function PostSearch() {
  const [keyword, setKeyword] = useState("");
  // ?: 기존 ShopItemPlus 타입으로 사용한 이유는?
  const [shopList, setShopList] = useState<ShopItem[]>([]);
  const nextComponent = useSignUpStore((state) => state.nextComponent);

  const inputKeywordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await getSearchShop(keyword);
      setShopList(res.data.response.documents);
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
      <div className="mt-3  mx-3">
        <form onSubmit={onSubmit} className="relative px-3">
          {/* todo: Input 컴포넌트 재사용 가능하면 수정 */}
          <input
            type="text"
            name="search"
            value={keyword}
            onChange={inputKeywordHandler}
            className="inputStyles"
            placeholder="주소 또는 식당명을 검색"
          />
          <button type="submit" className="absolute top-0 bottom-0 right-8 my-auto">
            <AiOutlineSearch size="1.5rem" />
          </button>
        </form>
        <PostShopList shopList={shopList} />
      </div>
    </section>
  );
}

export default PostSearch;
