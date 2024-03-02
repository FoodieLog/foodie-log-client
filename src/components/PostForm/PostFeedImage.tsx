import React from "react";
import { AddIcon } from "@assets/icons";
import { PostFeedImageProps } from "@@types/post";

const MAX_IMAGE_COUNT = 3;
function PostFeedImage({ imageCount, onClick }: PostFeedImageProps) {
  return (
    <div className="relative bg-gray-1 flex flex-col items-center rounded-sm after:content-[''] after:pb-[100%]">
      <button
        type="button"
        className="w-[38%] h-[38%] absolute top-[18px] left-1/2 -translate-x-1/2 p-[13px] rounded-full bg-gray-3 flex items-center justify-center"
        onClick={onClick}
      >
        <AddIcon />
      </button>
      <span className="absolute bottom-[18px] left-1/2 -translate-x-1/2 text-gray-4">
        <span className={`${imageCount === MAX_IMAGE_COUNT && `text-red`}`}>{imageCount}</span>/{MAX_IMAGE_COUNT}
      </span>
    </div>
  );
}

export default PostFeedImage;
