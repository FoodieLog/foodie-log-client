import { useState } from "react";

const useToggelShowPassword = (): [isShow: boolean, toggleShow: () => void] => {
  const [isShow, setIsShow] = useState(false);
  const toggleShow = () => setIsShow((prev) => !prev);

  return [isShow, toggleShow];
};
export default useToggelShowPassword;
