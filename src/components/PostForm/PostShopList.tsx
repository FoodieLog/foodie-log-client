import React from "react";
import PostShopItem from "@components/PostForm/PostShopItem";
import useRestaurantListQuery from "@hooks/queries/useRestaurantListQuery";
import EmptyList from "@components/PostForm/EmptyList";

interface PostShopListProps {
  isSubmit: boolean;
  keyword: string;
}
function PostShopList({ isSubmit, keyword }: PostShopListProps) {
  const { data: shopList, isLoading } = useRestaurantListQuery(isSubmit, keyword);

  if (isSubmit && isLoading) {
    return (
      <div className="w-full text-center mt-[230px] text-[18px] font-semibold text-gray-8">
        <span className="text-red">{`"${keyword}"`}</span> 검색중
      </div>
    );
  }

  if (!shopList?.length) {
    return isSubmit ? <EmptyList keyword={keyword} /> : null;
  }

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
