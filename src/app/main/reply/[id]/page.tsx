import BackButtonMain from "@/src/components/Common/Button/BackButtonMain";
import ReplyList from "@/src/components/Feed/replyList";

interface ReplyProps {
  params: {
    id: string;
  };
}

const reply = ({ params: { id } }: ReplyProps) => {
  return (
    <div className="w-full flex flex-col justify-center max-w-screen-sm mx-auto">
      <BackButtonMain />
      <ReplyList id={id} />
    </div>
  );
};

export default reply;
