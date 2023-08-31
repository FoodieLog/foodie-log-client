import { faker } from "@faker-js/faker";

export const generateFeedDummyData = () => {
  return [...Array(10)].map((_, i) => ({
    feed: {
      id: faker.number.int({ max: 5 }),
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
      likeCount: faker.number.int({ max: 1000 }),
      replyCount: faker.number.int({ max: 5 }),
      share: "URL",
    },
    restaurant: {
      id: faker.number.int({ max: 5 }),
      name: faker.company.name(),
      category: faker.commerce.department(),
      link: faker.internet.url(),
      roadAddress: faker.location.streetAddress(),
    },
    isFollowed: faker.datatype.boolean(),
    isLiked: faker.datatype.boolean(),
  }));
};


export const generateShopDummyData = () => {
  return [...Array(10)].map((_, i) => ({
    id: faker.number.int({ max: 5 }),
    name: faker.company.name(),
    category: faker.commerce.department(),
    roadAddress: faker.location.streetAddress(),
    feedList: [
      {
        id: faker.number.int({ max: 1000000 }),
        thumbnailUrl: faker.image.urlPicsumPhotos(),
      },
      {
        id: faker.number.int({ max: 1000000 }),
        thumbnailUrl: faker.image.urlPicsumPhotos(),
      },
      {
        id: faker.number.int({ max: 1000000 }),
        thumbnailUrl: faker.image.urlPicsumPhotos(),
      },
    ]
  }));
};

export const generateRestaurantDetailDummyData = () => {
  return {
    name: faker.company.name(),
    category: faker.commerce.department(),
    link: faker.internet.url(),
    roadAddress: faker.location.streetAddress(),
    location: {
      mapy: faker.location.latitude({ min: 126.5, max: 127.5, precision: 6 }),
      mapx: faker.location.longitude({ min: 37, max: 38, precision: 6 }),
    },
    isLiked: faker.datatype.boolean(),
    like_id: faker.number.int({ max: 1000000 }),
    content: generateFeedDummyData(),
  };
};