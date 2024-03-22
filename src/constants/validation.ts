// 이메일, 비밀번호 유효성 검사
export const EMAIL_VALIDATION = {
  required: "이메일은 필수 입력입니다.",
  pattern: {
    value: /\S+@\S+\.\S+/,
    message: "이메일 형식에 맞지 않습니다.",
  },
};
export const PASSWORD_VALIDATION = {
  required: "비밀번호는 필수 입력입니다.",
  pattern: {
    value: /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,16}$/,
    message: "영문 대소문자, 숫자, 특수문자 포함",
  },
  minLength: {
    value: 8,
    message: "비밀번호는 8 ~ 16자입니다.",
  },
};
