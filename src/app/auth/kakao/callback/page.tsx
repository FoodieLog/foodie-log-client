import React, { use } from "react";
import SignUpTerms from "@/src/components/Auth/SignUpTerms";
import SignUpProfile from "@/src/components/Auth/SignUpProfile";
import useSignUpStore from "@/src/store/useSignUpStore";
function KaKaCallback() {
  const nextComponent = useSignUpStore.getState().nextComponent;

  if (nextComponent === "SignupProfile") {
    return <SignUpProfile />;
  }
  return <SignUpTerms />;
}

export default KaKaCallback;
