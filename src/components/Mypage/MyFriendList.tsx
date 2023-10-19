"use client";

import Image from "next/image";
import Link from "next/link";
import { followUser, unfollowUser } from "@/src/services/apiFeed";
import { MyFriendListProps } from "@/src/types/mypage";

function MyFriendList({ data, friendListTitle, reload, setReload, updateFollow, updateFollower }: MyFriendListProps) {
  const onClickFollowing = async (e: React.MouseEvent<HTMLButtonElement>, Id: number) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const res = await unfollowUser(Id);
      setReload(!reload);
      if (friendListTitle === "팔로우") {
        updateFollow();
      } else {
        updateFollower();
      }
    } catch (err) {
      console.log("언팔 에러", err);
    }
  };

  const onClickFollow = async (e: React.MouseEvent<HTMLButtonElement>, Id: number) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const res = await followUser(Id);
      setReload(!reload);
      if (friendListTitle === "팔로우") {
        updateFollow();
      } else {
        updateFollower();
      }
    } catch (err) {
      console.log("팔 에러", err);
    }
  };

  return (
    <section className="flex flex-col items-center p-5 gap-5">
      <h3>{friendListTitle}</h3>
      {data.length > 0 ? (
        <ul className="w-full">
          {data.map((item) => (
            <li key={item.userId} className=" w-full mb-3 flex justify-between ">
              <Link href={`/main/${item.userId}`} className="flex items-center gap-3 overflow-hidden">
                <div className="relative w-[30px] h-[30px] flex flex-col  justify-center items-center text-center rounded-lg overflow-hidden">
                  <Image
                    width={30}
                    height={30}
                    src={item.profileImageUrl || "/images/userImage.png"}
                    alt={item.nickName}
                  />
                </div>
                <span>{item.nickName}</span>
              </Link>

              {item.followed ? (
                <button
                  type="button"
                  onClick={(e) => onClickFollowing(e, item.userId)}
                  className="px-2 border border-gray-300 text-sm rounded-md cursor-pointer"
                >
                  팔로잉
                </button>
              ) : (
                <button
                  type="button"
                  onClick={(e) => onClickFollow(e, item.userId)}
                  className="px-2 bg-mint text-white text-sm rounded-md cursor-pointer"
                >
                  팔로우
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>데이터가 없습니다.</p>
      )}
    </section>
  );
}

export default MyFriendList;
