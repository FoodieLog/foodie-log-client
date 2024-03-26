"use client";
import { useState } from "react";
import { useUserStore } from "@store/useUserStore";
import { useRouter } from "next/navigation";
import { logoutKaKaoToken } from "@services/kakao";
import WithdrawModal from "@components/Settings/WithdrawModal";
import Header from "@components/Common/Header";
import SettingListItem from "@components/Settings/SettingListItem";
import useLogout from "@hooks/useLogout";
import SettingNotice from "@components/Settings/SettingNotice";

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
    <div className="bg-gray-0 ">
      <Header title="설정 및 개인정보" back="prePage" />
      <ul>
        <SettingNotice />
        <SettingListItem text="뱃지 신청" onClickHandler={onClickBadge} className="cursor-pointer" />
        <SettingListItem text="비밀번호 변경" onClickHandler={onClickPassword} className="cursor-pointer" />
        <SettingListItem text="로그아웃" onClickHandler={onClickLogout} className="cursor-pointer" />
      </ul>
      <div
        data-modal-target="authentication-modal"
        data-modal-toggle="authentication-modal"
        onClick={onClickWithdraw}
        className="h-12 cursor-pointer flex items-center justify-center font-semibold text-sm text-gray-3 hover:text-red hover:bg-gray-2"
      >
        회원탈퇴
      </div>
      {showModal && <WithdrawModal setShowModal={setShowModal} />}
    </div>
  );
}

export default MySettings;
