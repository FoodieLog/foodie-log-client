import React, { useState } from "react";
import { postFeed } from "@/src/services/post";
import { usePostStore } from "@/src/store/usePostStore";
import { LiaAngleLeftSolid } from "react-icons/lia";
import { useRouter } from "next/navigation";
import Button from "@/src/components/Button";
import ShopListItem from "./PostShopItem";
import useSignUpStore from "@/src/store/useSignUpStore";
import PostSearch from "./PostSearch";
import ImageSlide from "../Feed/ImageSlide";

function PostContent() {
  const [isChecked, setIsChecked] = useState(false);
  const [text, setText] = useState("");
  const { content, files, previews } = usePostStore();
  const nextComponent = useSignUpStore((state) => state.nextComponent);

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
      router.replace("/main/home");
      console.log("피드 등록 성공", res);
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
    <section>
      <div className="mb-5 relative w-full flex items-center justify-center">
        <LiaAngleLeftSolid size="1.5rem" className="absolute left-2" />
        <strong className="text-lg">게시글 등록</strong>
      </div>
      <div>
        <ImageSlide images={images} />
        <ShopListItem type="selected" item={content}></ShopListItem>
        <div className="my-5 ml-3 flex items-center gap-x-3 text-lg">
          <input type="checkbox" className="w-4 h-4" checked={isChecked} onChange={onChangeHandler} />
          <span>나의 맛집 리스트에 추가</span>
        </div>
        <textarea
          onChange={onChangeText}
          className="w-full h-[130px] p-3 border rounded-lg border-gray-400 resize-none focus:outline-none"
          placeholder="문구 입력"
        />
      </div>
      <div className="mt-5">
        <Button type="button" variant="primary" onClick={onClickHandler}>
          게시글 등록
        </Button>
      </div>
    </section>
  );
}

export default PostContent;
