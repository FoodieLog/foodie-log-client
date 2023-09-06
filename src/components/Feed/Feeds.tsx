"use client";

import Feed from "./Feed";
import { useEffect, useState } from "react";
import { getFeedList, getFeedListByUserId, Content } from "@/src/services/apiFeed";

type FeedsProps = {
  id?: string; // id는 선택적인 props로 선언합니다.
}

const Feeds: React.FC<FeedsProps> = ({ id }) => {
  const [feedsData, setFeedsData] = useState<Content[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const feedId = 0;
        const pageSize = 15;
        const pageNumber = 0;
        
        let response;

        if (id) {
          response = await getFeedListByUserId(Number(id), feedId, pageSize, pageNumber);
        } else {
          response = await getFeedList(feedId, pageSize, pageNumber);
        }
        
        console.log("[getFeedList]: ", response);
        if (response.status === 200) {
          console.log("response.response.content", response.response.content);
          setFeedsData(response.response.content);
        }
      } catch (error) {
        console.error("Failed to fetch feed data:", error);
      }
    }

    fetchData();
  }, [id]); // useEffect가 id에 의존하도록 수정하였습니다.

  return (
    <div className="flex flex-col items-center">
      {feedsData.map((content, index) => (
        <Feed
          key={index}
          feed={content.feed}
          restaurant={content.restaurant}
          isFollowed={content.followed}
          isLiked={content.liked}
        />
      ))}
    </div>
  );
};

export default Feeds;
