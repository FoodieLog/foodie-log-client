import React, { useRef, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

interface ImageSlideProps {
  images: { imageUrl: string }[];
}

const ImageSlide: React.FC<ImageSlideProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null); // 슬라이드 div 참조
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const DISTANCE_TOUCH = 30;
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    if (e.clientX - startX > DISTANCE_TOUCH) {
      prevSlide();
      setIsDragging(false);
    } else if (startX - e.clientX > DISTANCE_TOUCH) {
      nextSlide();
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setStartX(touch.clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    if (touch.clientX - startX > DISTANCE_TOUCH) {
      prevSlide();
    } else if (startX - touch.clientX > DISTANCE_TOUCH) {
      nextSlide();
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch.clientX - startX > DISTANCE_TOUCH) {
      prevSlide();
    } else if (startX - touch.clientX > DISTANCE_TOUCH) {
      nextSlide();
    }
  };

  return (
    <div className="w-full max-w-[640px] relative group">
      <div
        className="relative pb-[100%]"
        ref={slideRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          style={{ backgroundImage: `url(${images[currentIndex]?.imageUrl})` }}
          className="absolute inset-0 bg-center bg-cover duration-500"
        ></div>
      </div>
      {images.length > 1 && (
        <>
          <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <BsChevronCompactLeft onClick={prevSlide} size={30} />
          </div>
          <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <BsChevronCompactRight onClick={nextSlide} size={30} />
          </div>
          <div className="flex absolute bottom-5 left-[50%] transform -translate-x-[50%] translate-y-[18px] justify-center bg-transparent">
            {images.map((image, slideIndex) => (
              <div
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className="text-xl sm:text-2xl cursor-pointer"
              >
                <RxDotFilled className={slideIndex === currentIndex ? "text-black scale-125" : "text-gray-500"} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageSlide;
