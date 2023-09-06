import BackButtonMain from "@/src/components/Common/Button/BackButtonMain";
import Feeds from "@/src/components/Feed/Feeds";

interface userFeedListProps {
  params: {
    id: string;
  };
}

const userFeedList = ({ params: { id } }: userFeedListProps) => {
  const userId = id;
  return (
    <div>
      <BackButtonMain />
      <Feeds id={userId} />
    </div>
  );
};

export default userFeedList;
