"use client";

import { useState, useEffect } from "react";
import BackButtonMain from "@/src/components/Button/BackButtonMain";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { PiUserCircleBold } from "react-icons/pi";
import { VscSend } from "react-icons/vsc";
import Image from "next/image";
import { getTimeDiff } from "@/src/utils/date";
import { APIReplyListResponse, getReplyList, saveReply, deleteReply, reportReply } from "@/src/services/apiFeed";
import dayjs from "dayjs";

interface ReplyListProps {
  id: string;
}

const Reply: React.FC<ReplyListProps> = ({ id: feedId }) => {
  const [replies, setReplies] = useState<APIReplyListResponse["response"]["replyList"]>([]);
  const [newReply, setNewReply] = useState<string>("");
  const [expandedReplies, setExpandedReplies] = useState<number[]>([]);

  useEffect(() => {
    getReplyList(Number(feedId)).then((data) => {
      setReplies(data.response.replyList);
    });
  }, [feedId]);

  const handleSubmitReply = () => {
    if (newReply) {
      saveReply(Number(feedId), newReply).then((data) => {
        // Update the replies state with the new reply
        setReplies((prevReplies) => [...prevReplies, data.response]);
        setNewReply(""); // Clear the input
      });
    }
  };

  return (
    <div className="w-full flex flex-col">
      <BackButtonMain />
      <div className="p-4">
        {replies.map((reply) => {
          const timeDifference = getTimeDiff(dayjs(reply.createdAt));
          return (
            <div key={reply.id} className="flex items-center justify-between mt-4 mb-4">
              <div className="flex items-center">
                <div className="relative w-12 h-12 mr-4">
                  {reply.profileImageUrl ? (
                    <Image
                      fill={true}
                      src={reply.profileImageUrl}
                      alt="사용자 썸네일"
                      className="w-12 h-12 border p-1 rounded-full cursor-pointer"
                    />
                  ) : (
                    <PiUserCircleBold className="w-12 h-12 text-zinc-500" />
                  )}
                </div>
                <div>
                  <div className="flex justify-between">
                    <span className="font-bold">{reply.nickName}</span>
                    <span className="text-sm text-gray-500">{timeDifference}</span>
                  </div>
                  <div>
                    {reply.content.length > 40 && !expandedReplies.includes(reply.id) ? (
                      <>
                        {reply.content.substring(0, 40) + "... "}
                        <button
                          className="text-blue-500"
                          onClick={() => setExpandedReplies((prev) => [...prev, reply.id])}
                        >
                          더보기
                        </button>
                      </>
                    ) : (
                      <>
                        {reply.content}
                        {expandedReplies.includes(reply.id) && (
                          <button
                            className="text-blue-500"
                            onClick={() => setExpandedReplies((prev) => prev.filter((id) => id !== reply.id))}
                          >
                            접기
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <RiDeleteBin6Line className="text-xl mr-2" />
                <BsThreeDotsVertical className="text-xl" />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center p-4 border-t mt-auto">
        <input
          className="flex-1 border rounded-l py-2 px-4 mr-2"
          type="text"
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          placeholder="댓글 작성..."
          maxLength={150}
        />
        <button
          className={`rounded-r bg-blue-500 p-2 ${!newReply ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-300"}`}
          onClick={handleSubmitReply}
          disabled={!newReply}
        >
          <VscSend className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default Reply;
