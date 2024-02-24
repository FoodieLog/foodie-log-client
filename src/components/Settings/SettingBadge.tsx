"use client";
import React from "react";
import { postApplyBadge } from "@services/settings";
import { StarSvg } from "@assets/svgs";
import Header from "@components/Common/Header";
import { useToast } from "@/components/ui/use-toast";

function SettingBadge() {
  const { toast } = useToast();

  const clickApplyBadgeHandler = async () => {
    try {
      await postApplyBadge();
      toast({ description: "뱃지 신청되었습니다!" });
    } catch (err) {
      toast({ description: "뱃지 신청을 실패했습니다. 다시 시도해주세요." });
    }
  };
  return (
    <div className="w-full sm:max-w-[640px] mx-auto flex flex-col space-y-10">
      <Header title="" type="" back="prePage" />
      <div className="px-10">
        <h4 className="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white">
          푸디로그 뱃지 신청
        </h4>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          당신의 미식 본능을 증명하세요! <br />
          맛집을 열심히 탐방하고, 사진과 후기를 많이 게시하고, 좋아요를 많이 받으면 미식 뱃지를 얻을 수 있어요. 이
          뱃지는 당신이 진정한 맛집 탐험가임을 증명하는 인증서입니다! <br />
          <br />
          뱃지 신청을 제출한다고 해서 뱃지가 보장되는 것은 아닙니다.
          <br />
          뱃지를 신청하시겠습니까?
        </p>
        <div className="mt-10">
          <button
            onClick={clickApplyBadgeHandler}
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
          >
            뱃지 신청
            <div className="ml-3">
              <StarSvg width="15" height="15" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingBadge;
