import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Button from "@components/Common/Button";
import { postWithdraw } from "@services/settings";
import { WithdrawModalProps } from "@@types/settings";
import { useUserStore } from "@store/useUserStore";
import { unlinkKaKaoToken } from "@services/kakao";
import { useToast } from "@/components/ui/use-toast";

function WithdrawModal({ children }: WithdrawModalProps) {
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
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[325px] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>회원 탈퇴 요청</DialogTitle>
          <DialogDescription>
            탈퇴한 이메일로 재가입이 불가능합니다. <br /> 그래도 탈퇴하시겠습니까?
          </DialogDescription>
        </DialogHeader>
        <div>
          <div>
            <label htmlFor="name" className="text-right flex-shrink-0 text-sm w-10">
              이메일
            </label>
            <Input id="name" value={email} className="col-span-3 border border-none text-sm" disabled />
          </div>
          <div>
            <p className="text-sm">
              탈퇴 사유<span className="text-red-500">*</span>
            </p>
            <label htmlFor="UNSATISFACTORY_SUPPORT" className="flex gap-2 items-center text-sm">
              <Input
                type="radio"
                id="UNSATISFACTORY_SUPPORT"
                name="reason"
                value={withdrawReason}
                onChange={selectReasonHandler}
                className="w-[10px]"
              />
              고객 지원이 만족스럽지 않아서
            </label>
            <label htmlFor="INFREQUENTLY_USED" className="flex gap-2 items-center text-sm">
              <Input
                type="radio"
                id="INFREQUENTLY_USED"
                name="reason"
                value={withdrawReason}
                onChange={selectReasonHandler}
                className="w-[10px]"
              />
              자주 이용하지 않아서
            </label>
            <label htmlFor="USE_OTHER_SITES" className="flex gap-2 items-center text-sm">
              <Input
                type="radio"
                id="USE_OTHER_SITES"
                name="reason"
                value={withdrawReason}
                onChange={selectReasonHandler}
                className="w-[10px]"
              />
              비슷한 타 사이트를 이용하기 위해서
            </label>
            <label htmlFor="ADVERTISEMENT" className="flex gap-2 items-center text-sm">
              <Input
                type="radio"
                id="ADVERTISEMENT"
                name="reason"
                value={withdrawReason}
                onChange={selectReasonHandler}
                className="w-[10px]"
              />
              광고가 많아서
            </label>
            <label htmlFor="ETC" className="flex gap-2 items-center text-sm">
              <Input
                type="radio"
                id="ETC"
                name="reason"
                value={withdrawReason}
                onChange={selectReasonHandler}
                className="w-[10px]"
              />
              기타
            </label>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="primary" onClick={clickWithdrawHandler}>
            회원 탈퇴 하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default WithdrawModal;
