import { ReactNode, useMemo, useState } from "react";
import { PanInfo, motion, useDragControls } from "framer-motion";
import useMeasure from "react-use-measure";

interface DrawerProps {
  children: ReactNode;
}

// 사용시 페이지 내 최상단 부모요소에 overflow:hidden과 height:100vh 필수
const Drawer = ({ children }: DrawerProps) => {
  const [isOpened, setIsOpened] = useState(true);
  const [contentRef, contentBounds] = useMeasure();
  const animateState = isOpened ? "opened" : "closed";

  const dragControls = useDragControls();
  const viewport = "100vh";
  const expandedHeight = useMemo(
    () => Math.min(contentBounds.height + 50, window.innerHeight - 50),
    [contentBounds.height]
  );

  const handleDragEnd = (_: any, info: PanInfo) => {
    const offsetThreshold = 150;
    const deltaThreshold = 5;

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
        closed: { top: `calc(${viewport} - 60px)` },
      }}
      transition={{ type: "spring", bounce: 0, duration: 0.5 }}
      drag="y"
      dragControls={dragControls}
      dragListener={true}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      className="p-4 bg-white rounded-t-[10px] flex-1 absolute top-0 left-0 w-full z-[1] "
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
