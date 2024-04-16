"use client";
import React from "react";
import { useRouter } from "next/navigation";
import PostFeedIcon from "@assets/icons/common/edit.svg";
import useShowPartial from "@hooks/useShowPartial";
import useSignUpStore from "@store/useSignUpStore";

function PostFeedButton() {
  const { isShow } = useShowPartial();
  const router = useRouter();
  const { setNextComponent } = useSignUpStore();

  const clickPostButtonHandler = () => {
    setNextComponent("PostSearch");
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
