import React from "react";
import { ShopItem } from "@@types/post";
import PostShopItem from "@components/PostForm/PostShopItem";

function PostShopList({ shopList }: { shopList: ShopItem[] }) {
  return (
    <ul>
      {shopList.map((item) => (
        <li key={item.id}>
          <PostShopItem type="search" item={item} />
        </li>
      ))}
    </ul>
  );
}
export default PostShopList;
