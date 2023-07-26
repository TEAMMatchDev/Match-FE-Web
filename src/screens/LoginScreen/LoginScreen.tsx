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

    const handleSignUp = ()=>{

        const signUpUrl = `https://localhost:3000/signUp`
        window.location.href = signUpUrl

    }


    return (
        <>
            <Fragment>
                <div className="title">{TEXT.login}</div>

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
                    <button className={"signUp"} onClick={handleSignUp} style={{marginRight: 0, border: "none", background: "none", fontFamily: "Apple NeoEB", fontSize: 12}}>{TEXT.loginFormText1}</button>
                    <div className="vertical-line"></div>
                    <button className={"find-id"} style={{marginRight: 0, border: "none", background: "none", fontFamily: "Apple NeoEB", fontSize: 12}}>{TEXT.loginFormText2}</button>
                    <div className="vertical-line"></div>
                    <button className={"find-pw"} style={{border: "none", background: "none", fontFamily: "Apple NeoEB", fontSize: 12}}>{TEXT.loginFormText3}</button>
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
