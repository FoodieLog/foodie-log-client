"use client"

import { useState, useEffect } from "react";

const useHideOnScroll = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const difference = Math.abs(prevScrollPos - currentScrollPos);

      // 차이가 10px 이상일 때만 isVisible 상태를 업데이트
      if (difference > 30) {
        setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
        setPrevScrollPos(currentScrollPos);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return isVisible;
};

export default useHideOnScroll;
