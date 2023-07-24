import React from 'react';
//import * as queryString from "querystring";
import queryString from "query-string"; //gpt
import axios from "axios";

import { IMAGES } from '../../constants/images';
import './style.css';

import KakaoLoginScreen from "../KakaoLogin/KakaoLoginScreen";
import NaverLoginScreen from "../NaverLogin/NaverLoginScreen";
import Inputform from "../../constants/Inputform";
export * from '../NaverLogin/index';

const LoginScreen = () => {

    const onSubmit = (form : {name: string; description: string;}) => {
        console.log(form)
    }


    return (
        <>
            <div className="title" style={{height:"100%", marginTop:23}}>
                <div>
                    로그인
                </div>
                <Inputform />
                <div className="kakao">
                    <KakaoLoginScreen/>
                </div>
                <div className="naver">
                    <NaverLoginScreen/>
                </div>
            </div>
        </>
    );
}
export default LoginScreen
