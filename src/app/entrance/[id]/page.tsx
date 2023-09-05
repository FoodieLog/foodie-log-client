import FeedShared from '@/src/components/Feed/FeedShared';


interface feedSharedProps {
  params: {
    id: string;
  };
}

const feedShared = ({ params: { id } }: feedSharedProps) => {
  const feedId = id
  return (
    <div>
      <FeedShared Id={feedId} />
    </div>
  );
};

export default feedShared;
