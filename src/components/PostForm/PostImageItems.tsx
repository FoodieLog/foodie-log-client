import React from "react";
import { PostImageItemProps } from "@@types/post";
import ImageThumbnail from "@/src/components/Common/ImageThumbnail";

function PostImageItem({ preview, idx, deleteImageHandler }: PostImageItemProps) {
  return (
    <li className="relative w-[105px] h-[105px] rounded-sm overflow-hidden">
      <ImageThumbnail imageSrc={preview} imageAlt={`${idx + 1}번째 미리보기 이미지`} />
      <button
        type="button"
        onClick={(e) => {
          deleteImageHandler(e, idx);
        }}
        className="absolute top-1 right-2"
      >
        {/* 이미지 추가 예정 */}
      </button>
    </li>
  );
}

export default PostImageItem;
