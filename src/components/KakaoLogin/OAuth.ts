const CLIENT_ID = "8dfa7db4e6e6e29a50acefe5f2016a73";
const REDIRECT_URI =  "https://www.match-api-server/auth/kakao";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
