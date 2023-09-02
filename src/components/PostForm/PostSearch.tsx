"use client";
import { useState } from "react";
import { searchShop } from "@/src/services/post";
import { AiOutlineSearch } from "react-icons/ai";
import PostListItem from "./PostShopItem";
import useSignUpStore from "@/src/store/useSignUpStore";
import PostImage from "./PostImage";
import PostContent from "./PostContent";

interface ShopItem {
  id: string;
  place_name: string;
  place_url: string;
  category_name: string;
  address_name: string;
  road_address_name: string;
  phone: string;
  x: string;
  y: string;
  content: string;
  isLiked: boolean;
}

function PostSearch() {
  const [keyWord, setKeyword] = useState("");
  const [ShopList, setShopList] = useState<ShopItem[]>([]);
  const nextComponent = useSignUpStore((state) => state.nextComponent);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await searchShop(keyWord);
      setShopList(res.response.documents);
      console.log("shop search success", res);
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
    <section className="flex flex-col items-center justify-center w-full ">
      <div className="w-9/12 max-sm:w-full">
        <form onSubmit={onSubmit} className="relative mb-5">
          <input
            type="text"
            name="search"
            value={keyWord}
            onChange={searchChangehandler}
            className="input"
            placeholder="주소 또는 식당명을 검색해 주세요!"
          />
          <button type="submit" className="absolute top-0 bottom-0 right-3 my-auto">
            <AiOutlineSearch size="1.5rem" />
          </button>
        </form>
        <ul>
          {ShopList.map((item) => (
            <li key={item.id}>
              <PostListItem type="search" item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default PostSearch;
