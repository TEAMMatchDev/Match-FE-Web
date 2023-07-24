import React, {Fragment} from 'react';
//import * as queryString from "querystring";
import queryString from "query-string"; //gpt
import axios from "axios";

import { IMAGES } from '../../constants/images';
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
                <div className="title">
                    로그인
                </div>

                <div>
                    <input className={"input"} placeholder={"아이디"}/>
                </div>

                <div>
                    <input className={"input"} placeholder={"비밀번호"}/>
                </div>

                <img src={IMAGES.loginBtnLarge}/>

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
