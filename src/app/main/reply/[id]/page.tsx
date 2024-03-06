import Header from "@components/Common/Header";
import FeedReplyList from "@components/Feed/FeedReplyList";

interface ReplyProps {
  params: {
    id: string;
  };
}

const reply = ({ params: { id } }: ReplyProps) => {
  return (
    <div className="w-full flex flex-col justify-center max-w-screen-sm mx-auto">
      <Header title="댓글" back="prePage" />
      <FeedReplyList id={id} />
    </div>
  );
};

export default reply;
