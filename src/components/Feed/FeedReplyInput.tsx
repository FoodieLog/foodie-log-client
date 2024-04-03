import { KeyboardEvent, useEffect, useRef, useState } from "react";
import useReplyMutation from "@hooks/mutations/useReplyMutation";
import UserThumbImg from "@components/Common/Profile/UserThumbImg";
import { useUserStore } from "@store/useUserStore";
import { MentionsInput, Mention, SuggestionDataItem } from "react-mentions";
import useSearchUser from "@hooks/queries/useSearchUser";
import MentionItem from "@components/Feed/MentionItem";
import { MentionUserType, PostReplyType } from "@@types/reply";
import { SendAble, SendDisAble } from "@assets/icons";

interface FeedReplyInputProps {
  feedId: number;
  replyParentNum: number | null;
  setReplyParentNum: React.Dispatch<React.SetStateAction<number | null>>;
}

function FeedReplyInput({ feedId, replyParentNum, setReplyParentNum }: FeedReplyInputProps) {
  const [reply, setReply] = useState("");
  const focusRef = useRef<HTMLTextAreaElement>(null);
  const [mentionedIds, setMentionedIds] = useState<number[]>([]);
  const { postReplyMutation } = useReplyMutation(feedId);
  const { data: searchUserList } = useSearchUser();

  const {
    user: { nickName, profileImageUrl },
  } = useUserStore();

  const createFormatReply = () => {
    const splitedReply = reply.split(" ");
    const nicknameReg = /([A-Za-z가-힣0-9]+)/g;
    const newContent = splitedReply.map((reply) => {
      if (reply.includes("@")) {
        const mentionedNickname = reply.match(nicknameReg)?.[0];
        return `@${mentionedNickname}`;
      }
      return reply;
    });
    return newContent.join(" ");
  };

  const submitReply = () => {
    if (!reply) return;

    const filteredMentionedIds = mentionedIds.filter(
      (id, idx) => reply.includes(`(${id})`) && mentionedIds.indexOf(id) === idx
    );

    const newContent = createFormatReply();

    const replyContent: PostReplyType = {
      content: newContent,
      mentionedIds: filteredMentionedIds,
      parentId: replyParentNum,
    };

    postReplyMutation.mutate(replyContent);
    setReply("");
  };

  const inputReplyHandler = (event: { target: { value: string } }) => {
    setReply(event.target.value);
  };

  const inputKeyDownHandler = (e: KeyboardEvent<HTMLTextAreaElement> | KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!e.shiftKey) {
        e.preventDefault();
        submitReply();
        setReplyParentNum(null);
      }
    }
  };

  const clickSubmitReplyHandler = () => {
    submitReply();
    setReplyParentNum(null);
  };

  const mentionDisplayTransform = (id: string | number, display: string) => {
    return "@" + display;
  };

  const addMentionHandler = (id: string | number) => {
    setMentionedIds((prevIds) => [...prevIds, Number(id)]);
  };

  const renderSuggestion = (suggestion: SuggestionDataItem): React.ReactNode => {
    if (!searchUserList) return;
    const targetUser: MentionUserType | undefined = searchUserList.find(
      (user: MentionUserType) => user.id === suggestion.id
    );
    if (!targetUser) return;
    return <MentionItem user={targetUser} />;
  };

  const blurInputHandler = () => {
    if (focusRef.current) {
      focusRef.current.blur();
    }
  };

  useEffect(() => {
    if (replyParentNum && focusRef.current) focusRef.current.focus();
  }, [replyParentNum]);

  return (
    <form className="flex px-2 py-1.5 border-y fixed bottom-0 w-full bg-gray-0">
      <div className="w-[42px] h-[42px]">
        <UserThumbImg src={profileImageUrl} alt={`${nickName} 프로필 이미지`} customWidth={42} customHeight={42} />
      </div>
      <MentionsInput
        value={reply}
        inputRef={focusRef}
        onChange={inputReplyHandler}
        onKeyPress={inputKeyDownHandler}
        onBlur={blurInputHandler}
        maxLength={150}
        placeholder="댓글 달기"
        className="mentions"
        forceSuggestionsAboveCursor
        a11ySuggestionsListLabel="User suggestions"
      >
        <Mention
          appendSpaceOnAdd
          trigger="@"
          data={searchUserList?.map((user: MentionUserType) => ({ id: user.id, display: user.nickName })) || []}
          renderSuggestion={renderSuggestion}
          displayTransform={mentionDisplayTransform}
          onAdd={addMentionHandler}
          className="mentions__mention"
        />
      </MentionsInput>
      <button
        type="button"
        disabled={reply.length ? false : true}
        className="ml-auto"
        onClick={clickSubmitReplyHandler}
      >
        {reply.length ? <SendAble /> : <SendDisAble />}
      </button>
    </form>
  );
}

export default FeedReplyInput;
