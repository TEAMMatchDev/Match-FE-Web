import axios from 'axios';
import { useRecoilState } from 'recoil';
import { accessTokenState, refreshTokenState } from '../state/loginState';

// 환경 변수 정의
const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY ?? '';
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI_KAKAO ?? '';
const SECRET_KEY = process.env.REACT_APP_KAKAO_SECRET_KEY ?? '';
const mainpage = process.env.REACT_APP_PUBLIC_URL ?? '';
const baseUrl = process.env.REACT_APP_BASE_URL ?? '';
const tmpToken = "";
const token = localStorage.getItem('accessToken');


//TODO) *api 요청 헤더 1️⃣ 토큰 불필요한 요청
export const axiosPublicInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        'Accept': 'application/json',
    },
});
//TODO) 2️⃣ 토큰 필요한 요청
export const axiosPrivateInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        'Accept': 'application/json',
        'X-AUTH-TOKEN': token, //혹은 tmpToken으로
    },
});
//TODO) 3️⃣ 엑세스 토큰 만료시 토큰 재발급 요청 api 02-05
function requestRefreshToken() {
    const response = axiosPublicInstance.post('/users/refresh',
    {
            headers: {'X-REFRESH-TOKEN': token,}
         }
        );

    return response
};

//TODO) token을 함께 보내는 axios 요청에 interceptor 적용
axiosPrivateInstance.interceptors.response.use(
    //TODO) api 요청결과 200번대 응답
    (response) => {
        return response;
    },
    //TODO) api 요청 결과 200번대 응답 X
    async (error) => {
        const {
            config,
            response: { status },
        } = error;

        //TODO) token 만료시 400에러
        if (status === 400 || 401) {
            try{
                const originRequest = config;
                const tokenResponse = await requestRefreshToken(); //리프레시 토큰 요청
                if (tokenResponse.status === 200) {
                    const newAccessToken = tokenResponse.data.result.accessToken;
                    localStorage.setItem('accessToken', newAccessToken);
                    localStorage.setItem('refreshToken', newAccessToken);
                    axios.defaults.headers.common.Authorization = newAccessToken;
                    originRequest.headers.Authorization = newAccessToken;

                    return axios(originRequest);
                }
            } catch (e) {
                console.log(e);
            }
        }
        return Promise.reject(error);
    }
)
axiosPrivateInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    config.headers.Authorization = token;

    return config;
},
    //TODO) api 요청 결과 200번대 응답 X
    async (error) => {
        const {
            config,
            response: { status },
        } = error;

        //TODO) token 만료시 400에러
        if (status === 400 || 401) {
            try{
                const originRequest = config;
                const tokenResponse = await requestRefreshToken(); //리프레시 토큰 요청
                if (tokenResponse.status === 200) {
                    const newAccessToken = tokenResponse.data.result.accessToken;
                    localStorage.setItem('accessToken', newAccessToken);
                    localStorage.setItem('refreshToken', newAccessToken);
                    axios.defaults.headers.common.Authorization = newAccessToken;
                    originRequest.headers.Authorization = newAccessToken;

                    return axios(originRequest);
                }
            } catch (e) {
                console.log(e);
            }
        }
        return Promise.reject(error);
    }
)



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
    //TODO) 로그인 후 처리
    const afterLogin = () => {
        window.location.href = mainpage;
    };

    //TODO) 로그인 실패 처리
    const failLogin = (errorMessage: string) => {
        window.alert(errorMessage);
        window.location.href = `${mainpage}/signIn`;
    };

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
                // 오류발생시 실행
                failLogin(error.response.data.result.signUpType)
                console.log("카카오 로그인 서버에 post 실패", error);
                return '';
            });
    } catch (e) {
        console.log(e);
        return '';
    }
};
