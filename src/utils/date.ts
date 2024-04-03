import dayjs, { Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

export const getTimeDiff = (timeToCompare: Dayjs): string => {
  const now = dayjs();
  const diff = now.diff(timeToCompare);
  const diffDuration = dayjs.duration(diff);
  const days = diffDuration.days();
  const hours = diffDuration.hours();
  const minutes = diffDuration.minutes();
  const seconds = diffDuration.seconds();

  if (days > 0) {
    return `${days}일 전`;
  }
  if (hours > 0) {
    return `${hours}시간 전`;
  }
  if (minutes > 0) {
    return `${minutes}분 전`;
  }
  if (seconds > 0) {
    return `${seconds}초 전`;
  }
  return "방금 전";
};

// 새로 발급받은 accessToken의 만료 시간을 29분 후로 설정
export const minutesInMilliseconds = 1000 * 60 * 25;
