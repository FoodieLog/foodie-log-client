"use client";
import Image from "next/image";
import Link from "next/link";
import Drawer from "@components/Common/Drawer/Drawer";
import FollowButton from "@components/Common/Button/FollowButton";
import { ListData } from "@@types/mypage";

export interface MyFriendListProps {
  data: ListData[];
  object: string;
  isOpener: boolean;
  setIsOpener: React.Dispatch<React.SetStateAction<boolean>>;
}

function MyFriendList({ data, object, isOpener, setIsOpener }: MyFriendListProps) {
  return (
    <Drawer openControlers={{ isOpener, setIsOpener }} closedHeight={0} backgroundDarker>
      <section className="flex flex-col items-center p-5 gap-5 bg-white">
        <h3>{object}</h3>
        {data?.length > 0 ? (
          <ul className="w-full">
            {data.map((user) => (
              <li key={user.userId} className=" w-full mb-3 flex justify-between ">
                <Link href={`/main/${user.userId}`} className="flex items-center gap-3 overflow-hidden">
                  <div className="relative w-[30px] h-[30px] flex flex-col  justify-center items-center text-center rounded-lg overflow-hidden">
                    <Image
                      width={30}
                      height={30}
                      src={user.profileImageUrl || "/images/userImage.png"}
                      alt={user.nickName}
                    />
                  </div>
                  <span>{user.nickName}</span>
                </Link>
                <FollowButton isFollowed={user.followed} userId={user.userId} className={"w-16 text-sm"} />
              </li>
            ))}
          </ul>
        ) : (
          <p>데이터가 없습니다.</p>
        )}
      </section>
    </Drawer>
  );
}

export default MyFriendList;
