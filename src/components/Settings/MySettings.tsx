"use client";
import { useState } from "react";
import { useUserStore } from "@store/useUserStore";
import { useRouter } from "next/navigation";
import { logoutKaKaoToken } from "@services/kakao";
import useLogout from "@hooks/useLogout";
import { LockReset, Logout, MilitaryTech, NotificationSmall } from "@assets/icons";
import WithdrawModal from "@components/Settings/SettingWithdrawModal";
import Header from "@components/Common/Header";
import SettingListItem from "@components/Settings/SettingListItem";
import Toggle from "@components/Common/Toggle";

function MySettings() {
  const [showModal, setShowModal] = useState(false);
  const {
    user: { kakaoAccessToken },
  } = useUserStore();
  const router = useRouter();
  const { logout } = useLogout();

  const onClickBadge = () => {
    router.push("/main/settings/badge");
  };

  const onClickPassword = () => {
    router.push("/main/settings/password");
  };

  const onClickWithdraw = () => {
    setShowModal(true);
  };

  const onClickLogout = async () => {
    if (!confirm("로그아웃하시겠습니까?")) {
      return;
    }

    try {
      if (kakaoAccessToken) {
        await logoutKaKaoToken();
      }
      await logout();
    } catch (error) {
      console.error("로그아웃 실패");
    }
  };

  return (
    <div>
      <Header title="설정 및 개인정보" back="prePage" />
      <ul>
        <SettingListItem text="알림" icon={NotificationSmall}>
          <div className="ml-[auto] flex items-center">
            <Toggle />
          </div>
        </SettingListItem>
        <SettingListItem
          text="뱃지 신청"
          icon={MilitaryTech}
          onClickHandler={onClickBadge}
          className="cursor-pointer"
        />
        <SettingListItem
          text="비밀번호 변경"
          icon={LockReset}
          onClickHandler={onClickPassword}
          className="cursor-pointer"
        />
        <SettingListItem text="로그아웃" icon={Logout} onClickHandler={onClickLogout} className="cursor-pointer" />
      </ul>

      <WithdrawModal>
        <div
          data-modal-target="authentication-modal"
          data-modal-toggle="authentication-modal"
          onClick={onClickWithdraw}
          className="h-12 cursor-pointer flex items-center justify-center font-semibold text-sm text-gray-3 hover:text-red hover:bg-gray-2"
        >
          회원탈퇴
        </div>
      </WithdrawModal>
    </div>
  );
}

export default MySettings;
