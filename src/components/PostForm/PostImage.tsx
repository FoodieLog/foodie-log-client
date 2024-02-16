"use client";
import React, { useRef } from "react";
import { AiFillCamera, AiFillCloseCircle } from "react-icons/ai";
import Image from "next/image";
import usePostStore from "@/src/store/usePostStore";
import Button from "../Common/Button";
import useSignUpStore from "@/src/store/useSignUpStore";
import Header from "../Common/Header";

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

  const deleteImagehandler = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    const newImages = [...files];
    const newPreviews = [...previews];

    newImages.splice(index, 1);
    newPreviews.splice(index, 1);

    setFiles(newImages);
    setPreviews(newPreviews);
  };

  const completeSelectHandler = (e: React.MouseEvent) => {
    if (previews.length > 0) {
      return setNextComponent("PostContent");
    } else {
      alert("이미지 필수입니다!");
    }
  };

  return (
    <section className="w-full sm:max-w-[640px]  mx-auto">
      <Header title="이미지 선택" type="arrow" back="preComponent" />
      <div className=" mx-3">
        <div className="flex justify-center mt-5 gap-2 flex-wrap">
          <button
            type="button"
            onClick={clickPickImageHandler}
            className="flex flex-col w-[70px] h-[70px] justify-center items-center text-center border border-black rounded-lg"
          >
            <AiFillCamera />
            <p>{previews.length}/3</p>
          </button>

          <ul className="flex gap-2">
            {previews?.map((preview, i) => (
              <li
                key={i}
                className="relative w-[70px] h-[70px] flex flex-col  justify-center items-center text-center border border-black rounded-lg overflow-hidden"
              >
                <Image width={70} height={64} src={preview} alt={`이미지${i}`} className="object-cover" />
                <button
                  type="button"
                  onClick={(e: React.MouseEvent) => deleteImagehandler(e, i)}
                  className="absolute top-1 right-1"
                >
                  <AiFillCloseCircle />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <input
          multiple
          type="file"
          ref={fileInput}
          onChange={addImageHandler}
          hidden
          accept="image/*,audio/*,video/mp4,video/x-m4v,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,.csv"
        />
        <div className="mt-10">
          <Button type="button" variant="primary" onClick={completeSelectHandler}>
            선택 완료
          </Button>
        </div>
      </div>
    </section>
  );
}

export default PostImage;
