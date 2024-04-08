import { useState, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import Button from "@components/Common/Button";
import { postWithdraw } from "@services/settings";
import { useUserStore } from "@store/useUserStore";
import { unlinkKaKaoToken } from "@services/kakao";
import { useToast } from "@/components/ui/use-toast";
import WithDrawReasonItem from "@components/Settings/WithDrawReasonItem";
import { TOAST_MESSAGES, WITHDRAW_REASON_LIST } from "@constants";
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
      toast(TOAST_MESSAGES.WITHDRAW_REASON_EMPTY);
      return;
    }

    if (!confirm("탈퇴하시겠습니까?")) {
      toast(TOAST_MESSAGES.WITHDRAW_CANCEL);
      return;
    }

    try {
      if (kakaoAccessToken) {
        await unlinkKaKaoToken();
      }
      await postWithdraw({ withdrawReason });
      clearUser();
      toast(TOAST_MESSAGES.WITHDRAW_SUCCESS);

      setTimeout(() => {
        router.replace("/accounts/login");
      }, 3000);
    } catch (error) {
      toast(TOAST_MESSAGES.WITHDRAW_FAILURE);
    }
  };

  return (
    <CustomModal setShowModal={setShowModal}>
      <div className="w-full px-[30px] py-6 bg-gray-0 flex flex-col items-start rounded-lg">
        <p className="w-full text-lg font-semibold text-gray-10 text-left mb-3">회원 탈퇴</p>
        <div className="w-full pt-3 pb-4 border-y">
          <div className="flex flex-col mb-4">
            <span className="text-gray-8 text-sm">이메일</span>
            <span className="text-gray-4">{email}</span>
          </div>
          <div>
            <p className="text-sm text-gray-8 mb-2">
              탈퇴 사유<span className="text-red">*</span>
            </p>
            <ul className="flex flex-col gap-2">
              {WITHDRAW_REASON_LIST.map(({ id, reason }) => (
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
        <p className="text-sm text-red mt-4 mb-6">
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
