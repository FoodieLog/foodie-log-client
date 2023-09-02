import BackButtonMain from '@/src/components/Button/BackButtonMain';
import ReplyList from "@/src/components/Feed/replyList";

interface ReplyProps {
  params: {
    id: string;
  };
}

const reply = ({ params: { id } }: ReplyProps) => {
  return (
    <div>
      <BackButtonMain />
      <ReplyList id={id} />
    </div>
  );
};

export default reply;
