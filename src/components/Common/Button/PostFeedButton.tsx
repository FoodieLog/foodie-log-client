"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { PostFeedIcon } from "@assets/icons";
import useShowPartial from "@hooks/useShowPartial";

function PostFeedButton() {
  const { isShow } = useShowPartial();
  const router = useRouter();

  const clickPostButtonHandler = () => {
    router.push("/main/post");
  };

  return (
    <>
      {isShow && (
        <div className="fixed bottom-[94px] right-5 z-20">
          <button type="button" className="bg-red-2 rounded-full p-[18px]" onClick={clickPostButtonHandler}>
            <PostFeedIcon />
          </button>
        </div>
      )}
    </>
  );
}

export default PostFeedButton;
