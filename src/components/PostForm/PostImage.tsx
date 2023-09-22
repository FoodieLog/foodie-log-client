"use client";
import React, { useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Image from "next/image";
import usePostStore from "@/src/store/usePostStore";
import Button from "../Common/Button";
import useSignUpStore from "@/src/store/useSignUpStore";
import Header from "../Common/Header";
import onClickPreComponent from "@/src/hooks/useOnClickBack";

function PostImage() {
  const [previews, setPreviewImage] = useState<string[]>([]);
  const setPreviews = usePostStore((state) => state.setPreviews);
  const files = usePostStore((state) => state.files);
  const setFiles = usePostStore((state) => state.setFiles);
  const setNextComponent = useSignUpStore((state) => state.setNextComponent);
  const fileInput = useRef<HTMLInputElement>(null);

  // ref 클릭
  const pickImageHandler = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  // onChange
  const onChangehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newImages = [...files];
    const newPreviews = [...previews];

    for (let i = 0; i < e.target.files!.length; i++) {
      const file = e.target.files![i];
      // 이미지 파일 3개로 제한
      if (newImages.length < 3) {
        // 이벤트객체의 파일을 newImages에 담기
        newImages.push(file);
        // 파일리더 객체 생성
        const reader = new FileReader();
        // 파일 읽어온 후 실행되는 콜백함수
        reader.onload = (e) => {
          // 읽어온 값을 갱신하기
          newPreviews.push(e.target!.result as string);
          setPreviewImage(newPreviews);
          setPreviews(newPreviews);
        };
        // 파일 객체를 읽어 base64 형태의 문자열로 변환
        reader.readAsDataURL(file);
      }
    }
    setFiles(newImages);
  };
  // 이미지 삭제
  const deleteImagehandler = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    const newImages = [...files];
    const newPreviews = [...previews];

    newImages.splice(index, 1);
    newPreviews.splice(index, 1);

    setFiles(newImages);
    setPreviewImage(newPreviews);
    setPreviews(newPreviews);
  };

  const onNextCilck = (e: React.MouseEvent) => {
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
        <button
          type="button"
          onClick={pickImageHandler}
          className=" text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
        >
          사진 추가
        </button>
        {!previews.length ? (
          <p className="text-center">
            이미지를 선택하세요!
            <br />
            (최대 3장 가능)
          </p>
        ) : (
          <ul className="w-full grid grid-cols-3 gap-3">
            {previews?.map((preview, i) => (
              <li
                key={i}
                className="w-full h-full relative after:content-[''] after:block after:pb-[100%] overflow-hidden"
              >
                <div className="w-full h-full absolute flex items-center justify-center">
                  <Image width={200} height={200} src={preview} alt={`이미지${i}`} className="object-contain" />
                </div>
                <div onClick={(e: React.MouseEvent) => deleteImagehandler(e, i)}>
                  <AiOutlineCloseCircle className="absolute top-3 right-3" />
                </div>
              </li>
            ))}
          </ul>
        )}

        <input
          multiple
          type="file"
          ref={fileInput}
          onChange={onChangehandler}
          hidden
          accept="image/*,audio/*,video/mp4,video/x-m4v,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,.csv"
        />
        <div className="mt-10">
          <Button type="button" variant="primary" onClick={onNextCilck}>
            선택 완료
          </Button>
        </div>
      </div>
    </section>
  );
}

export default PostImage;
