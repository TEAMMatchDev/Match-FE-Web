import React from "react";
import axios from 'axios';
import {IMAGES} from "../../constants/images";

// 네이버 로그인 버튼 클릭 핸들러
const NaverLogin = async () => {
    try {
        const NAVER_CLIENT_ID = '8SFlnjHGk9S71HcRtHpg';
        const CALLBACK_URL = "http://localhost:3000/";
        const STATE_STRING = "false";

        // 네이버 로그인 팝업창 열기
        const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE_STRING}&redirect_uri=${CALLBACK_URL}`;
        const popup = window.open(NAVER_AUTH_URL, '_blank', 'width=500,height=600');

        if (popup) {
            // 팝업창에서 인증 코드 받아오기
            const getCode = async (): Promise<string | undefined> => {
                return new Promise((resolve) => {
                    const timer = setInterval(() => {
                        if (popup.closed) {
                            clearInterval(timer);
                            resolve(undefined);
                        } else {
                            try {
                                const code = new URL(popup.location.href).searchParams.get('code');
                                if (code) {
                                    clearInterval(timer);
                                    resolve(code);
                                    popup.close();
                                }
                            } catch (error) {
                                // 예외 처리
                            }
                        }
                    }, 500);
                });
            };

            const code = await getCode();
            if (code) {
                // 받아온 인증 코드로 액세스 토큰 요청
                const response = await axios.post('https://nid.naver.com/oauth2.0/token', {
                    grant_type: 'authorization_code',
                    client_id: NAVER_CLIENT_ID,
                    client_secret: 'AX2RitUnq3',
                    code,
                });

                const accessToken = response.data.access_token;
                // 액세스 토큰을 사용하여 추가적인 작업 수행
                // ...

            } else {
                // 인증 코드를 받아오지 못한 경우
                // ...
            }
        }
    } catch (error) {
        // 예외 처리
        // ...
    }
};

// 네이버 로그인 버튼 컴포넌트
const NaverLoginButton: React.FC = () => {
    return (
        <button onClick={NaverLogin} style={{border: 'none', background: "none"}}>
            <img src={IMAGES.NaverLoginBtn} style={{width: 183, height: 45}}/>
        </button>
    );
};

export default NaverLoginButton;