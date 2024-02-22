import BackButtonMain from "@/src/components/Common/Button/BackButtonMain";
import FeedReplyList from "@/src/components/Feed/FeedReplyList";

interface ReplyProps {
  params: {
    id: string;
  };
}

const reply = ({ params: { id } }: ReplyProps) => {
  return (
    <div className="w-full flex flex-col justify-center max-w-screen-sm mx-auto">
      <BackButtonMain />
      <FeedReplyList id={id} />
    </div>
  );
};

export default reply;
