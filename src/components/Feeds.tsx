"use client";

import { faker } from "@faker-js/faker";
import Feed from "./Feed";
import { useEffect, useState } from "react";
import { FeedData } from '../types/apiTypes';

const Feeds = () => {
  const [dummyFeedsData, setDummyFeedsData] = useState<FeedData[]>([]);
  useEffect(() => {
    const DUMMY_DATA = [...Array(10)].map((_, i) => ({
      feed: {
        id: faker.number.int({ max: 1000000 }),
        nickName: faker.person.firstName(),
        profileImageUrl: faker.image.avatar(),
        createdAt: faker.date.recent(),
        updateAt: faker.date.recent(),
        feedImages: [
          {
            ImageUrl: faker.image.urlPicsumPhotos(),
          },
          {
            ImageUrl: faker.image.urlPicsumPhotos(),
          },
          {
            ImageUrl: faker.image.urlPicsumPhotos(),
          },
        ],
        content: faker.lorem.paragraph(2),
        likeCount: faker.number.int({ max: 1000 }), //좋아요 개수
        replyCount: faker.number.int({ max: 5 }), //댓글 개수
        share: "URL",
      },
      restaurant: {
        id: faker.number.int({ max: 1000 }),
        name: faker.company.name(),
        category: faker.commerce.department(),
        link: faker.internet.url(),
        roadAddress: faker.location.streetAddress(),
      },
      isFollowed: faker.datatype.boolean(),
      isLiked: faker.datatype.boolean(), //좋아요
    }));

    setDummyFeedsData(DUMMY_DATA);
  }, []);

  return (
    <div className="flex flex-col items-center">
      {dummyFeedsData.map((feedData, index) => (
        <Feed key={index} {...feedData} />
      ))}
    </div>
  );
};

export default Feeds;
