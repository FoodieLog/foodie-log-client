import { Dispatch, SetStateAction, useRef, useState } from "react";
import Button from "../Common/Button";
import { CodeData } from "@@types/signupTypes";

interface CodeInputProps {
  codeData: CodeData;
  setCodeData: Dispatch<SetStateAction<CodeData>>;
  isLoading: boolean;
  onClickRetry: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  onClickNext: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  retryButtonText: string;
  nextButtonText: string;
}

const CodeInput = ({
  codeData,
  setCodeData,
  isLoading,
  onClickRetry,
  onClickNext,
  retryButtonText,
  nextButtonText,
}: CodeInputProps) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const inputRefs: React.RefObject<HTMLInputElement>[] = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCodeData({ ...codeData, [name]: value });

    if (value.length >= e.target.maxLength && focusedIndex < inputRefs.length - 1) {
      inputRefs[focusedIndex + 1].current?.focus();
      setFocusedIndex(focusedIndex + 1);
    }
  };

  return (
    <>
      <div className="flex justify-center gap-2 mb-5 mt-10">
        <input
          name="firstCode"
          value={codeData.firstCode}
          onChange={onChangeHandler}
          type="text"
          className="code"
          maxLength={1}
          ref={inputRefs[0]}
        />
        <input
          name="secondCode"
          value={codeData.secondCode}
          onChange={onChangeHandler}
          type="text"
          className="code"
          maxLength={1}
          ref={inputRefs[1]}
        />
        <input
          name="thirdCode"
          value={codeData.thirdCode}
          onChange={onChangeHandler}
          type="text"
          className="code"
          maxLength={1}
          ref={inputRefs[2]}
        />
        <input
          name="fourthCode"
          value={codeData.fourthCode}
          onChange={onChangeHandler}
          type="text"
          className="code"
          maxLength={1}
          ref={inputRefs[3]}
        />
      </div>
      <div className="w-full">
        <div className="flex items-center justify-center gap-2 mb-2">
          <p className="text-gray-3 text-sm">인증번호가 오지 않았나요?</p>
          <Button type="button" variant={"text"} onClick={onClickRetry} disabled={isLoading}>
            {retryButtonText}
          </Button>
        </div>
        <div className="absolute bottom-5 w-full">
          <Button type="button" variant={"primary"} onClick={onClickNext}>
            {nextButtonText}
          </Button>
        </div>
      </div>
    </>
  );
};

export default CodeInput;
