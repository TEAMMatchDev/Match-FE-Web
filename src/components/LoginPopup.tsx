import React, {useState, useRef, useEffect, Fragment, PropsWithChildren} from "react";
import {IMAGES} from "../constants/images";
import Sidebar from "../components/SideBar";
import {accessTokenState} from "../state/loginState";
import {useRecoilValue} from "recoil";
import {PrologueText} from "../constants/prologueText";
import styled from "styled-components";

const LoginPopup = () => {

    const REST_API_KEY= process.env.REACT_APP_REST_API_KEY; //REST API KEY
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI_PRE;

    // 인가코드 발급 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

    const handleLogin = ()=>{
        console.log(' handleLogin 시작 ');
        window.location.href = kakaoURL
    }


    return (
        <Fragment>
            <div className={"intro-container"}>
                <button className={"login-btn"} onClick={handleLogin} style={{border: 'none', background: "none"}}>
                    <img src={IMAGES.kakaoLoginBtnCircle} alt="카카오 로그인"
                         style={{width: "2.625rem", height: "2.625rem",}}/>
                </button>
                <text className={"login-btn-desc"}>{PrologueText.loginBtnDesc}</text>
            </div>
        </Fragment>
    );
};

export default LoginPopup;
