export const TOAST_MESSAGES = {
  EMAIL_CODE_SEND_FAILURE: { title: "이메일 인증 코드 발송 실패", description: "이메일을 다시 입력해 주세요!" },
  EMAIL_CODE_SEND_SUCCESS: {
    title: "이메일 인증 코드 발송",
    description: "입력한 이메일로 인증코드가 발송되었습니다!",
  },
  EMAIL_CODE_AUTH_FAILURE: { title: "이메일 인증 실패", description: "인증코드를 다시 확인해 주세요!" },
  EMAIL_AUTH_FAILURE: { title: "이메일 인증 실패", description: "이메일 인증 실패하였습니다. 다시 입력해 주세요!" },
  NICKNAME_ERROR: { title: "닉네임 오류", description: "유효하지 않는 닉네임입니다.\n닉네임을 다시 입력해 주세요." },
  SIGNUP_SUCCESS: { title: "회원 가입", description: "푸디로그에 오신 걸 환영합니다!" },
  SIGNUP_FAILURE: { description: "회원가입에 실패하였습니다." },
  LOGIN_FAILURE: { title: "로그인 실패", description: "이메일 또는 비밀번호가 틀렸습니다!" },
  PASSWORD_CHANGE_SUCCESS: { description: "비밀번호가 변경되었습니다!" },
  PASSWORD_CHANGE_FAILURE: { title: "비밀번호 변경 실패", description: "다시 시도해 주세요!" },
  ERROR_PLEASE_RETRY: { description: "에러가 발생했습니다. 다시 시도해주세요!" },
  POST_SUCCESS: { description: "게시글이 등록되었습니다!" },
  POST_FAILURE: { description: "게시글 등록 중 오류 발생하였습니다." },
  EDIT_POST_SUCCESS: { description: "게시글 수정되었습니다!" },
  EDIT_POST_FAILURE: { description: "게시글 수정에 오류 발생하였습니다!" },
  FEED_DELETE_SUCCESS: { description: "피드가 삭제되었습니다!" },
  FEED_DELETE_FAILURE: { description: "게시글 삭제 중 에러가 발생했습니다. 다시 시도해주세요!" },
  APPLY_BADGE_SUCCESS: { description: "뱃지 신청되었습니다!" },
  APPLY_BADGE_FAILURE: { description: "뱃지 신청을 실패했습니다. 다시 시도해주세요." },
  WITHDRAW_REASON_EMPTY: { description: "🥲 탈퇴 사유를 입력해주세요." },
  WITHDRAW_CANCEL: { description: "탈퇴를 취소했습니다." },
  WITHDRAW_SUCCESS: { title: "푸드로그 탈퇴", description: "회원 탈퇴되었습니다." },
  WITHDRAW_FAILURE: { title: "탈퇴 실패", description: "탈퇴 실패하였습니다." },
  PROFILE_EDIT_FAILURE: { title: "수정 실패", description: "수정 중 에러 발생하였습니다." },
  KAKAO_LOGIN_FAILURE: {
    title: "카카오 로그인 실패",
    description: "카카오 로그인 과정에서 에러가 발생하였습니다.\n 로그인 페이지로 이동합니다.",
  },
  KAKAO_LOGIN_WITHDRAW: {
    title: "탈퇴 계정 가입 불가",
    description: "탈퇴한 계정으로 재가입 불가합니다.\n 로그인 페이지로 이동합니다.",
  },
  REPLY_POST_ERROR: { title: "댓글 작성 오류 발생", description: "처리 중에 오류가 발생하였습니다." },
  REPLY_DELETE_ERROR: { title: "삭제 오류 발생", description: "처리 중에 오류가 발생하였습니다." },
  REPORT_SUCCESS: { title: "신고정상 접수", description: "신고가 정상 접수 되었습니다." },
  REPORT_FAILURE: { title: "오류 발생", description: "신고 처리 중 오류 발생하였습니다." },
};
