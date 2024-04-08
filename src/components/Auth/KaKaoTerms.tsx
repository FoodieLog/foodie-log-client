"use client";
import { useState } from "react";
import Image from "next/image";
import Button from "@components/Common/Button";
import useSignUpStore from "@store/useSignUpStore";
import CustomModal from "@components/Common/Dialog/CustomModal";
import { initializePushNotifications } from "@components/Notification/PushNotification";
import { loginKaKaoToken } from "@services/kakao";
import { useUserStore } from "@store/useUserStore";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { TERMS, TOAST_MESSAGES } from "@constants";
import useLocalStorage from "@hooks/useLocalStorage";

function KaKaoTerms() {
  const [isLoading, setIsLoading] = useState(false);
  const [showServiceTerms, setShowServiceTerms] = useState(false);
  const [showInfoTerms, setShowInfoTerms] = useState(false);
  const [isCheckedInfo, setIsCheckedInfo] = useState(false);
  const isChecked = useSignUpStore((state) => state.isChecked);
  const setIsChecked = useSignUpStore((state) => state.setIsChecked);
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();
  const { getItem } = useLocalStorage();

  const { toast } = useToast();

  const onChangeServiceHandler = () => {
    setIsChecked(!isChecked);
  };

  const onChangeInfoHandler = () => {
    setIsCheckedInfo(!isCheckedInfo);
  };

  const onClickTermsBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowServiceTerms(false);
    setShowInfoTerms(false);
  };

  const onClickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!isChecked || !isCheckedInfo) {
      return alert("이용약관 동의는 필수입니다.");
    }
    try {
      const kakaoToken = getItem("kakaoToken");
      if (!kakaoToken) throw new Error("인증 토큰이 없습니다. 다시 시도해주세요.");
      const {
        data: { response },
      } = await loginKaKaoToken(kakaoToken);
      setUser(response);
      initializePushNotifications();
      router.replace(`/main/${response.id}`);
    } catch (error) {
      toast(TOAST_MESSAGES.KAKAO_LOGIN_FAILURE);

      setTimeout(() => {
        router.replace("/accounts/login");
      }, 2000);
    }
    setIsLoading(false);
  };

  return (
    <section className="flex flex-col items-center justify-center p-10 h-4/5 sm:w-[600px] sm:border border-gray-300">
      <div className="mb-10">
        <div className="title">
          <h2>이용약관동의</h2>
        </div>
        <p>{TERMS.TITLE}</p>
        <div className="flex items-center justify-between gap-x-3 mt-3">
          <label className="flex items-center gap-3 flex-shrink-0">
            <p>
              서비스 이용 약관 동의 <span className="text-red-500">(필수)</span>
            </p>
            <input className="checkbox" type="checkbox" checked={isChecked} onChange={onChangeServiceHandler} />
          </label>

          <button
            type="button"
            onClick={() => setShowServiceTerms(true)}
            className="text-blue-400 underline underline-offset-1 flex-shrink-0"
          >
            내용 보기
          </button>
        </div>
        <div className="flex items-center justify-between gap-x-3">
          <label className="flex items-center gap-3 flex-shrink-0">
            <p>
              개인정보 수집∙이용 동의 <span className="text-red-500">(필수)</span>
            </p>
            <input className="checkbox" type="checkbox" checked={isCheckedInfo} onChange={onChangeInfoHandler} />
          </label>
          <button
            type="button"
            onClick={() => setShowInfoTerms(true)}
            className="text-blue-400 underline underline-offset-1 flex-shrink-0"
          >
            내용 보기
          </button>
        </div>
      </div>
      <Button type="button" variant={"primary"} onClick={onClickHandler} disabled={isLoading}>
        {isLoading ? "로딩중..." : "회원가입"}
      </Button>
      {showServiceTerms && (
        <CustomModal>
          <div className="p-3 text-sm">
            <p>{TERMS.SERVICE.TITLE}</p>
            <Image src="/images/terms.png" alt="service" width={300} height={300} />
            <p className="mb-3">{TERMS.SERVICE.CONTENT}</p>
            <Button type="button" onClick={onClickTermsBtn}>
              확인
            </Button>
          </div>
        </CustomModal>
      )}

      {showInfoTerms && (
        <CustomModal>
          <div className="p-3 text-[10px]">
            <p className="h-[400px] overflow-y-scroll">{TERMS.INFO}</p>
            <Button type="button" onClick={onClickTermsBtn}>
              확인
            </Button>
          </div>
        </CustomModal>
      )}
    </section>
  );
}

export default KaKaoTerms;
