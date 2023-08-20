import React from "react";
import Button from "@/src/components/Button";
function SignUp() {
  const handleClick = () => {
    console.log("handleClick");
  };
  return (
    <>
      <div>
        <h2>Foodie-Log</h2>
        <p>맛집 정보를 이용하려면 가입하세요.</p>
        <form>
          <input type="text" placeholder="이메일" />
          <input type="text" placeholder="비밀번호" />
          <input type="text" placeholder="비밀번호 확인" />
          <Button label={"회원가입"} />
          <div>
            <div></div>
            <div>또는</div>
            <div></div>
          </div>
          <Button label={"카카오 로그인"} />
        </form>
      </div>
    </>
  );
}

export default SignUp;
