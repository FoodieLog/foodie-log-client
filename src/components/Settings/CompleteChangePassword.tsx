import React from "react";
import { useRouter } from "next/navigation";
import { BigCheckCircle } from "@assets/icons";
import Button from "@components/Common/Button";
import useSignUpStore from "@store/useSignUpStore";

function CompleteChangePassword() {
  const router = useRouter();

  const { setNextComponent } = useSignUpStore();

  const clickCompleteButton = () => {
    setNextComponent("");
    router.replace("/accounts/login");
  };

  return (
    <div className="mt-40 flex flex-col items-center px-5">
      <BigCheckCircle />
      <p className="mt-[24px] mb-[68px] text-center text-gray-8 text-2xl font-semibold">
        비밀번호가 성공적으로 <br />
        변경되었습니다.
      </p>
      <Button type="submit" variant="primary" onClick={clickCompleteButton}>
        완료
      </Button>
    </div>
  );
}

export default CompleteChangePassword;
