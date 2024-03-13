import React, { ReactNode, useMemo, useState, useEffect } from "react";
import { PanInfo, motion, useDragControls } from "framer-motion";
import useMeasure from "react-use-measure";

interface DrawerProps {
  children: ReactNode;
  closedHeight?: number;
  openedHeight?: number;
  open?: boolean;
  fixedComponent?: React.JSX.Element;
  scroller?: boolean;
  backgroundDarker?: boolean;
  openControlers?: {
    isOpener: boolean;
    setIsOpener: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

// 사용시 페이지 내 최상단 부모요소에 absolute와 overflow:hidden과 height:100vh 필수
// closedHeight의 기본값은 children으로 들어오는 요소의 상단 부분의 길이인 54px
// 수동으로 closedHeight 설정시 CONTENT_TOP과 CONTENT_BOTTOM을 더한 70px에 children의 높이를 고려해서 설정
// 수동으로 openedHeight 설정시 window.innerHeight - 50px 보다 큰 수치 입력시 무시됨
// scroller 사용시 openedHeight, closedHeight 사용 필수
const Drawer = ({
  children,
  closedHeight = 54,
  openedHeight,
  open = true,
  fixedComponent,
  scroller = false,
  backgroundDarker = false,
  openControlers,
}: DrawerProps) => {
  const [isOpened, setIsOpened] = useState(open);
  const [contentRef, contentBounds] = useMeasure();
  const [fixedRef, fixedBounds] = useMeasure();
  const [scrollerHeight, setScrollerHeight] = useState<number>();
  const animateState = isOpened ? "opened" : "closed";
  const CONTENT_TOP = 54;
  const CONTENT_BOTTOM = 16;
  const dragControls = useDragControls();
  const viewport = "100vh";

  const expandedHeight = useMemo(
    () =>
      Math.min(
        openedHeight ?? contentBounds.height + fixedBounds?.height + CONTENT_TOP + CONTENT_BOTTOM,
        window.innerHeight - 50
      ),
    [contentBounds.height, fixedBounds?.height, openedHeight]
  );

  const handleDragEnd = (_: any, info: PanInfo) => {
    const offsetThreshold = 50;
    const deltaThreshold = 3;

    const isOverOffsetThreshold = Math.abs(info.offset.y) > offsetThreshold;
    const isOverDeltaThreshold = Math.abs(info.delta.y) > deltaThreshold;

    const isOverThreshold = isOverOffsetThreshold || isOverDeltaThreshold;

    if (!isOverThreshold) return;

    const newIsOpened = info.offset.y < 0;

    setIsOpened(newIsOpened);
  };

  useEffect(() => {
    if (fixedComponent) {
      isOpened
        ? setScrollerHeight(expandedHeight - CONTENT_TOP - CONTENT_BOTTOM - fixedBounds.height)
        : setScrollerHeight(closedHeight - CONTENT_TOP - CONTENT_BOTTOM - fixedBounds.height);
    } else {
      isOpened
        ? setScrollerHeight(expandedHeight - CONTENT_TOP - CONTENT_BOTTOM)
        : setScrollerHeight(closedHeight - CONTENT_TOP - CONTENT_BOTTOM);
    }
  }, [closedHeight, expandedHeight, fixedBounds.height, fixedComponent, isOpened]);

  useEffect(() => {
    if (openControlers?.isOpener !== undefined) {
      setIsOpened(openControlers?.isOpener);
    }
  }, [openControlers]);

  return (
    <>
      {backgroundDarker && isOpened && (
        <div
          onClick={() => {
            setIsOpened(!isOpened);
            openControlers?.setIsOpener(!isOpened);
          }}
          className="bg-gray-300 bg-opacity-50 fixed w-screen h-screen flex justify-center items-center top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full"
        ></div>
      )}
      <motion.div
        initial="closed"
        animate={animateState}
        variants={{
          opened: { top: `calc(${viewport} - ${expandedHeight}px)` },
          closed: { top: `calc(${viewport} - ${closedHeight}px)` },
        }}
        transition={{ type: "spring", bounce: 0, duration: 0.5 }}
        drag="y"
        dragControls={dragControls}
        dragListener={true}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        className="p-4 bg-white rounded-t-[10px] flex flex-col flex-1 absolute top-0 left-0 w-full z-[100] h-full"
      >
        <button
          onClick={() => {
            setIsOpened(!isOpened);
            openControlers?.setIsOpener(!isOpened);
          }}
          onPointerDown={(e) => dragControls.start(e)}
          className="mx-auto w-12 h-1.5 rounded-full bg-gray-3 mt-1 mb-7"
        />
        {fixedComponent ? (
          <div className="mb-5" ref={fixedRef}>
            {fixedComponent}
          </div>
        ) : null}
        <div className="max-w-md" ref={contentRef}>
          <div
            className={scroller ? `overflow-y-auto` : ""}
            style={{
              paddingBottom: "16px",
              ...(scroller && {
                height: `${scrollerHeight}px`,
                transition: "height 0.2s ease-in-out",
              }),
            }}
          >
            {children}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Drawer;
