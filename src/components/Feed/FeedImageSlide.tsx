import { useRef, useState } from "react";
import { RxDotFilled } from "react-icons/rx";
import { ArrowBack_IOS } from "@assets/icons";

interface FeedImageSlideProps {
  images: { imageUrl: string }[];
}

const FeedImageSlide = ({ images }: FeedImageSlideProps) => {
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
          <div className="w-[33px] h-[46px] absolute top-[50%] translate-y-[-50%] bg-black opacity-50 cursor-pointer">
            <ArrowBack_IOS onClick={prevSlideHandler} color="white" className="translate-x-[-8px]" />
          </div>
          <div className="w-[33px] h-[46px] rotate-180 absolute top-[50%] translate-y-[-50%] right-0 bg-black opacity-50 cursor-pointer">
            <ArrowBack_IOS onClick={nextSlideHandler} color="white" className="translate-x-[-8px]" />
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
