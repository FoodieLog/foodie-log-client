"use client";
import { useRef, useState } from "react";
import { LiaAngleLeftSolid } from "react-icons/lia";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Image from "next/image";
import { usePostStore } from "@/src/store/usePostStore";
import Button from "../Button";
import useSignUpStore from "@/src/store/useSignUpStore";

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
    setPreviews(newPreviews);
  };

  const onNextCilck = (e: React.MouseEvent) => {
    setNextComponent("PostContent");
  };

  return (
    <section className="flex flex-col items-center">
      <div className="sm:w-[600px] max-sm:w-9/12">
        <div className="relative w-full flex items-center justify-center">
          <LiaAngleLeftSolid size="1.5rem" className="absolute left-2" />
          <strong className="text-lg">사진 선택</strong>
        </div>
        <button type="button" onClick={pickImageHandler} className="">
          사진 추가
        </button>
        <ul className="mt-5 w-full grid grid-cols-3 border rounded-lg border-dashed border-gray-700 cursor-pointer ">
          {!previews.length ? (
            <p className="text-center">
              이미지를 선택하세요!
              <br />
              (최대 3장 가능)
            </p>
          ) : (
            <>
              {previews?.map((preview, index) => (
                <li className="relative" key={index}>
                  <div className="">
                    <Image src={preview} width={200} height={200} alt={`사진${index}`} />
                  </div>
                  <AiOutlineCloseCircle
                    className="absolute top-3 right-3"
                    onClick={(e: React.MouseEvent) => deleteImagehandler(e, index)}
                  />
                </li>
              ))}
            </>
          )}
        </ul>
        <input
          multiple
          type="file"
          ref={fileInput}
          onChange={onChangehandler}
          hidden
          accept="image/*,audio/*,video/mp4,video/x-m4v,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,.csv"
        />
      </div>
      <Button type="button" variant="primary" onClick={onNextCilck}>
        선택 완료
      </Button>
    </section>
  );
}

export default PostImage;
