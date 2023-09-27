import React, {Fragment, useCallback, useState} from "react";
import '../styles.css';
import {IMAGES} from "../../../constants/images";
import {Prologuimages} from "../../../constants/prologuimages";
import {PrologueText} from "../../../constants/prologueText";
import * as process from "process";
import Modal from "../../../components/Modal";

const PreIntroScreen: React.FC = () => {

    const [isOpenModal, setOpenModal] = useState<boolean>(false);
    const onClickToggleModal = useCallback(() => {
        setOpenModal(!isOpenModal);
    }, [isOpenModal]);

    const handleLoginPopup = () => {

        console.log('handlePopup')

        // const popupWidth = 330; // Set the width of the popup window
        // const popupHeight = 250; // Set the height of the popup window
        //
        // // Calculate the left and top positions to center the popup window
        // const left = window.innerWidth / 2 - popupWidth / 2 + window.screenX;
        // const top = window.innerHeight / 2 - popupHeight / 2 + window.screenY;
        //
        // const popupURL = '/popupLogin';
        // window.open(
        //     popupURL,
        //     'Login Popup', // Specify a window name or use '_blank' to open in a new tab
        //     `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`
        // );

    }


    const REST_API_KEY= process.env.REACT_APP_REST_API_KEY; //REST API KEY
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI_PRE;

    // 인가코드 발급 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

    const handleLogin = ()=>{
        console.log(' handleLogin 시작 ');
        window.location.href = kakaoURL
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
                <button onClick={handleLoginPopup} style={{border: 'none', background: "none", color:"black"}}>
                    <text className={"intro-btn"} >{PrologueText.donateBtn}</text>
                </button>

                {isOpenModal && (
                    <Modal onClickToggleModal={onClickToggleModal}>
                        <div className={"intro-container"}>
                            <button className={"login-btn"} onClick={handleLogin} style={{border: 'none', background: "none"}}>
                                <img src={IMAGES.kakaoLoginBtnCircle} alt="카카오 로그인"
                                     style={{width: "2.625rem", height: "2.625rem",}}/>
                            </button>
                            <text className={"login-btn-desc"}>{PrologueText.loginBtnDesc}</text>
                        </div>
                    </Modal>
                )}
                <button onClick={onClickToggleModal} style={{border: 'none', background: "none", color:"black"}}>
                    <text className={"intro-btn"} >{PrologueText.donateBtn}</text>
                </button>

            </div>
        </Fragment>
    );
}
export default PreIntroScreen