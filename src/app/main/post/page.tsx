"use client";
import React, { useEffect } from "react";
import PostSearch from "@components/PostForm/PostSearch";
import usePostStore from "@store/usePostStore";
import useFeedStore from "@store/useFeedStore";

function Post() {
  const { resetContent } = usePostStore();
  const { setFeed } = useFeedStore();

  useEffect(() => {
    return () => {
      resetContent();
      setFeed({ id: 0, content: "" });
    };
  }, []);
  return <PostSearch />;
}

export default Post;
