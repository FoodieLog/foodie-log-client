import PushToggle from "@/src/components/Settings/PushToggle";
import SettingListItem from "@components/Settings/SettingListItem";
import { NOTICE_CATEGORY } from "@constants";

function SettingNotice() {
  return (
    <ul className="border-b-4 border-gray-1">
      <SettingListItem text="알림" icon={false}>
        <div className="ml-[auto] flex items-center">
          <PushToggle type="All" />
        </div>
      </SettingListItem>
      {["replyFlag", "likeFlag", "followFlag"].map((value) => (
        <SettingListItem key={value} text={NOTICE_CATEGORY[value]} icon={false} className="font-medium border-none">
          <div className="ml-[auto] flex items-center ">
            <PushToggle type={value} />
          </div>
        </SettingListItem>
      ))}
    </ul>
  );
}

export default SettingNotice;
