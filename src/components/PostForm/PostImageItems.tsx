import React from "react";
import { PostImageItemProps } from "@@types/post";
import FeedThumbnail from "@components/Common/FeedThumbnail";

function PostImageItem({ preview, idx, deleteImageHandler }: PostImageItemProps) {
  return (
    <li className="relative w-[105px] h-[105px] rounded-sm overflow-hidden">
      <FeedThumbnail imageSrc={preview} imageAlt="" />
      <button
        type="button"
        onClick={(e) => {
          deleteImageHandler(e, idx);
        }}
        className="absolute top-1 right-2"
      ></button>
    </li>
  );
}

export default PostImageItem;
