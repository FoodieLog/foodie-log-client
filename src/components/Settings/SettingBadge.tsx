"use client";
import React from "react";
import { applyBadge } from "../../services/settings";

function SettingBadge() {
  const onClick = async () => {
    try {
      const res = await applyBadge();
      console.log("뱃지 성공", res);
    } catch (err) {
      console.log("벳지 에러", err);
    }
  };
  return (
    <div className="sm:w-[600px]">
      <h4 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        푸디로그 뱃지 신청
      </h4>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
        당신의 미식 본능을 증명하세요! 맛집을 열심히 탐방하고, 사진과 후기를 많이 게시하고, 좋아요를 많이 받으면
        미식(추후)뱃지를 얻을 수 있어요. 이 뱃지는 당신이 진정한 맛집 탐험가임을 증명하는 인증서입니다! <br />
        <br />
        뱃지 신청을 제출한다고 해서 뱃지가 보장되는 것은 아닙니다.
        <br />
        뱃지를 신청하시겠습니까?
      </p>
      <div className="mt-10">
        <button
          onClick={onClick}
          className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        >
          뱃지 신청
          <svg
            className="ml-1"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default SettingBadge;
