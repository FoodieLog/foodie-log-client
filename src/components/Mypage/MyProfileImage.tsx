import Image from "next/image";
import React from "react";
import { ImageComponentProps } from "@@types/common";
import { PhotoCamera, AutoreNew } from "@assets/icons";

function MyProfileImage({ imageSrc, imageAlt, className }: ImageComponentProps) {
  if (!imageSrc) {
    return (
      <div className={`relative bg-gray-1 ${className}`}>
        <div className="w-full h-full flex justify-center items-center">
          <PhotoCamera />
        </div>
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
      <div className="w-full h-full bg-gray-10 opacity-70 flex justify-center items-center">
        <AutoreNew />
      </div>
    </div>
  );
}

export default MyProfileImage;
