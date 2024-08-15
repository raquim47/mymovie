export class CustomError extends Error {
  name: string;
  constructor(message: string, name: string = 'common') {
    super(message);
    this.name = name;
  }
}

export const FIREBASE_ERRORS: Record<string, Error> = {
  'auth/invalid-email': new CustomError('유효하지 않은 이메일 주소입니다.', 'email'),
  'auth/email-already-in-use': new CustomError('이미 사용중인 이메일입니다.', 'email'),
  'auth/user-not-found': new CustomError('이메일 또는 패스워드가 유효하지 않습니다.'),
  'auth/wrong-password': new CustomError('이메일 또는 패스워드가 유효하지 않습니다.'),
  'auth/weak-password': new CustomError(
    '비밀번호를 6글자 이상 입력해주세요.',
    'password'
  ),
  'auth/popup-closed-by-user': new CustomError('구글 로그인 팝업 닫힘', 'ignore'),
  'auth/user-cancelled': new CustomError('구글 로그인 취소', 'ignore'),
};

export const ERRORS = {
  REQUEST_ERROR: '요청이 실패했습니다.',
  EMPTY_EMAIL: '이메일을 입력하세요.',
  INVALID_EMAIL: '유효한 이메일 주소를 입력하세요.',
  EMPTY_PASSWORD: '비밀번호를 입력하세요.',
  INVALID_PASSWORD: '비밀번호를 6글자 이상 입력해주세요.',
  PASSWORD_MISMATCH: '비밀번호가 일치하지 않습니다.',
  EMPTY_PASSWORD_CONFIRM: '비밀번호 확인을 입력하세요.',
  EMPTY_NICKNAME: '닉네임을 입력하세요.',
  INVALID_NICKNAME: '닉네임은 2자 이상, 8자 이하여야 합니다.',
  EMPTY_COMMENT: '코멘트를 입력하세요.',
  INVALID_COMMENT: '2자 이상, 80자 이하로 입력해주세요.',
  REQUIRED_RATING: '별점을 먼저 남겨주세요.',
  REQUIRED_LOGIN: '로그인이 필요합니다.',
  ALREADY_LOGGED_IN: '이미 로그인 상태입니다.',
  NOT_FOUND_REVIEWS: '평가 정보를 찾을 수 없습니다.',
  INVALID_USER: '유효하지 않은 사용자입니다.',
  AUTH_ERROR: '인증 상태 확인 중 오류가 발생했습니다.',
  UNKNOWN_ERROR: '알 수 없는 오류가 발생했습니다.',
};
