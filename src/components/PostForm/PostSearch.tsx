"use client";
import { useState } from "react";
import { searchShop } from "@/src/services/post";
import { AiOutlineSearch } from "react-icons/ai";
import PostShopItem from "@/src/components/PostForm/PostShopItem";
import useSignUpStore from "@/src/store/useSignUpStore";
import PostImage from "@/src/components/PostForm/PostImage";
import PostContent from "@/src/components/PostForm/PostContent";
import Header from "@/src/components/Common/Header";
import { ShopItemPlus } from "@/src/types/post";

function PostSearch() {
  const [keyWord, setKeyword] = useState("");
  const [ShopList, setShopList] = useState<ShopItemPlus[]>([]);
  const nextComponent = useSignUpStore((state) => state.nextComponent);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await searchShop(keyWord);
      setShopList(res.response.documents);
    } catch (err) {
      console.log("shop search error", err);
    }
  };

  const searchChangehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  if (nextComponent === "PostImage") {
    return <PostImage />;
  } else if (nextComponent === "PostContent") {
    return <PostContent />;
  }
  return (
    <section className="w-full sm:max-w-[640px]  mx-auto">
      <Header title="식당 검색" type="arrow" back="prePage" />
      <div className="mt-3  mx-3">
        <form onSubmit={onSubmit} className="relative px-3">
          <input
            type="text"
            name="search"
            value={keyWord}
            onChange={searchChangehandler}
            className="inputStyles"
            placeholder="주소 또는 식당명을 검색"
          />
          <button type="submit" className="absolute top-0 bottom-0 right-8 my-auto">
            <AiOutlineSearch size="1.5rem" />
          </button>
        </form>
        <ul>
          {ShopList.map((item) => (
            <li key={item.id}>
              <PostShopItem type="search" item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default PostSearch;
