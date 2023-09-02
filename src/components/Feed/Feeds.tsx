"use client";

import Feed from "./Feed";
import { useEffect, useState } from "react";
import { getFeedList, Content } from "@/src/services/apiFeed";

const Feeds = () => {
  const [feedsData, setFeedsData] = useState<Content[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getFeedList(0, 15, 0); // You can change these values as per your needs
        console.log("response", response);
        if (response.status === 200) {
          console.log("response.response.content", response.response.content);
          setFeedsData(response.response.content);
        }
      } catch (error) {
        console.error("Failed to fetch feed data:", error);
      }
    }

    fetchData();
  }, []);

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
