import React from "react";
import { ShopItem } from "@@types/post";
import PostShopItem from "@components/PostForm/PostShopItem";

interface PostShopListProps {
  shopList: ShopItem[];
  keyword: string;
}
function PostShopList({ shopList, keyword }: PostShopListProps) {
  return (
    <ul className="mx-auto mt-[15px]">
      {shopList.map((item) => (
        <li key={item.id}>
          <PostShopItem item={item} keyword={keyword} />
        </li>
      ))}
    </ul>
  );
}
export default PostShopList;
