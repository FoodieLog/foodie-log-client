import React from "react";
import { PostImageItemProps } from "@@types/post";
import ImageThumbnail from "@components/Common/Thumbnail/ImageThumbnail";
import { CloseSmall } from "@assets/icons";

function PostImageItem({ preview, idx, deleteImageHandler }: PostImageItemProps) {
  return (
    <li className="relative rounded-sm overflow-hidden">
      <ImageThumbnail imageSrc={preview} imageAlt={`${idx + 1}번째 미리보기 이미지`} />
      <button
        type="button"
        onClick={(e) => {
          deleteImageHandler(e, idx);
        }}
        className="w-6 h-6 bg-gray-0 opacity-70 rounded-full  absolute top-1 right-2 flex items-center justify-center"
      >
        <CloseSmall />
      </button>
    </li>
  );
}

export default PostImageItem;
