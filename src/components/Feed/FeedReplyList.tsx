"use client";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { VscSend } from "react-icons/vsc";
import { getTimeDiff } from "@utils/date";
import { getReplyList, saveReply, deleteReply } from "@services/apiFeed";
import { useUserStore } from "@store/useUserStore";
import { ReplyListProps } from "@@types/feed";
import { APIReplyListResponse } from "@@types/reply";
import { useToast } from "@/components/ui/use-toast";
import ReplyItem from "@components/Feed/ReplyItem";

const FeedReplyList: React.FC<ReplyListProps> = ({ id: feedId }) => {
  const initialAuthorState: APIReplyListResponse["response"] = {
    userId: 0,
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
  const id = useUserStore((state) => state.user.id);
  const { toast } = useToast();

  useEffect(() => {
    getReplyList(Number(feedId)).then((data) => {
      setAuthor(data.response);
      setReplies(data.response.replyList);
    });
  }, [feedId]);

  const timeDifference = getTimeDiff(dayjs(author.createdAt));

  const submitReplyHandler = () => {
    if (newReply) {
      saveReply(Number(feedId), newReply).then((data) => {
        // FIXME : saveReply 응답값에 userId가 없어서 임시로 0으로 설정
        setReplies((prevReplies) => [...prevReplies, { ...data.response, userId: 0 }]);
        setNewReply(""); // Clear the input
      });
    }
  };

  const deleteReplyHandler = async (replyId: number) => {
    try {
      await deleteReply(replyId);
      setReplies((prevReplies) => prevReplies.filter((reply) => reply.id !== replyId));
    } catch (error) {
      toast({ title: "삭제 오류 발생", description: "처리 중에 오류가 발생하였습니다." });
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6 pb-3 border-b">
          <div className="flex items-center">
            <Link
              href={author.userId === id ? `/main/mypage` : `/main/${author.userId}`}
              className="flex w-12 h-12 flex-shrink-0"
            >
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
            </Link>
            <div className="ml-2">
              <div className="flex justify-start items-center gap-3">
                <Link href={author.userId === id ? `/main/mypage` : `/main/${author.userId}`}>
                  <span className="font-bold">{author.nickName}</span>
                </Link>
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
        <ul>
          {replies.map((reply) => {
            return (
              <ReplyItem key={reply.id} reply={reply} userId={author.userId} deleteReplyHandler={deleteReplyHandler} />
            );
          })}
        </ul>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitReplyHandler();
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

export default FeedReplyList;
