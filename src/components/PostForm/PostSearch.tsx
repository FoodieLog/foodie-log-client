"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { searchShop } from "@/src/services/post";
import { AiOutlineSearch } from "react-icons/ai";

import PostListItem from "./PostShopItem";
import useSignUpStore from "@/src/store/useSignUpStore";
import PostImage from "./PostImage";
import PostContent from "./PostContent";
import Header from "../Common/Header";

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
  const setNextComponent = useSignUpStore((state) => state.setNextComponent);
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
  const router = useRouter();

  const searchChangehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  if (nextComponent === "PostImage") {
    return <PostImage />;
  } else if (nextComponent === "PostContent") {
    return <PostContent />;
  }
  return (
    <section className="w-full sm:max-w-[640px]">
      <Header title="식당 검색" type="arrow" back="prePage" />
      <div className="mt-3  mx-3">
        <form onSubmit={onSubmit} className="relative px-3">
          <input
            type="text"
            name="search"
            value={keyWord}
            onChange={searchChangehandler}
            className="input"
            placeholder="주소 또는 식당명을 검색"
          />
          <button type="submit" className="absolute top-0 bottom-0 right-8 my-auto">
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
