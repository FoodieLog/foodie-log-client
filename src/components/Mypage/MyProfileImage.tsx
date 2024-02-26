import Image from "next/image";
import React from "react";
import { ImageComponentProps } from "@@types/common";
import photo_camera from "@assets/icons/common/photo_camera.png";
import autorenew from "@assets/icons/common/autorenew.png";

function MyProfileImage({ imageSrc, imageAlt, className }: ImageComponentProps) {
  if (!imageSrc) {
    return (
      <div className={`relative bg-gray-1 ${className}`}>
        <Image
          src={photo_camera}
          alt="카메라"
          width={32}
          height={32}
          className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 object-cover"
        />
      </div>
    );
  }
  return (
    <div className={`relative ${className}`}>
      <Image
        src={imageSrc}
        alt={imageAlt}
        className={className}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="w-full h-full bg-gray-10 opacity-70 absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
        <Image
          src={autorenew}
          alt="수정"
          width={32}
          height={32}
          className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  );
}

export default MyProfileImage;
