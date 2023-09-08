"use client";

import Feed from "./Feed";
import { useEffect, useState } from "react";
import { getFeedList, getFeedListByUserId, Content } from "@/src/services/apiFeed";

type FeedsProps = {
  id?: number; 
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
  }, [id]); 

  const updateFollowStatus = (userId: number, newStatus: boolean) => {
    setFeedsData((prevData) => {
      return prevData.map((content) => {
        if (content.feed.userId === userId) {
          return { ...content, followed: newStatus };
        }
        return content;
      });
    });
  };

  return (
    <div className="flex flex-col items-center">
      {feedsData.map((content, index) => (
        <Feed
          key={index}
          feed={content.feed}
          restaurant={content.restaurant}
          isFollowed={content.followed}
          isLiked={content.liked}
          updateFollowStatus={updateFollowStatus}
        />
      ))}
    </div>
  );
};

export default Feeds;
