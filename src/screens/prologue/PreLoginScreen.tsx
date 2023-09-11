import React, {Fragment, useState} from "react";
import './styles.css';
import {IMAGES} from "../../constants/images";
import {Prologuimages} from "../../constants/prologuimages";
import {PrologueText} from "../../constants/prologueText";

const PreLoginScreen = () => {
    const REST_API_KEY= process.env.REACT_APP_REST_API_KEY; //REST API KEY
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI_PRE;

    // 인가코드 발급 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

    const handleLogin = ()=>{
        console.log(' handleLogin 시작 ');

        //## Rest api 방식
        //1) 하이퍼링크 --> code = 뒤에 인가코드 붙어서 나옴
        window.location.href = kakaoURL

        //2) 인가코드 추출 -> 리다이렉트 된 후 KakaoLoginRedirectScreen 에서 계속

    }

    return (
        <Fragment>
            <div className={"login_container"}>
                <img className={"login_cat_icon"} src={Prologuimages.catFace1}/>
                <text className={"intro_txt"}>{PrologueText.loginDesc}</text>
                <button className={"login-btn"} onClick={handleLogin} style={{border: 'none', background: "none"}}>
                    <img src={IMAGES.kakaoLoginBtnCircle} alt="카카오 로그인" style={{width: "2.625rem", height: "2.625rem", }}/>
                </button>
                <text className={"login_btn_desc"} >{PrologueText.loginBtnDesc}</text>

            </div>
        </Fragment>
    );
}
export default PreLoginScreen