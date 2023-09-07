import useSignUpStore from "../store/useSignUpStore";
import usePostStore from "../store/usePostStore";

const setNextComponent = useSignUpStore.getState().setNextComponent;
const setFiles = usePostStore.getState().setFiles;

const onClickPreComponent = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.stopPropagation();
  e.preventDefault();
  setNextComponent("");
  setFiles([]);
};

export default onClickPreComponent;
