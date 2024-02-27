import React from "react";
import usePostStore from "@store/usePostStore";
import { PostImageListProps } from "@@types/post";
import PostImageItem from "@components/PostForm/PostImageItems";
import PostFeedImage from "@components/PostForm/PostFeedImage";

function PostImageList({ imageCount, onClick, deleteImageHandler }: PostImageListProps) {
  const { previews } = usePostStore();
  return (
    <ul className="grid grid-cols-3 gap-0.5">
      <PostFeedImage imageCount={imageCount} onClick={onClick} />
      {previews?.map((preview, idx) => {
        return <PostImageItem key={preview} preview={preview} idx={idx} deleteImageHandler={deleteImageHandler} />;
      })}
    </ul>
  );
}

export default PostImageList;
