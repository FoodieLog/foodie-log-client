import { Dispatch, SetStateAction, useState } from "react";
import { saveReply } from "@services/apiFeed";
import { APIReplyListResponse } from "@@types/reply";

interface FeedReplyInputProps {
  feedId: string;
  setReplies: Dispatch<SetStateAction<APIReplyListResponse["response"]["replyList"]>>;
}

function FeedReplyInput({ feedId, setReplies }: FeedReplyInputProps) {
  const [newReply, setNewReply] = useState<string>("");

  const submitReplyHandler = () => {
    if (newReply) {
      saveReply(Number(feedId), newReply).then((data) => {
        // FIXME : saveReply 응답값에 userId가 없어서 임시로 0으로 설정
        setReplies((prevReplies) => [...prevReplies, { ...data.response, userId: 0 }]);
        setNewReply("");
      });
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitReplyHandler();
      }}
      className="flex items-center"
    >
      <input
        className="flex-1 border-b rounded-l px-4 h-10"
        type="text"
        value={newReply}
        onChange={(e) => setNewReply(e.target.value)}
        placeholder="댓글을 입력하세요!"
        maxLength={150}
      />
      <button type="submit" disabled={!newReply}></button>
    </form>
  );
}

export default FeedReplyInput;
