import React, { useEffect } from "react";
import axios from "axios";
import queryString from "query-string";

const KakaoRedirectHandler = () => {
    const Rest_api_key='8dfa7db4e6e6e29a50acefe5f2016a73' //REST API KEY
    const redirect_uri = 'https://match-dev-official.vercel.app/auth/kakao' //Redirect URI

    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
    const query = queryString.parse(window.location.search);

    // query-string 패키지 이용해서 쿼리 decode
    useEffect(() => {
        if (query.code) {
            getKakaoTokenHandler(query.code.toString());
        }
    }, [query.code]);

    // redirect 로 넘어온 url 파라미터 값이 있을 경우 getKakaoTokenHandler()을 통해 토큰 발급!!
    const getKakaoTokenHandler = async (code:string) => {
        try {
            const data = {
                grant_type: 'authorization_code',
                client_id: Rest_api_key,
                redirect_uri: redirect_uri,
                code: code,
            };

            const params = new URLSearchParams(data).toString();

            // 토큰 발급 REST API
            const response = await axios.post('https://kauth.kakao.com/oauth/token', params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                },
            });

            // 서버에 전달
            sendKakaoTokenToServer(response.data.access_token);
            window.alert("access token : "+response.data.access_token);
        } catch (e) {
            console.error(e);
        }
    };

    // 서버 api 연결 부분 - 발급받은 access token을 서버에 넘기고, 서버에서 JWT 토큰 값을 받아 localstorage에 저장
    const sendKakaoTokenToServer = async (token:string ) => {
        const res = await axios.post('/auth/kakao',{access_token: token}) //api 연결
        if (res.status == 201 || res.status == 200) { //로그인 성공
            const user = res.data.user; // +user정보
            window.localStorage.setItem("token", JSON.stringify({
                access_token: res.data.jwt
            }));
            window.alert("로그인 성공!");
        }else {
            window.alert("로그인에 실패하였습니다.");
        }
    }




}

export default KakaoRedirectHandler;
