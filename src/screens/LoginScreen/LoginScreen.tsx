import React from 'react';
import * as queryString from "querystring";
import axios from "axios";

import { IMAGES } from '../../constants/images';


const LoginScreen = ()=>
{
    const Rest_api_key='8dfa7db4e6e6e29a50acefe5f2016a73' //REST API KEY
    const redirect_uri = 'https://localhost:3000/auth/kakao' //Redirect URI

    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
    const query = queryString.parse(window.location.search);

    // query-string 패키지 이용해서 쿼리 decode
    React.useEffect(() => {
        if (query.code) {
            getKakaoTokenHandler(query.code.toString());
        }
    }, [query.code]);

    //  redirect 로 넘어온 url 파라미터 값이 있을 경우 getKakaoTokenHandler()을 통해 토큰 발급
    const getKakaoTokenHandler = async (code:string) => {
        try{
            const data:any = {
                grant_type: "authorization_code",
                client_id: process.env.REACT_APP_KAKAO_REST_KEY,
                redirect_uri: redirect_uri, //"redirect URI 입력"
                code: code
            };
            const queryString = Object.keys(data)
                .map((k:any)=> encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
                .join('&');

            //토큰 발급 REST API
            const {data} = await axios.post('https://kauth.kakao.com/oauth/token', queryString, {
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            };
            //서버에 전달
            sendKakaoTokenToServer(data.access_token);
        }catch(e){
            console.error(e)
        }

    }

    // 발급받은 access token을 서버에 넘기고, 서버에서 JWT 토큰 값을 받아 localstorage에 저장
    const sendKakaoTokenToServer = async (token:string ) => {
        const res = await axios.post('/auth/kakao',{access_token: token})
        if (res.status == 201 || res.status == 200) {
            const user =res.data.user; // +user정보
            window.localStorage.setItem("token", JSON.stringify({
                access_token: res.data.jwt
            }));
        }else {
            window.alert("로그인에 실패하였습니다.");
        }
    }

    const handleLogin = ()=>{
        window.location.href = kakaoURL
    }
    return (
        <>
            <div style={{width: '100%', height: '100%'}}>
                <div
                    style={{
                        backgroundColor: 'yellow',
                        width: '100%',
                        height: '100%',
                    }}>
                    카카오 로그인
                </div>
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
                <br/>
                <div
                    style={{
                        backgroundColor: 'green',
                        width: '100%',
                        height: '100%',
                    }}>
                    네이버 로그인
                </div>
            </div>
        </>
    );
}
export default LoginScreen
