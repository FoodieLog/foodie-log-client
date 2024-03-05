"use client";
import React, { useEffect, useState } from "react";
import { getApplyBadge, postApplyBadge } from "@services/settings";
import Header from "@components/Common/Header";
import { useToast } from "@/components/ui/use-toast";
import Button from "@components/Common/Button";

function SettingBadge() {
  const { toast } = useToast();
  const [isAlreadyApply, setIsAlreadyApply] = useState(false);

  const clickApplyBadgeHandler = async () => {
    try {
      await postApplyBadge();
      toast({ description: "뱃지 신청되었습니다!" });
    } catch (err) {
      toast({ description: "뱃지 신청을 실패했습니다. 다시 시도해주세요." });
    }
  };

  const checkApplyBadge = async () => {
    const res = await getApplyBadge();
    const isApply = res.data.response.flag === "Y";
    setIsAlreadyApply(isApply);
  };

  useEffect(() => {
    checkApplyBadge();
  }, []);

  return (
    <div className="w-full sm:max-w-[640px] leading-tight flex flex-col items-center text-gray-10 text-center">
      <Header title="" back="prePage" />
      <h4 className="mb-6 text-2xl font-semibold">푸디로그 뱃지 신청</h4>
      <p className="mb-5">
        당신의 <span className="text-base text-red">미식 본능을 증명</span>하세요!
      </p>
      <p className="mb-[22px]">
        이 뱃지는 당신이 진정한 <span className="text-red">맛집 탐험가</span>임<br />을 증명하는 인증서입니다!
      </p>
      <p className="mb-[22px]">
        맛집을 열심히 탐방하고, 사진과 후기를 많이 게시하고,
        <br /> 좋아요를 많이 받으면 미식(추후)뱃지를 얻을 수 있어요.
      </p>
      <p className="text-gray-3 mb-[26px]">
        뱃지 신청을 제출한다고 해서 뱃지가 보장
        <br />
        되는 것은 아닙니다.
      </p>
      <p className="text-sm font-semibold mb-[306px]">뱃지를 신청하시겠습니까?</p>
      <div className="px-5 w-full">
        {isAlreadyApply ? (
          <Button type="button" disabled>
            신청 완료
          </Button>
        ) : (
          <Button type="button" variant="primary" onClick={clickApplyBadgeHandler}>
            뱃지 신청
          </Button>
        )}
      </div>
    </div>
  );
}

export default SettingBadge;
