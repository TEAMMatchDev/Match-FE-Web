import React, {Fragment} from 'react';
//import * as queryString from "querystring";
import queryString from "query-string"; //gpt
import axios from "axios";

import { IMAGES } from '../../constants/images';
import {TEXT} from "../../constants/text";

import './styles.css';

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
            <Fragment>
                <div className={"title"}>
                    로그인
                </div>
                <div className={"title2"} >{TEXT.login}</div>

                <div className={"input-id"}>
                    <input className={"input"} placeholder={"아이디"}/>
                </div>

                <div className={"input-pw"}>
                    <input className={"input"} placeholder={"비밀번호"}/>
                </div>

                <div className={"loginBtn"}>
                    <img src={IMAGES.loginBtnLarge}/>
                </div>

                <div className={"findInfo"}>
                    <div className={"signUp"} style={{marginRight: 0}}>{TEXT.loginFormText1}</div>
                    <div className="vertical-line"></div>
                    <div className={"find-id"} style={{marginRight: 0}}>{TEXT.loginFormText2}</div>
                    <div className="vertical-line"></div>
                    <div className={"find-pw"}>{TEXT.loginFormText3}</div>
                </div>

                <div className={"loginInfo"} style={{marginTop: 21}}>{TEXT.loginFormInfo}</div>

                <div className="social">
                    <KakaoLoginScreen/>
                    <NaverLoginScreen/>
                    <NaverLoginScreen/>
                </div>
            </Fragment>
        </>
    );
}
export default LoginScreen
