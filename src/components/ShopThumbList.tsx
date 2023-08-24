import ShopThumb from './ShopThumb';
import { useState, useEffect } from 'react';
import { faker } from "@faker-js/faker";

const ShopThumbList = () => {
  const [dummyShopData, setDummyShopData] = useState<any[]>([]);

  useEffect(() => {
    const DUMMY_DATA = [...Array(10)].map((_, i) => ({
      id: faker.number.int({ max: 1000000 }),
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

    setDummyShopData(DUMMY_DATA);
  }, []);

  return (
    <div className="w-full flex flex-col items-center p-1 max-w-[640px]">
      {dummyShopData.map((shopData) => (
        <ShopThumb key={shopData.id} {...shopData} />
      ))}
    </div>
  );
};

export default ShopThumbList;
