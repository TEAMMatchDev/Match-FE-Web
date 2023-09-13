import React, {Fragment, useState} from 'react';
//import * as queryString from "querystring";
import queryString from "query-string"; //gpt

import axios from "axios";

import { IMAGES } from '../../constants/images';
import {TEXT} from "../../constants/text";

import './styles.css';

import KakaoLoginScreen from "../KakaoLogin/KakaoLoginScreen";
import NaverLoginScreen from "../NaverLogin/NaverLoginScreen";
import Inputform from "../../constants/Inputform";
import AppleLoginScreen from "../AppleLogin/AppleLoginScreen";

import * as process from "process";

const baseUrl = process.env.REACT_APP_BASE_URL


const LoginScreen = () => {
    const reactapphomeurl= process.env.REACT_APP_PUBLIC_URL;

    const [id, setId] = useState('');
    const [pw, setPassword] = useState('');

    const onSubmit = (form : {name: string; description: string;}) => {
        console.log(form)
    }

    const handleSignUp = ()=>{
        const signUpUrl = `${reactapphomeurl}/signUp`
        window.location.href = signUpUrl
    }

    const handleLogin = (id:string, pw:string ) => {

        const data = {
            email: id,
            password : pw,
        };

        axios.post(
            baseUrl+`/auth/logIn`,
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then(function (res) {
                if (res.status === 201 || res.status === 200) {
                    console.log("일반 로그인 post 성공", res);

                    console.log('Main page로 다시 이동');
                    const mainpage = process.env.REACT_APP_PUBLIC_URL+``;
                    window.location.href = mainpage

                    window.alert(res.data.message);
                }
            })
            .catch(function (error) {
                if (axios.isAxiosError(error) && error.response) {

                    const {code} = error.response.data;

                    console.log('>>>> ' + error.response.data) //U어쩌구
                    console.log('>>>> ' + error.response.data.isSuccess) //false
                    console.log('>>>> ' + error.response.status) //403
                    console.log('>>>> ' + error.response.data.message) //message

                    if (!error.response.data.isSuccess) {
                        //window.alert(error.response.data.message);
                        window.alert('아이디와 비밀번호를 확인해주세요!');
                        console.log('>> ' + code + ' : ' + error.response.data.message);
                    }

                }
            });
    }

    return (
        <>
            <Fragment>
                <div className="title">{TEXT.login}</div>

                <div className={"input-id"}>
                    <input className={"input"} placeholder={"아이디"} value={id} onChange={(e) => setId(e.target.value)}/>
                </div>

                <div className={"input-pw"}>
                    <input className={"input"} placeholder={"비밀번호"} value={pw} onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <div className={"loginBtn"}>
                    <img src={IMAGES.loginBtnLarge} alt="로그인" onClick={() => handleLogin(id, pw)} />
                </div>

                <div className={"findInfo"}>
                    <button className={"signUp"} onClick={handleSignUp}>{TEXT.loginFormText1}</button>
                    <div className="vertical-line"></div>
                    <button className={"find-id"}>{TEXT.loginFormText2}</button>
                    <div className="vertical-line"></div>
                    <button className={"find-pw"}>{TEXT.loginFormText3}</button>
                </div>

                <div className={"loginInfo"}>{TEXT.loginFormInfo}</div>

                <div className="social">
                    <KakaoLoginScreen/>
                    <NaverLoginScreen/>
                    <AppleLoginScreen/>
                </div>
            </Fragment>
        </>
    );
}
export default LoginScreen
