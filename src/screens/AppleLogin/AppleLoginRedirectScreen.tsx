import React, {useEffect} from "react";
import axios from 'axios';
import {IMAGES} from "../../constants/images";
import {useLocation} from "react-router-dom";

import { STATE_STRING } from './AppleLoginScreen';
import * as process from "process";
const baseUrl = 'https://prod.match-api-server.com';


// 네이버 로그인 버튼 클릭 핸들러
const AppleLoginRedirectScreen = () => {
    const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
    const SECRET_KEY = process.env.REACT_APP_NAVER_SECRET_KEY;


    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get("code");
        const state = STATE_STRING;

        if (code){
            if (state){
                console.log('인가코드 : '+code);
                console.log('state : '+state);

                sendNaverTokenToServer(code);
            }
        }

    },[]);

    //접근 토큰 발급 -> redirect url로 요청 대체
    const getNaverTokenHandler = async (code: string, state: string) => { //, state: string
        try {
            const data = {
                grant_type: "authorization_code",
                client_id: NAVER_CLIENT_ID,
                client_secret: SECRET_KEY,
                code: code,
                state: STATE_STRING,
            }

            // @ts-ignore //왜 data에서 빨간줄인지 모르게썽 .env 하고 나서 빨간줄 떠
            const params = new URLSearchParams(data).toString();
            console.log('네이버 서버에 전달할 params : '+params); //여기 까지 정상

            const response = await axios.post(
                'https://nid.naver.com/oauth2.0/token',
                params,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            console.log('res : '+response.data);

            const accessToken = response.data.access_token;
            console.log('서버에 전달할 access token : '+accessToken);
            sendNaverTokenToServer(response.data.access_token);


        } catch (e) {
            console.error(e);
        }
    };

    const sendNaverTokenToServer = async (code: string) => {
        const data = {
            code: code,
        };
        const params = new URLSearchParams(data).toString();

        axios.get(
            baseUrl+`/auth/naver?${params}`
        )
            .then(function (response) {
                console.log("애플 로그인 post 성공", response);

                const mainpage = process.env.REACT_APP_PUBLIC_URL+``;
                window.location.href = mainpage
            })
            .catch(function (error) {
                // 오류발생시 실행
                console.log("애플 로그인 post 실패", error);
            })
            .then(function () {
                // 항상 실행
                //console.log("데이터 요청 완료");
            });

    };



    return(
        <>
            <div>
                애플 로그인 중
            </div>
        </>
    )
};


export default AppleLoginRedirectScreen;
