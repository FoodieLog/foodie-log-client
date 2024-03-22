import { TERMS } from "@constants";
import Button from "@components/Common/Button";
import { ArrowBack_IOS, CheckedCircle, UncheckedCircle } from "@assets/icons";
import Drawer from "@components/Common/Drawer/Drawer";
import { motion } from "framer-motion";
import { useState } from "react";

interface ContentVisibility {
  info: boolean;
  service: boolean;
}

interface SignUpTermsDrawerProps {
  onTermSubmit: () => Promise<void>;
}

const SignUpTermsDrawer = ({ onTermSubmit }: SignUpTermsDrawerProps) => {
  const [isChecked, setIsChecked] = useState({ service: false, info: false });
  const [terms, setTerms] = useState<ContentVisibility>({ info: false, service: false });

  const toggleTerms = (term: keyof ContentVisibility) => {
    setTerms((prev) => ({ ...prev, [term]: !prev[term] }));
  };

  return (
    <Drawer backgroundDarker neverClosed reactableHeight>
      <div className="flex flex-col items-center gap-3">
        <p className="text-2xl font-bold mb-8">서비스 이용 약관 동의</p>
        <div className="w-full border border-gray-2 rounded-lg px-2.5 py-3.5 mb-5">
          <label htmlFor="terms" className="flex items-center text-gray-4 gap-2">
            {isChecked.service && isChecked.info ? <CheckedCircle /> : <UncheckedCircle />}
            <input
              id="terms"
              type="checkbox"
              checked={isChecked.service && isChecked.info}
              onChange={() =>
                setIsChecked(() => {
                  return isChecked.service && isChecked.info
                    ? { service: false, info: false }
                    : { service: true, info: true };
                })
              }
              style={{ display: "none" }}
            />
            <p className="text-lg font-bold text-red">약관 전체 동의</p>
          </label>
        </div>
        <div>
          <div className="flex justify-between w-full items-center">
            <label htmlFor="info" className="flex text-gray-10 gap-1">
              {isChecked.info ? <CheckedCircle /> : <UncheckedCircle />}
              <input
                id="info"
                type="checkbox"
                checked={isChecked.info}
                onChange={() => setIsChecked((prev) => ({ ...prev, info: !prev.info }))}
                style={{ display: "none" }}
              />
              <span className="text-red">(필수)</span>서비스 이용 약관 동의
            </label>
            <motion.div
              initial={false}
              animate={{ rotate: terms.info ? 270 : 90 }}
              transition={{ duration: 0.3 }}
              onClick={() => {
                toggleTerms("info");
              }}
              className="scale-90"
            >
              <ArrowBack_IOS />
            </motion.div>
          </div>
          <motion.div
            initial={false}
            animate={{ height: terms.info ? "120px" : 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflowY: "auto" }}
          >
            <div className="h-full w-full p-3 bg-gray-1 rounded">{TERMS.INFO}</div>
          </motion.div>
        </div>
        <div>
          <div className="flex justify-between w-full items-center">
            <label htmlFor="service" className="flex text-gray-10 gap-1">
              {isChecked.service ? <CheckedCircle /> : <UncheckedCircle />}
              <input
                id="service"
                type="checkbox"
                checked={isChecked.service}
                onChange={() => setIsChecked((prev) => ({ ...prev, service: !prev.service }))}
                style={{ display: "none" }}
              />
              <span className="text-red">(필수)</span>개인정보 수집 및 이용 동의
            </label>
            <motion.div
              initial={false}
              animate={{ rotate: terms.service ? 270 : 90 }}
              transition={{ duration: 0.3 }}
              onClick={() => {
                toggleTerms("service");
              }}
              className="scale-90"
            >
              <ArrowBack_IOS />
            </motion.div>
          </div>
          <motion.div
            initial={false}
            animate={{ height: terms.service ? "120px" : 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflowY: "auto" }}
          >
            <div className="h-full w-full p-3 bg-gray-1 rounded ">{TERMS.SERVICE.CONTENT}</div>
          </motion.div>
        </div>
        <Button type="submit" onClick={onTermSubmit} disabled={!isChecked.info || !isChecked.service}>
          다음
        </Button>
      </div>
    </Drawer>
  );
};

export default SignUpTermsDrawer;
