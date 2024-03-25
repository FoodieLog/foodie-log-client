import React from "react";
import UserThumbImg from "@components/Common/Profile/UserThumbImg";
import { MentionUserType } from "@@types/reply";

interface MentionItemProps {
  user: MentionUserType;
}

function MentionItem({ user }: MentionItemProps) {
  return (
    <div className="flex px-5 py-3">
      <div className="w-12 h-12 flex mr-3">
        <UserThumbImg src={user.profileImageUrl} />
      </div>
      <div className="flex flex-col items-start mt-[7px]">
        <span className="font-semibold text-gray-10">{user.nickName}</span>
        <span className="text-sm text-gray-3 overflow-ellipsis">{user.aboutMe}</span>
      </div>
    </div>
  );
}

export default MentionItem;
