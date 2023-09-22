import React, { useState } from "react";
import { postFeed } from "@/src/services/post";
import usePostStore from "@/src/store/usePostStore";
import { LiaAngleLeftSolid } from "react-icons/lia";
import { useRouter } from "next/navigation";
import Button from "@/src/components/Common/Button";
import ShopListItem from "./PostShopItem";
import useSignUpStore from "@/src/store/useSignUpStore";
import PostSearch from "./PostSearch";
import ImageSlide from "../Feed/ImageSlide";
import Header from "../Common/Header";

function PostContent() {
  const [isChecked, setIsChecked] = useState(false);
  const [text, setText] = useState("");
  const { content, files, previews, resetContent } = usePostStore();

  const nextComponent = useSignUpStore((state) => state.nextComponent);
  const setNextComponent = useSignUpStore((state) => state.setNextComponent);

  const router = useRouter();

  const onClickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      const userData = {
        selectedSearchPlace: {
          id: content.id,
          place_name: content.place_name,
          place_url: content.place_url,
          category_name: content.category_name,
          address_name: content.address_name,
          road_address_name: content.road_address_name,
          phone: content.phone,
          x: content.x,
          y: content.y,
        },
        content: text,
        isLiked: isChecked,
      };

      const blob = new Blob([JSON.stringify(userData)], { type: "application/json" });
      formData.append("content", blob);
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
      const res = await postFeed(formData);
      console.log("피드 등록 성공", res);
      resetContent();
      setNextComponent("");
      router.replace("/main/mypage");
    } catch (err) {
      console.log("피드 등록 실패", err);
    }
  };

  const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
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
    <section className="w-full sm:max-w-[640px]  mx-auto">
      <Header title="게시글 등록" type="arrow" back="preComponent" />
      <div className="px-3 mt-5">
        <ImageSlide images={images} />
        <ShopListItem type="selected" item={content}></ShopListItem>
        <label className="my-5 ml-3 flex items-center gap-x-3 text-lg">
          <input type="checkbox" className="w-4 h-4" checked={isChecked} onChange={onChangeHandler} />
          <span>나의 맛집 리스트에 추가</span>
        </label>
        <textarea
          onChange={onChangeText}
          className="w-full h-[130px] p-3 border rounded-lg border-gray-400 resize-none focus:outline-none"
          placeholder="문구 입력"
        />
        <div className="mt-5">
          <Button type="button" variant="primary" onClick={onClickHandler}>
            게시글 등록
          </Button>
        </div>
      </div>
    </section>
  );
}

export default PostContent;
