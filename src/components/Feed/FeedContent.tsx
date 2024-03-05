import { useState } from "react";
import { CaretDown } from "@assets/icons";

interface FeedContentProps {
  content: string;
}

function FeedContent({ content }: FeedContentProps) {
  const [expandedFeed, setExpandedFeed] = useState(false);
  return (
    <div className="whitespace-pre-wrap">
      {content.length > 90 && !expandedFeed ? (
        <>
          {content.substring(0, 90) + "... "}
          <button className="text-blue-500" onClick={() => setExpandedFeed(true)}>
            <span>더보기</span>
            <CaretDown />
          </button>
        </>
      ) : (
        <>
          <p className="">{content}</p>
          {expandedFeed && (
            <button className="text-blue-500" onClick={() => setExpandedFeed(false)}>
              <span>접기</span>
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default FeedContent;
