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
  const initialAuthorState: APIReplyListResponse["response"] = {
    nickName: "",
    profileImageUrl: null,
    content: "",
    createdAt: "",
    replyList: [],
  };

  const [author, setAuthor] = useState<APIReplyListResponse["response"]>(initialAuthorState);
  const [replies, setReplies] = useState<APIReplyListResponse["response"]["replyList"]>([]);
  const [newReply, setNewReply] = useState<string>("");
  const [isAuthorExpanded, setIsAuthorExpanded] = useState<boolean>(false);
  const [expandedReplies, setExpandedReplies] = useState<number[]>([]);

  useEffect(() => {
    getReplyList(Number(feedId)).then((data) => {
      console.log("[댓글 목록] :", data);
      setAuthor(data.response);
      setReplies(data.response.replyList);
    });
  }, [feedId]);

  const timeDifference = getTimeDiff(dayjs(author.createdAt));

  const handleSubmitReply = () => {
    if (newReply) {
      saveReply(Number(feedId), newReply).then((data) => {
        // Update the replies state with the new reply
        setReplies((prevReplies) => [...prevReplies, data.response]);
        setNewReply(""); // Clear the input
      });
    }
  };

  const handleDeleteReply = async (replyId: number) => {
    try {
      await deleteReply(replyId);
      setReplies((prevReplies) => prevReplies.filter((reply) => reply.id !== replyId));
    } catch (error) {
      console.error("Failed to delete the reply", error);
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6 pb-3 border-b">
          <div className="flex items-center">
            <div className="flex w-12 h-12 flex-shrink-0">
              {author.profileImageUrl ? (
                <Image
                  src={author.profileImageUrl}
                  alt="사용자 썸네일"
                  width={48}
                  height={48}
                  className="border p-1 rounded-full cursor-pointer"
                />
              ) : (
                <Image
                  src="/images/userImage.png"
                  alt="사용자 썸네일"
                  width={48}
                  height={48}
                  className="w-12 h-12 border p-1 rounded-full cursor-pointer"
                />
              )}
            </div>
            <div className="ml-2">
              <div className="flex justify-start items-center gap-3">
                <span className="font-bold">{author.nickName}</span>
                <span className="text-xs text-gray-500">{timeDifference}</span>
              </div>
              <div>
                {author.content.length > 60 && !isAuthorExpanded ? (
                  <>
                    {author.content.substring(0, 60) + "... "}
                    <button className="text-blue-500" onClick={() => setIsAuthorExpanded(true)}>
                      더보기
                    </button>
                  </>
                ) : (
                  <>
                    {author.content}
                    {isAuthorExpanded && (
                      <button className="text-blue-500" onClick={() => setIsAuthorExpanded(false)}>
                        접기
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {replies.map((reply) => {
          const timeDifference = getTimeDiff(dayjs(reply.createdAt));
          return (
            <div key={reply.id} className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="flex w-12 h-12 flex-shrink-0">
                  {reply.profileImageUrl ? (
                    <Image
                      src={reply.profileImageUrl}
                      alt="사용자 썸네일"
                      width={48}
                      height={48}
                      className="border p-1 rounded-full cursor-pointer"
                    />
                  ) : (
                    <Image
                      src="/images/userImage.png"
                      alt="사용자 썸네일"
                      width={48}
                      height={48}
                      className="w-12 h-12 border p-1 rounded-full cursor-pointer"
                    />
                  )}
                </div>
                <div className="ml-2">
                  <div className="flex justify-start items-center gap-3">
                    <span className="font-bold">{reply.nickName}</span>
                    <span className="text-xs text-gray-500">{timeDifference}</span>
                  </div>
                  <div className="text-sm">
                    {reply.content.length > 60 && !expandedReplies.includes(reply.id) ? (
                      <>
                        {reply.content.substring(0, 60) + "... "}
                        <button
                          className="text-blue-500"
                          onClick={() => setExpandedReplies((prev) => [...prev, reply.id])}
                        >
                          더보기
                        </button>
                      </>
                    ) : (
                      <>
                        <p className="text-sm">{reply.content}</p>
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
                <RiDeleteBin6Line
                  className="text-xl ml-3 mr-4 cursor-pointer"
                  onClick={() => handleDeleteReply(reply.id)}
                />
                <BsThreeDotsVertical className="text-xl mr-2" />
              </div>
            </div>
          );
        })}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitReply();
        }}
        className="flex items-center p-4  mt-auto"
      >
        <input
          className="flex-1 border rounded-l py-2 px-4 mr-2 h-10"
          type="text"
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          placeholder="댓글 작성..."
          maxLength={150}
        />
        <button
          type="submit"
          className={`flex items-center justify-center rounded-r bg-blue-500 w-10 h-10 ${
            !newReply ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-300"
          }`}
          disabled={!newReply}
        >
          <VscSend className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default Reply;
