import {IMAGES} from "../../constants/images";
import {TEXT} from "../../constants/text";
import React, {useEffect} from "react";
import axios from "axios";
import KakaoLogin from "react-kakao-login";
import * as process from "process";

const baseUrl = process.env.REACT_APP_BASE_URL


const KakaoLoginScreen = () => {
    const baseUrl = process.env.REACT_APP_BASE_URL
    const REST_API_KEY= process.env.REACT_APP_KAKAO_REST_API_KEY; //REST API KEY
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI_KAKAO;

    // 인가코드 발급 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

    const handleLogin = ()=>{
        console.log(' handleLogin 시작 ');

        //## Rest api 방식
        //1) 하이퍼링크 --> code = 뒤에 인가코드 붙어서 나옴
        window.location.href = kakaoURL

        //2) 인가코드 추출 -> 리다이렉트 된 후 KakaoLoginRedirectScreen 에서 계속

    }

    return (
        <>
            <div>
                <button onClick={handleLogin} style={{border: 'none', background: "none"}}>
                    <img src={IMAGES.kakaoLoginBtnCircle} alt="카카오 로그인" style={{width: "2.625rem", height: "2.625rem", marginRight: "2.19rem"}}/>
                </button>
            </div>
        </>
    );
}
export default KakaoLoginScreen
