import {IMAGES} from "../../constants/images";
import React, {Component, Fragment, useEffect, useState} from "react";
import axios from "axios";
import {useRecoilState, useRecoilValue, useResetRecoilState} from 'recoil';
import {accessTokenState, refreshTokenState} from "../../state/loginState";

import * as process from "process";
import './style.css';
import {getKakaoTokenHandler, sendKakaoTokenToServer} from "../../services/AxiosApiService";

const baseUrl = process.env.REACT_APP_BASE_URL

const KakaoRedirectScreen: React.FC = () => { //여기로 리다이렉트
    const mainpage = process.env.REACT_APP_PUBLIC_URL+``;

    const REST_API_KEY= process.env.REACT_APP_KAKAO_REST_API_KEY; //REST API KEY
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI_KAKAO;
    const SECRET_KEY = process.env.REACT_APP_KAKAO_SECRET_KEY;

    //todo 여기에서 accessToken 저장

    const [kakaoToken, setKakaoToken] = useState('');
    const [token, setToken] = useRecoilState(accessTokenState);
    const [refreshtoken, setRefreshToken] = useRecoilState(refreshTokenState);
    const log = useRecoilValue(accessTokenState);


    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get("code");
        const fetchToken = async () => {
            if (code) {
                console.log('인가코드 : '+code);
                const kakaoToken = await getKakaoTokenHandler(code);
                setKakaoToken(kakaoToken);

                if (kakaoToken) {
                    const accessToken = await sendKakaoTokenToServer(kakaoToken);
                    setToken(accessToken);
                }
            }
        };

        fetchToken();

        if(token){
            console.log('# KakaoRedirectScreen2 --accessToken : ' + log);
        }
    }, [token, refreshtoken]);



    return(
        <>

        </>
    )
}

export default KakaoRedirectScreen
