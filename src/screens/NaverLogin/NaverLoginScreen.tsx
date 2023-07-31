import {IMAGES} from "../../constants/images";
import {TEXT} from "../../constants/text";
import React, {useEffect} from "react";
import axios from "axios";
import KakaoLogin from "react-kakao-login";
import * as process from "process";

const NaverLoginScreen = () => {
    const NAVER_CLIENT_ID = '8SFlnjHGk9S71HcRtHpg';
    const CALLBACK_URL = "https://localhost:3000/auth/naver";

    //네이버 로그인 인증 요청
    const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE_STRING}&redirect_uri=${CALLBACK_URL}`;

    const NaverLogin = ()=>{
        console.log(' handleLogin 시작 ');

        //## Rest api 방식
        //1) 하이퍼링크 --> code = 뒤에 인가코드 붙어서 나옴
        window.location.href = NAVER_AUTH_URL

        //2) 인가코드 추출 -> 리다이렉트 된 후 KakaoLoginRedirectScreen 에서 계속

    }

    return (
        <>
            <div>
                <button onClick={NaverLogin} style={{border: 'none', background: "none"}}>
                    <img src={IMAGES.naverLoginCircleBtn} style={{width: "2.625rem", height: "2.625rem", marginLeft: "2.19rem", marginRight: "2.19rem"}}/>
                </button>
            </div>
        </>
    );
}
export default NaverLoginScreen

function generateRandomState(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let state = '';
    const length = 10; // 생성할 무작위 문자열의 길이

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        state += characters[randomIndex];
    }

    return state;
}
export const STATE_STRING : string = generateRandomState();

