import React, { useState } from "react";
import { postFeed } from "@services/post";
import usePostStore from "@store/usePostStore";
import { useRouter } from "next/navigation";
import Button from "@components/Common/Button";
import PostShopItem from "@components/PostForm/PostShopItem";
import useSignUpStore from "@store/useSignUpStore";
import PostSearch from "@components/PostForm/PostSearch";
import FeedImageSlide from "@components/Feed/FeedImageSlide";
import Header from "@components/Common/Header";
import { useToast } from "@/components/ui/use-toast";

function PostContent() {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const [text, setText] = useState("");
  const { content, files, previews, resetContent } = usePostStore();
  const { nextComponent, setNextComponent } = useSignUpStore();
  const { toast } = useToast();

  const registerFeedHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      const feedData = {
        selectedSearchPlace: { ...content },
        content: text,
        isLiked: isChecked,
      };

      const blob = new Blob([JSON.stringify(feedData)], { type: "application/json" });
      formData.append("content", blob);
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
      await postFeed(formData);
      toast({ description: "게시글 등록되었습니다!" });
      resetContent();
      setNextComponent("");
      router.replace("/main/mypage");
    } catch (err) {
      toast({ description: "게시글 등록 중 오류 발생하였습니다." });
    }
  };

  const changeTextHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const changeCheckboxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const images = previews.map((item) => {
    return {
      imageUrl: item,
    };
  });

  if (nextComponent === "PostSearch") {
    return <PostSearch />;
  }

  return (
    <section className="w-full sm:max-w-[640px] mx-auto">
      <Header title="게시글 등록" type="arrow" back="preComponent" />
      <div className="px-3 mt-5">
        <FeedImageSlide images={images} />
        <PostShopItem type="selected" item={content} />
        <label className="my-5 ml-3 flex items-center gap-x-3 text-lg">
          <input type="checkbox" className="w-4 h-4" checked={isChecked} onChange={changeCheckboxHandler} />
          <span>나의 맛집 리스트에 추가</span>
        </label>
        <textarea
          onChange={changeTextHandler}
          className="w-full h-[130px] p-3 border rounded-lg border-gray-400 resize-none focus:outline-none"
          placeholder="문구 입력"
        />
        <div className="mt-5">
          <Button type="button" variant="primary" onClick={registerFeedHandler}>
            게시글 등록
          </Button>
        </div>
      </div>
    </section>
  );
}

export default PostContent;
