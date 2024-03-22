import Link from "next/link";
import React from "react";
import ImageThumbnail from "@components/Common/Thumbnail/ImageThumbnail";
import { Content } from "@@types/feed";

interface FeedThumbnailListProps {
  feedList: Content[];
}

function FeedThumbnailList({ feedList }: FeedThumbnailListProps) {
  return (
    <>
      {feedList.map(({ feed: { feedId, userId, feedImages } }) => {
        return (
          <li key={feedId} className="rounded-sm overflow-hidden">
            <Link
              href={`/main/feed/${userId}?feedId=${feedId}`}
              className="w-full h-full relative after:content-[''] after:block after:pb-[100%] overflow-hidden"
              style={{ paddingBottom: "100%" }}
            >
              <ImageThumbnail imageSrc={feedImages[0].imageUrl} imageAlt={`${name}식당 ${feedId}리뷰 썸네일`} />
            </Link>
          </li>
        );
      })}
    </>
  );
}

export default FeedThumbnailList;
