import React, { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import Button from "../Common/Button";
import { fetchWithdraw } from "../../services/settings";
import { SettingModalProps } from "../../types/user";
import { useUserStore } from "@/src/store/useUserStore";

function SettingModal({ children }: SettingModalProps) {
  const [withdrawReason, setWithdrawReason] = useState("");
  const email = useUserStore((state) => state.user.email);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWithdrawReason(e.target.value);
  };

  const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (withdrawReason.trim() === "") {
      alert("사유를 입력해주세요!");
      return;
    }
    confirm("탈퇴하시겠습니까?");
    if (!confirm) {
      alert("취소되었습니다!");
      return;
    }
    console.log("탈퇴 이유", withdrawReason);
    try {
      const res = await fetchWithdraw({ withdrawReason });
      console.log("회원 탈퇴 성공", res);
    } catch (error) {
      console.log("탈퇴 에러", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>회원 탈퇴 요청</DialogTitle>
          <DialogDescription>
            탈퇴한 이메일로 재가입이 불가능합니다. <br /> 그래도 탈퇴하시겠습니까?
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              이메일
            </label>
            <Input id="name" value={email} className="col-span-3" disabled />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="username" className="text-right">
              탈퇴사유<span className="text-red-500">*</span>
            </label>
            <Input id="username" name="reason" value={withdrawReason} onChange={onChange} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="primary" onClick={onClick}>
            회원 탈퇴 하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default SettingModal;
