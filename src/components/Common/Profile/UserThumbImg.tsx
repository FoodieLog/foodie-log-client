import Image, { StaticImageData } from "next/image";
import React from "react";

interface IUserThumbImgProps {
  src: string | StaticImageData;
  width: number;
  height: number;
  style?: string;
}

const UserThumbImg = (props: IUserThumbImgProps) => {
  return (
    <Image
      src={props.src}
      alt="사용자 썸네일"
      width={props.width}
      height={props.height}
      // TODO: REFACTORING 필요
      className={"border rounded-full cursor-pointer " + props.style}
    />
  );
};

export default UserThumbImg;
