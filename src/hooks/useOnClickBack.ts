import useSignUpStore from "@store/useSignUpStore";
import usePostStore from "@store/usePostStore";

const setNextComponent = useSignUpStore.getState().setNextComponent;

const onClickPreComponent = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.stopPropagation();
  e.preventDefault();
  setNextComponent("");
};

export default onClickPreComponent;
