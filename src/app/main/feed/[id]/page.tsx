import BackButtonMain from '@/src/components/Button/BackButtonMain';
import Feeds from '@/src/components/Feed/Feeds';

interface userFeedListProps {
  params: {
    id: string;
  };
}

const userFeedList = ({ params: { id } }: userFeedListProps) => {
  const userId = id
  return (
    <div className='w-full max-w-6xl mx-auto'>
      <BackButtonMain />
      <Feeds id={userId} />
    </div>
  )
}

export default userFeedList
