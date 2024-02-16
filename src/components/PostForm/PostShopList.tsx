import { ShopItem } from "@/src/types/post";
import React from "react";
import PostShopItem from "@/src/components/PostForm/PostShopItem";

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
