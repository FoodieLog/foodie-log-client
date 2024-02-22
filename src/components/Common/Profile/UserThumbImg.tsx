import Image, { StaticImageData } from "next/image";
import React from "react";

interface IUserThumbImgProps {
  src: string | StaticImageData;
  style?: string;
}

const UserThumbImg = (props: IUserThumbImgProps) => {
  const width = 48;
  const height = 48;
  return (
    <Image
      src={props.src}
      alt="사용자 썸네일"
      width={width}
      height={height}
      // TODO: REFACTORING 필요
      className={"border rounded-full cursor-pointer " + props.style}
    />
  );
};

export default UserThumbImg;
