import { getTimeDiff } from "@utils/date";
import dayjs from "dayjs";

interface TimeStampProps {
  createdAt: string | Date;
  styles?: string;
}

function TimeStamp({ createdAt, styles }: TimeStampProps) {
  const timeDifference = getTimeDiff(dayjs(createdAt));
  return (
    <div className={`${styles} w-fit px-1 text-center text-[12px] text-gray-4 bg-gray-1 rounded-[4px]`}>
      <span>{timeDifference}</span>
    </div>
  );
}

export default TimeStamp;
