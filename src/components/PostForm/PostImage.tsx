"use client";
import React, { useRef, useState } from "react";
import { AiOutlineCloseCircle, AiFillCamera, AiFillCloseCircle } from "react-icons/ai";
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
        <div className="flex justify-center mt-5 gap-2 flex-wrap">
          <button
            type="button"
            onClick={pickImageHandler}
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
