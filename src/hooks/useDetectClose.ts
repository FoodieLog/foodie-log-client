import React, { useState, useEffect } from "react";

function useDetectClose(elem: React.RefObject<HTMLUListElement>, initialState: boolean) {
  const [isOpen, setIsOpen] = useState(initialState);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && elem.current !== null && !elem.current.contains(e.target)) {
        setIsOpen(!isOpen);
      }
    };

    if (isOpen) {
      window.addEventListener("click", onClick);
    }

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isOpen, elem]);

  return { isOpen, toggleOpen };
}
export default useDetectClose;
