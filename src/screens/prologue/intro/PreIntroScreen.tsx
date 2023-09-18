import React, {Fragment, useState} from "react";
import '../styles.css';
import {IMAGES} from "../../../constants/images";
import {Prologuimages} from "../../../constants/prologuimages";
import {PrologueText} from "../../../constants/prologueText";
import * as process from "process";

const PreIntroScreen = () => {
    const REST_API_KEY= process.env.REACT_APP_REST_API_KEY; //REST API KEY
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI_PRE;

    // 인가코드 발급 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

    const handleLogin = ()=>{
        console.log(' handleLogin 시작 ');
        window.location.href = kakaoURL
    }
    const handleDonate = () => {
        const loginpage = process.env.REACT_APP_PUBLIC_URL+`/pre/login`;
        window.location.href = loginpage
    }
    const handleIntro = () => {
        const intropage = `/intro/1`;
        window.location.href = intropage;
    }

    return (
        <Fragment>
            <div className={"intro-container"}>
                <img className={"intro-cat-icon"} src={Prologuimages.catIcon1}/>
                <text className={"intro-txt"}>{PrologueText.intro1}</text>
                <button onClick={handleIntro} style={{border: 'none', background: "none", color:"black"}}>
                    <text className={"intro-btn2"} >{PrologueText.introBtn}</text>
                </button>
                <button className={"login-btn"} onClick={handleLogin} style={{border: 'none', background: "none"}}>
                    <img src={IMAGES.kakaoLoginBtnCircle} alt="카카오 로그인" style={{width: "2.625rem", height: "2.625rem", }}/>
                </button>
                <text className={"login-btn-desc"} >{PrologueText.loginBtnDesc}</text>


            </div>
        </Fragment>
    );
}
export default PreIntroScreen