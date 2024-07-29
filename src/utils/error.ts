export const FIREBASE_AUTH_ERRORS: Record<string, Error | undefined> = {
  'auth/user-not-found': {
    message: '이메일 또는 패스워드가 유효하지 않습니다.',
    name: 'global',
  },
  'auth/wrong-password': {
    message: '이메일 또는 패스워드가 유효하지 않습니다.',
    name: 'global',
  },
  'auth/invalid-password': {
    message: '비밀번호를 6글자 이상 입력해주세요.',
    name: 'email',
  },
  'auth/invalid-email': { message: '유효하지 않은 이메일 주소입니다.', name: 'email' },
  'auth/email-already-in-use': { message: '이미 사용중인 이메일입니다.', name: 'email' },
  'auth/invalid-display-name': {
    message: '유효하지 않은 닉네임입니다.',
    name: 'nickName',
  },
  'auth/popup-closed-by-user': {
    message: '구글 로그인 팝업 닫힘.',
    name: 'popup-close',
  },
};

export const ERRORS = {
  REQUEST_ERROR: '요청이 실패했습니다. 다시 시도해주세요.',
  INVALID_USER: '유효하지 않은 사용자입니다.',
  INVALID_NICKNAME: '닉네임은 2자 이상, 8자 이하여야 합니다.',
  AUTH_ERROR: '인증 상태 확인 중 오류가 발생했습니다.',
  REQUIRED_LOGIN: '로그인이 필요합니다.',
  ALREADY_LOGGED_IN: '이미 로그인 상태입니다.',
  REQUIRED_RATING: '별점을 먼저 남겨주세요.',
  NOT_FOUND_REVIEWS: '평가 정보를 찾을 수 없습니다.',
  INVALID_INPUT: '유효한 입력값이 아닙니다.',
};
