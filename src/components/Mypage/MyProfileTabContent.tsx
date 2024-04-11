import * as Tabs from "@radix-ui/react-tabs";
import MyMap from "@components/Mypage/MyMap";
import MyFeedThumbnail from "@components/Mypage/MyFeedThumbnail";

interface MyFeedTabProps {
  userId: number;
}

function MyProfileTabContent({ userId }: MyFeedTabProps) {
  const tabTriggerStyles =
    "w-full py-2.5 bg-white flex items-center justify-center text-base text-semibold leading-none text-gray-4 select-none hover:text-red data-[state=active]:text-red data-[state=active]:border-b-2 data-[state=active]:border-red outline-none cursor-default";

  return (
    <Tabs.Root defaultValue="feed" className="px-4">
      <Tabs.List className="w-full flex mb-1">
        <Tabs.Trigger className={tabTriggerStyles} value="feed">
          피드
        </Tabs.Trigger>
        <Tabs.Trigger className={tabTriggerStyles} value="map">
          지도
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content className="overflow-y-auto" style={{ height: window.innerHeight - 370 }} value="feed">
        <MyFeedThumbnail userId={userId} />
      </Tabs.Content>
      <Tabs.Content value="map">
        <MyMap userId={userId} />
      </Tabs.Content>
    </Tabs.Root>
  );
}

export default MyProfileTabContent;
