import { ShopThumbData } from "../types/apiTypes";

const ShopThumb: React.FC<ShopThumbData> = ({ id, name, category, roadAddress, feedList }) => {
  console.log(feedList[0].thumbnailUrl);
  return (
    <div className="mt-2 w-full max-w-[640px] bg-gray-100 border rounded-sm px-1">
      <p className="font-bold text-base p-1">{name}</p>
      <p className="text-base p-1">{roadAddress}</p>
      {/* <p className="text-sm p-1">{category}</p> */}

      <div className="flex gap-1">
        {feedList.map((feed) => (
          <div className="flex w-1/3" key={feed.id}>
            <img
              src={feed.thumbnailUrl}
              alt="Feed thumbnail"
              className="w-full h-full object-cover border rounded cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopThumb;
