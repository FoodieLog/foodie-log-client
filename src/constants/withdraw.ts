import { WithDrawReasonType } from "@@types/settings";

export const withdrawReasonList: WithDrawReasonType[] = [
  { id: "UNSATISFACTORY_SUPPORT", reason: "고객 지원이 만족스럽지 않아서" },
  {
    id: "INFREQUENTLY_USED",
    reason: "자주 이용하지 않아서",
  },
  {
    id: "USE_OTHER_SITES",
    reason: "비슷한 타 사이트를 이용하기 위해서",
  },
  {
    id: "ADVERTISEMENT",
    reason: "광고가 많아서",
  },
  {
    id: "ETC",
    reason: "기타",
  },
];
