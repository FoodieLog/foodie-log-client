import { Dispatch, SetStateAction, useState } from "react";
import CustomModal from "@components/Common/Dialog/CustomModal";
import { TERMS } from "@constants";
import Button from "@components/Common/Button";
import { CheckedCircle, UncheckedCircle } from "@assets/icons";

interface SignUpTermsModalProps {
  isChecked: {
    service: boolean;
    info: boolean;
  };
  setIsChecked: Dispatch<
    SetStateAction<{
      service: boolean;
      info: boolean;
    }>
  >;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const SignUpTermsModal = ({ isChecked, setIsChecked, setIsModalOpen }: SignUpTermsModalProps) => {
  const [openTerm, setOpenTerm] = useState("");

  const onClickModalButtonHandler = () => {
    setIsModalOpen(false);
    setIsChecked({ service: true, info: true });
  };

  const onClickTermButtonHandler = (term: "service" | "info") => {
    setOpenTerm("");
    setIsChecked((prev) => ({ ...prev, [term]: true }));
  };

  return (
    <CustomModal>
      <div className="flex flex-col p-3 justify-between items-center}">
        {openTerm === "service" ? (
          <>
            <p className="mb-3 h-[200px]">{TERMS.SERVICE.CONTENT}</p>
            <Button
              onClick={() => {
                onClickTermButtonHandler(openTerm);
              }}
              type="button"
            >
              확인
            </Button>
          </>
        ) : openTerm === "info" ? (
          <>
            <p className="mb-3 h-[400px] overflow-y-scroll">{TERMS.INFO}</p>
            <Button
              onClick={() => {
                onClickTermButtonHandler(openTerm);
              }}
              type="button"
            >
              확인
            </Button>
          </>
        ) : (
          <>
            <div className="text-center mx-10">
              <h2 className="text-[24px] font-[600] mb-6">이용 약관 동의</h2>
              <p className="text-[14px] text-gray-08">
                Foodie-Log는 회원님의 개인정보를 안전하게 보호합니다. 새 계정을 만들려면 이용약관에 동의하세요.
              </p>
            </div>
            <div className="flex w-full flex-col gap-2 px-2 mb-10 mt-[120px] ">
              <div className="flex justify-between">
                <label htmlFor="info" className="flex text-gray-4 gap-2">
                  {isChecked.info ? <CheckedCircle /> : <UncheckedCircle />}
                  <input
                    id="info"
                    type="checkbox"
                    checked={isChecked.info}
                    onChange={() => setIsChecked((prev) => ({ ...prev, info: !prev.info }))}
                    style={{ display: "none" }}
                  />
                  서비스 이용 약관 동의<span className="text-red">(필수)</span>
                </label>
                <span
                  className="text-gray-4 text-[14px]"
                  onClick={() => {
                    setOpenTerm("info");
                  }}
                >
                  내용 보기
                </span>
              </div>
              <div className="flex justify-between">
                <label htmlFor="service" className="flex text-gray-4 gap-2">
                  {isChecked.service ? <CheckedCircle /> : <UncheckedCircle />}
                  <input
                    id="service"
                    type="checkbox"
                    checked={isChecked.service}
                    onChange={() => setIsChecked((prev) => ({ ...prev, service: !prev.service }))}
                    style={{ display: "none" }}
                  />
                  개인정보 수집 및 약관 동의<span className="text-red">(필수)</span>
                </label>
                <span
                  className="text-gray-4 text-[14px]"
                  onClick={() => {
                    setOpenTerm("service");
                  }}
                >
                  내용 보기
                </span>
              </div>
            </div>
            <Button type="button" onClick={onClickModalButtonHandler}>
              동의하고 계속하기
            </Button>
          </>
        )}
      </div>
    </CustomModal>
  );
};

export default SignUpTermsModal;
