import React from "react";
import Image from "next/image";
import { AddIcon } from "@assets/icons";
import { PostFeedImageProps } from "@@types/post";

const MAX_IMAGE_COUNT = 3;
function PostFeedImage({ imageCount, onClick }: PostFeedImageProps) {
  return (
    <div className="bg-gray-1 w-[105px] h-[105px] flex flex-col items-center rounded-sm">
      <button
        type="button"
        className="w-10 h-10 mt-[18px] mb-2.5 rounded-full bg-gray-3 flex justify-center items-center"
        onClick={onClick}
      >
        <Image src={AddIcon} alt="사진 등록" />
      </button>
      <span className="text-gray-4">
        <span className={`${imageCount === MAX_IMAGE_COUNT && `text-red`}`}>{imageCount}</span>/{MAX_IMAGE_COUNT}
      </span>
    </div>
  );
}

export default PostFeedImage;
