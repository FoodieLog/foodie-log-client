"use client";
import React, { useRef } from "react";
import usePostStore from "@store/usePostStore";
import Button from "@components/Common/Button";
import useSignUpStore from "@store/useSignUpStore";
import Header from "@components/Common/Header";
import { Input } from "@/components/ui/input";
import PostImageList from "@components/PostForm/PostImageList";

function PostImage() {
  const fileInput = useRef<HTMLInputElement>(null);
  const { files, previews, setFiles, setPreviews } = usePostStore();
  const setNextComponent = useSignUpStore((state) => state.setNextComponent);

  const clickPickImageHandler = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const addImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newImages = [...files];
    const newPreviews = [...previews];

    for (let i = 0; i < e.target.files!.length; i++) {
      const file = e.target.files![i];
      if (newImages.length < 3) {
        newImages.push(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          newPreviews.push(e.target!.result as string);
          setPreviews(newPreviews);
        };
        // 파일 객체를 읽어 base64 형태의 문자열로 변환
        reader.readAsDataURL(file);
      }
    }
    setFiles(newImages);
  };

  const deleteImageHandler = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    const newImages = [...files];
    const newPreviews = [...previews];

    newImages.splice(index, 1);
    newPreviews.splice(index, 1);

    setFiles(newImages);
    setPreviews(newPreviews);
  };

  const completeSelectHandler = () => {
    if (previews.length > 0) {
      return setNextComponent("PostContent");
    } else {
      alert("이미지 필수입니다!");
    }
  };

  return (
    <section className="w-full h-screen sm:max-w-[640px] mx-auto flex flex-col">
      <Header title="사진 등록" back="preComponent" />
      <div className="h-full px-5 py-[19px] flex flex-col justify-between">
        <div className="h-full">
          <PostImageList
            imageCount={previews.length}
            onClick={clickPickImageHandler}
            deleteImageHandler={deleteImageHandler}
          />
          <Input
            multiple
            type="file"
            ref={fileInput}
            onChange={addImageHandler}
            hidden
            className="hidden"
            accept="image/*,audio/*,video/mp4,video/x-m4v,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,.csv"
          />
        </div>
        <Button type="button" variant="primary" onClick={completeSelectHandler} disabled={!previews.length}>
          글 작성하기
        </Button>
      </div>
    </section>
  );
}

export default PostImage;
