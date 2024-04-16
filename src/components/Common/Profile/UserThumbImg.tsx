import React from "react";
import Image, { StaticImageData } from "next/image";
import UserImage from "@assets/images/logo/userImage.png";

interface IUserThumbImgProps {
  src: string | StaticImageData | undefined | null;
  alt?: string;
  customWidth?: number;
  customHeight?: number;
  style?: string;
}

const UserThumbImg = ({ src, alt, customWidth, customHeight, style }: IUserThumbImgProps) => {
  const width = 48;
  const height = 48;
  return (
    <Image
      src={src || UserImage}
      alt={alt || "사용자 썸네일"}
      width={customWidth || width}
      height={customHeight || height}
      className={"border rounded-full cursor-pointer " + style}
    />
  );
};

export default UserThumbImg;
