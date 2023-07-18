import {IMAGES} from "../../constants/images";
import {TEXT} from "../../constants/text";
import React, {useEffect} from "react";
import axios from "axios";
import KakaoLogin from "react-kakao-login";
import * as process from "process";

const baseUrl = 'https://www.match-api-server.com';


const KakaoLoginScreen = () => {
    const REST_API_KEY= process.env.REACT_APP_REST_API_KEY; //REST API KEY
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI; //Redirect URI  https://www.match-api-server.com/auth/kakao    https://localhost:3000/auth/kakao

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
            <div style={{width: '100%', height: '100%'}}>
                <button
                    style={{
                        background: `url(${IMAGES.kakaoLoginBtn2})`, // 배경 이미지를 kakaoLoginBtn으로 설정
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        width: 183, // 버튼의 가로 크기를 100%로 설정
                        height: 45, // auto
                        border: 'none', // 테두리 제거
                    }}
                    onClick={handleLogin}
                />
            </div>
        </>
    );
}


export default KakaoLoginScreen
