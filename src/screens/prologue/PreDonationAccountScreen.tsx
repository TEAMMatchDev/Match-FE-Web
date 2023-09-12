import React, {Fragment, useEffect, useState} from "react";
import './styles.css';
import {IMAGES} from "../../constants/images";
import {Prologuimages} from "../../constants/prologuimages";
import {PrologueText} from "../../constants/prologueText";
import {Link, useLocation} from "react-router-dom";
import axios from "axios";
import {useRecoilState} from "recoil";
import {accessTokenState} from "../../state/loginState";

const baseUrl = 'https://prod.match-api-server.com';

const PreDonationAccountScreen = () => {
    const [token, setToken] = useRecoilState(accessTokenState);

    //프로젝트명 props로 전달받음
    const location = useLocation();
    const { username } = location.state
    const { phoneNumber } = location.state
    const { email } = location.state
    const { alarmMethod } = location.state
    const { donationKind } = location.state

    useEffect(() => {
        const data = {
            username: username,
            phoneNumber: phoneNumber,
            email: email,
            alarmMethod: alarmMethod,
            donationKind: donationKind,
        };

        axios.post(
            baseUrl + `/donation-temporaries`,
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-AUTH-TOKEN": token,
                },
            }
        )
            .then(function (response) {
                console.log("기부 post 성공", response);
            })
            .catch(function (error) {
                // 오류발생시 실행
                console.log("기부 post 실패", error);
                console.log('# DonationAccount --정보확인 : '+username, phoneNumber, email, alarmMethod, donationKind);
            })
            .then(function () {
                // 항상 실행
                //console.log("데이터 요청 완료");
            });

        console.log('기부 유형 : '+donationKind)
    })


    const handleDonate = () => {
        const loginpage = process.env.REACT_APP_PUBLIC_URL+`/pre/donate/complete`;
        window.location.href = loginpage
    }

    return (
        <Fragment>
            <div className={"sendinfo-container"}>
                <img className={"intro-cat-icon"} src={Prologuimages.catIcon1}/>

                {donationKind === "DOG" && (
                    <div className={"info-txt"} style={{marginTop:"1.61rem"}}>
                        {PrologueText.donateto1}{PrologueText.donateInfo2Desc}
                    </div>
                )}
                {donationKind === "CHILD" && (
                    <div className={"info-txt"} style={{marginTop:"1.61rem"}}>
                        {PrologueText.donateto2}{PrologueText.donateInfo2Desc}
                    </div>
                )}
                {donationKind === "OCEAN" && (
                    <div className={"info-txt"} style={{marginTop:"1.61rem"}}>
                        {PrologueText.donateto3}{PrologueText.donateInfo2Desc}
                    </div>
                )}
                {donationKind === "VISUALLY_IMPAIRED" && (
                    <div className={"info-txt"} style={{marginTop:"1.61rem"}}>
                        {PrologueText.donateto4}{PrologueText.donateInfo2Desc}
                    </div>
                )}

                <text className={"info-txt"}>그렇다면 {PrologueText.account}로</text>
                <text className={"info-txt"} style={{marginBottom:"1.94rem"}}>{PrologueText.donateDesc3}</text>


                <button onClick={handleDonate} style={{border: 'none', background: "none"}}>
                    <text className={"donate-fin-btn"} >{PrologueText.finishBtn2}</text>
                </button>

            </div>
        </Fragment>
    );
}
export default PreDonationAccountScreen