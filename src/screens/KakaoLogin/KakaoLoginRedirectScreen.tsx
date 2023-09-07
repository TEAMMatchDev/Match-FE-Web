import {IMAGES} from "../../constants/images";
import React, {Component, Fragment, useEffect, useState} from "react";
import axios from "axios";
import {useRecoilState, useRecoilValue, useResetRecoilState} from 'recoil';
import {accessTokenState, refreshTokenState} from "../../state/loginState";

import * as process from "process";
import './style.css';

const baseUrl = 'https://www.match-api-server.com';


const KakaoRedirectScreen: React.FC = () => { //여기로 리다이렉트
    const REST_API_KEY= process.env.REACT_APP_REST_API_KEY; //REST API KEY
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
    const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

    //todo 여기에서 accessToken 저장
    const [token, setToken] = useRecoilState(accessTokenState);
    const [refreshtoken, setRefreshToken] = useRecoilState(refreshTokenState);
    const log2 = useRecoilValue(accessTokenState);


    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get("code");

        if (code) {
            console.log('인가코드 : '+code);
            getKakaoTokenHandler(code);
        }

        if(token){
            //console.log('# KakaoRedirectScreen2 --accessToken : ' + log);
            console.log('# KakaoRedirectScreen2 --accessToken : ' + log2);
        }
    }, [token, refreshtoken]);



    const afterLogin = () => {

        console.log('Main page로 다시 이동');
        const mainpage = process.env.REACT_APP_PUBLIC_URL+``;
        window.location.href = mainpage
    }

    const moveToPay = () => {
        const paymentpage = `pay`; //auth/pay로 이동 됨
        window.location.href = paymentpage
    }


    //3) 카카오 서버에 access token 발급 요청
    const getKakaoTokenHandler = async (code: string) => {
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
            console.log('카카오 서버에 전달할 access token : '+response.data.access_token);
            sendKakaoTokenToServer(response.data.access_token);

        } catch (e) {
            console.error(e);
        }
    };

    const sendKakaoTokenToServer = async (token: string) => {
        console.log('kakao token : '+token);

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
                console.log("post 성공", res);
                afterLogin();
                setToken(res.data.result.accessToken);
                setRefreshToken(res.data.result.refreshToken);

                // response
            })
            .catch(function (error) {
                // 오류발생시 실행
                console.log("post 실패", error);
            })
            .then(function () {
                // 항상 실행
                console.log("데이터 요청 완료");
            });
    };



    return(
        <>

        </>
    )
}

export default KakaoRedirectScreen
