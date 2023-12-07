import axios from 'axios';
import { useRecoilState } from 'recoil';
import { accessTokenState, refreshTokenState } from '../state/loginState';

// 환경 변수 정의
const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY ?? '';
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI_KAKAO ?? '';
const SECRET_KEY = process.env.REACT_APP_KAKAO_SECRET_KEY ?? '';
const mainpage = process.env.REACT_APP_PUBLIC_URL ?? '';
const baseUrl = process.env.REACT_APP_BASE_URL ?? '';

//TODO) * 카카오 로그인 토큰 요청 함수
//3) 카카오 서버에 access token 발급 요청
export const getKakaoTokenHandler = async (code: string): Promise<string | ''> => {
    try {
        //grant_type은 authorization_code , client_id는 rest api 앱 키 ,  redirect_uri은 인가코드가 리다이렉트된 URI , code는 인가코드
        const data = {
            grant_type: "authorization_code",
            client_id: REST_API_KEY,
            redirect_uri: REDIRECT_URI,
            code: code,
            client_secret: SECRET_KEY,
        };

        // @ts-ignore //왜 data에서 빨간줄인지 모르게썽 .env 하고 나서 빨간줄 떠
        const params = new URLSearchParams(data).toString();
        console.log('카카오 서버에 전달할 params : '+params); //여기 까지 정상

        // 토큰 발급 REST API
        const response = await axios.post(
            `https://kauth.kakao.com/oauth/token`,
            params, // URL 쿼리 파라미터로 넘길 데이터
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
                },
            }
        );

        // 서버에 access token 전달
        //console.log('카카오 서버에 전달할 access token : '+response.data.access_token);
        //sendKakaoTokenToServer(response.data.access_token);
        return response.data.access_token;
    } catch (e) {
        console.error(e);
        return '';
    }
};

//TODO) *토큰을 서버로 전송하는 함수
// @ts-ignore
export const sendKakaoTokenToServer = async (token: string): Promise<string | ''> => {
//console.log('kakao token : '+token);

    try {
        const data = {
            accessToken: token,
        };

        axios.post(
            baseUrl + `/auth/kakao`,
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((res) => {
                //console.log("카카오 로그인 post 성공", res);
                afterLogin();
                return res.data.result.accessToken;
                //setToken(res.data.result.accessToken);
                //setRefreshToken(res.data.result.refreshToken);
            })
            .catch(function (error) {
                if(error.response.status === 400){
                    console.log('>>> '+error.response.data.code)
                    if (error.response.data.code === "FEIGN_400_2"){
                        window.alert('잘못된 인가코드 사용')
                    }
                    else if (error.response.data.code === "U010"){
                        failLogin(error.response.data.result.signUpType)
                    }
                    else {
                        window.alert(error.response.message)
                    }
                    return '';
                }
                // 오류발생시 실행
                console.log("카카오 로그인 서버에 post 실패", error);
                return '';
            })
            .then(function () {
                // 항상 실행
                console.log("데이터 요청 완료");
            });
    } catch (e) {
        console.log(e);
        return '';
    }
};

//TODO) 로그인 후 처리
export const afterLogin = () => {
    window.location.href = mainpage;
};

//TODO) 로그인 실패 처리
export const failLogin = (errorMessage: string) => {
    window.alert(errorMessage);
    window.location.href = `${mainpage}/signIn`;
};
