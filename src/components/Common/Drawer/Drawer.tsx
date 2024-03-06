import { ReactNode, useMemo, useState } from "react";
import { PanInfo, motion, useDragControls } from "framer-motion";
import useMeasure from "react-use-measure";

interface DrawerProps {
  children: ReactNode;
  closedHeight?: number;
  openedHeight?: number;
}

// 사용시 페이지 내 최상단 부모요소에 absolute와 overflow:hidden과 height:100vh 필수
// closedHeight의 기본값은 children으로 들어오는 요소의 상단 부분의 길이인 54px
// 수동으로 closedHeight 설정시 CONTENT_TOP과 CONTENT_BOTTOM을 더한 70px에 children의 높이를 고려해서 설정
// 수동으로 openedHeight 설정시 window.innerHeight - 50px 보다 큰 수치 입력시 무시됨
const Drawer = ({ children, closedHeight = 54, openedHeight }: DrawerProps) => {
  const [isOpened, setIsOpened] = useState(true);
  const [contentRef, contentBounds] = useMeasure();
  const animateState = isOpened ? "opened" : "closed";
  const CONTENT_TOP = 54;
  const CONTENT_BOTTOM = 16;
  const dragControls = useDragControls();
  const viewport = "100vh";
  const expandedHeight = useMemo(
    () => Math.min(openedHeight ?? contentBounds.height + CONTENT_TOP + CONTENT_BOTTOM, window.innerHeight - 50),
    [contentBounds.height, openedHeight]
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

  return (
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
      className="p-4 bg-white rounded-t-[10px] flex-1 absolute top-0 left-0 w-full z-[1] h-full"
    >
      <div
        onPointerDown={(e) => dragControls.start(e)}
        className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8"
      />
      <div className="max-w-md mx-auto" ref={contentRef}>
        {children}
      </div>
    </motion.div>
  );
};

export default Drawer;
