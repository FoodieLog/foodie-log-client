import React from "react";
import Image from "next/image";
import { ImagesMode } from "@assets/icons";
import { ImageComponentProps } from "@@types/common";

function ImageThumbnail({ imageSrc, imageAlt }: ImageComponentProps) {
  if (!imageSrc) {
    return (
      <div className="w-full h-full bg-gray-1 flex items-center justify-center">
        <Image src={ImagesMode} alt="사진 아이콘" width={32} height={32} />
      </div>
    );
  }
  return <Image src={imageSrc} alt={imageAlt} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />;
}

export default ImageThumbnail;
