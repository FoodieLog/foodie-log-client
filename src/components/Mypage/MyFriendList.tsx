"use client";
import Image from "next/image";
import Link from "next/link";
import Drawer from "@components/Common/Drawer/Drawer";
import FollowButton from "@components/Common/Button/FollowButton";
import { ListData } from "@@types/mypage";

export interface MyFriendListProps {
  data: ListData[];
  object: string;
  setShowFriendList: React.Dispatch<React.SetStateAction<boolean>>;
}

function MyFriendList({ data, object, setShowFriendList }: MyFriendListProps) {
  const clickBgToClose = (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
    if (setShowFriendList && e.target === e.currentTarget) {
      setShowFriendList((prev: boolean) => !prev);
    }
  };

  return (
    <div
      onClick={clickBgToClose}
      className="bg-gray-300 bg-opacity-50 fixed w-screen h-screen flex justify-center items-center top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full"
    >
      <Drawer>
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
                  <FollowButton isFollowed={user.followed} userId={user.userId} className={"w-[64px] text-[14px]"} />
                </li>
              ))}
            </ul>
          ) : (
            <p>데이터가 없습니다.</p>
          )}
        </section>
      </Drawer>
    </div>
  );
}

export default MyFriendList;
