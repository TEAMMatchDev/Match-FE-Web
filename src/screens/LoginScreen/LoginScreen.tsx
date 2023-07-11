import React from 'react';
//import * as queryString from "querystring";
import queryString from "query-string"; //gpt
import axios from "axios";

import { IMAGES } from '../../constants/images';

import KakaoLogin from "../../components/KakaoLogin/KakaoLogin";
import NaverLoginButton from "../../components/NaverLogin";
export * from '../../components/NaverLogin/index';

const LoginScreen = () => {

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
                <KakaoLogin/>

                <br/>
                <div
                    style={{
                        backgroundColor: 'green',
                        width: '100%',
                        height: '100%',
                    }}>
                    네이버 로그인
                </div>
                <NaverLoginButton/>
            </div>
        </>
    );
}
export default LoginScreen
