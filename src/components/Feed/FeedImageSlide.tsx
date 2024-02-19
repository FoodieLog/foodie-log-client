import React, { useRef, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { FeedImageSlideProps } from "@/src/types/feed";

const FeedImageSlide: React.FC<FeedImageSlideProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const DISTANCE_TOUCH = 30;

  const prevSlideHandler = () => {
    const isFirstSlide = currentIndex === 0;
    if (!isFirstSlide) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const nextSlideHandler = () => {
    const isLastSlide = currentIndex === images.length - 1;
    if (!isLastSlide) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToSlideHandler = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  const mouseDownHandler = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const mouseMoveHandler = (e: React.MouseEvent) => {
    if (!isDragging) return;
    if (e.clientX - startX > DISTANCE_TOUCH) {
      prevSlideHandler();
      setIsDragging(false);
    } else if (startX - e.clientX > DISTANCE_TOUCH) {
      nextSlideHandler();
      setIsDragging(false);
    }
  };

  const mouseUpHandler = () => {
    setIsDragging(false);
  };

  const touchStartHandler = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setStartX(touch.clientX);
  };

  const touchEndHandler = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    if (touch.clientX - startX > DISTANCE_TOUCH) {
      prevSlideHandler();
    } else if (startX - touch.clientX > DISTANCE_TOUCH) {
      nextSlideHandler();
    }
  };

  return (
    <div className="w-full max-w-[640px] relative group">
      <div
        className="relative pb-[100%]"
        ref={slideRef}
        onMouseDown={mouseDownHandler}
        onMouseMove={mouseMoveHandler}
        onMouseUp={mouseUpHandler}
        onTouchStart={touchStartHandler}
        onTouchEnd={touchEndHandler}
      >
        <div
          style={{ backgroundImage: `url(${images[currentIndex]?.imageUrl})` }}
          className="absolute inset-0 bg-center bg-cover duration-500"
        ></div>
      </div>
      {images.length > 1 && (
        <>
          <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <BsChevronCompactLeft onClick={prevSlideHandler} size={30} />
          </div>
          <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <BsChevronCompactRight onClick={nextSlideHandler} size={30} />
          </div>
          <div className="flex absolute bottom-5 left-[50%] transform -translate-x-[50%] translate-y-[18px] justify-center bg-transparent">
            {images.map((image, slideIndex) => (
              <div
                key={slideIndex}
                onClick={() => goToSlideHandler(slideIndex)}
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

export default FeedImageSlide;
