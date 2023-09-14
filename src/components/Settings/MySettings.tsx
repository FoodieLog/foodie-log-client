"use client";
import React, { useEffect, useState } from "react";
import { useUserStore } from "../../store/useUserStore";
import { LiaAngleLeftSolid } from "react-icons/lia";
import { useRouter } from "next/navigation";
import { logOut } from "../../services/settings";
import { BadgeSvg, ChangeSvg, NotificationSvg, OutSvg, WarningSvg } from "../../assets/svgs";
import SettingModal from "./SettingModal";
import Toggle from "../Common/Toggle";
import Header from "../Common/Header";
import Logout from '@/src/services/Logout';

function MySettings() {
  const [isClient, setIsClient] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const nickName = useUserStore((state) => state.user.nickName);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onClickBadge = () => {
    router.push("/main/settings/badge");
  };

  const onClickPassword = () => {
    router.push("/main/settings/password");
  };

  const onClickWithdraw = () => {
    setShowModal(true);
  };
  const onClickLogOut = async () => {
    if (!confirm("로그아웃하시겠습니까?")) {
      return;
    }
    try {
  
      Logout();
    } catch (error) {
      console.log("로그아웃 실패", error);
    }
  };

  return (
    <div className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
      <div className="flex flex-col w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
        <div className="divide-y">
          <div className=" flex flex-col items-center justify-center space-y-5 mb-5">
            <Header title="설정 및 개인정보" type="arrow" back="prePage" />
            {isClient && <h5 className="pl-5 text-lg font-medium text-gray-900 dark:text-white">{nickName}</h5>}
          </div>

          <div className="group relative flex gap-x-6 items-center justify-between rounded-lg p-4 hover:bg-gray-50">
            <div className="flex items-center gap-x-6">
              <div className="mt-1 flex items-center justify-center">
                <NotificationSvg width="18" height="18" className="text-gray-600 group-hover:text-indigo-600" />
              </div>
              <div className="font-semibold text-gray-900">알림</div>
            </div>
            <div className="flex items-center mr-5">
              <Toggle />
            </div>
          </div>
          <div
            onClick={onClickBadge}
            className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
          >
            <div className="mt-1 flex items-center justify-center">
              <BadgeSvg width="18" height="18" className="text-gray-600 group-hover:text-indigo-600" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">뱃지 신청</div>
            </div>
          </div>
          <div
            onClick={onClickPassword}
            className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
          >
            <div className="mt-1 flex items-center justify-center">
              <ChangeSvg width="18" height="18" className="text-gray-600 group-hover:text-indigo-600" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">비밀번호 변경</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
          <SettingModal>
            <div
              data-modal-target="authentication-modal"
              data-modal-toggle="authentication-modal"
              onClick={onClickWithdraw}
              className="cursor-pointer flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-400 hover:text-red-400 hover:bg-gray-100"
            >
              <WarningSvg width="15" height="15" />
              회원탈퇴
            </div>
          </SettingModal>

          <div
            onClick={onClickLogOut}
            className="cursor-pointer flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
          >
            <OutSvg width="15" height="15" />
            로그아웃
          </div>
        </div>
      </div>
    </div>
  );
}

export default MySettings;
