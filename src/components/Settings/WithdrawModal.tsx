import { useState, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import Button from "@components/Common/Button";
import { postWithdraw } from "@services/settings";
import { useUserStore } from "@store/useUserStore";
import { unlinkKaKaoToken } from "@services/kakao";
import { useToast } from "@/components/ui/use-toast";
import WithDrawReasonItem from "@components/Settings/WithDrawReasonItem";
import { withdrawReasonList } from "@constants";
import CustomModal from "@components/Common/Dialog/CustomModal";

export interface WithdrawModalProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

function WithdrawModal({ setShowModal }: WithdrawModalProps) {
  const [withdrawReason, setWithdrawReason] = useState("");
  const {
    user: { email, kakaoAccessToken },
    clearUser,
  } = useUserStore();
  const router = useRouter();
  const { toast } = useToast();

  const selectReasonHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;
    if (id) {
      setWithdrawReason(e.target.id);
    }
  };

  const cancelWithDrawHandler = () => {
    setShowModal(false);
  };
  const clickWithdrawHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (withdrawReason.trim() === "") {
      toast({ description: "🥲 탈퇴 사유를 입력해주세요." });
      return;
    }

    if (!confirm("탈퇴하시겠습니까?")) {
      toast({ description: "탈퇴를 취소했습니다." });
      return;
    }

    try {
      if (kakaoAccessToken) {
        await unlinkKaKaoToken();
      }
      await postWithdraw({ withdrawReason });
      clearUser();
      toast({ title: "푸드로그 탈퇴", description: "회원 탈퇴되었습니다." });
      router.replace("/accounts/login");
    } catch (error) {
      toast({ title: "탈퇴 실패", description: "탈퇴 실패하였습니다." });
    }
  };

  return (
    <CustomModal setShowModal={setShowModal}>
      <div className="w-full px-[30px] py-[24px] bg-gray-0 flex flex-col items-start rounded-[8px]">
        <p className="w-full text-lg font-semibold text-gray-10 text-left mb-[12px]">회원 탈퇴</p>
        <div className="w-full pt-[12px] pb-[16px] border-y">
          <div className="flex flex-col mb-[16px]">
            <span className="text-gray-8 text-sm">이메일</span>
            <span className="text-gray-4">{email}</span>
          </div>
          <div>
            <p className="text-sm text-gray-8 mb-[8px]">
              탈퇴 사유<span className="text-red">*</span>
            </p>
            <ul className="flex flex-col gap-[8px]">
              {withdrawReasonList.map(({ id, reason }) => (
                <li key={id}>
                  <WithDrawReasonItem
                    id={id}
                    reason={reason}
                    withdrawReason={withdrawReason}
                    selectReasonHandler={selectReasonHandler}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-sm text-red mt-[16px] mb-[24px]">
          탈퇴한 이메일로 재가입이 불가능합니다.
          <br /> 그래도 탈퇴하시겠습니까?
        </p>
        <Button type="button" variant="primary" onClick={clickWithdrawHandler}>
          <span className="text-lg">네, 탈퇴할래요.</span>
        </Button>
        <button
          type="button"
          className="w-full h-[50px] text-center text-gray-4 text-lg font-semibold"
          onClick={cancelWithDrawHandler}
        >
          유지하기
        </button>
      </div>
    </CustomModal>
  );
}
export default WithdrawModal;
