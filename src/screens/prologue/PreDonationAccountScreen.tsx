import React, {Fragment, useEffect, useState} from "react";
import './styles.css';
import {IMAGES} from "../../constants/images";
import {Prologuimages} from "../../constants/prologuimages";
import {PrologueText} from "../../constants/prologueText";
import {Link, useLocation} from "react-router-dom";
import axios from "axios";
import {useRecoilState} from "recoil";
import {accessTokenState} from "../../state/loginState";

const baseUrl = 'https://www.match-api-server.com';

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
        const loginpage = process.env.REACT_APP_PUBLIC_URL+`/pre/login`;
        window.location.href = loginpage
    }

    return (
        <Fragment>
            <div className={"sendinfo_container"}>
                <img className={"intro_cat_icon"} src={Prologuimages.catIcon1}/>

                <text className={"info_txt"} style={{marginTop:"1.61rem"}}>{donationKind}{PrologueText.donateInfo2Desc}</text>
                <text className={"info_txt"}>{PrologueText.account}</text>
                <text className={"info_txt"} style={{marginBottom:"1.94rem"}}>{PrologueText.donateDesc3}</text>


                <button onClick={handleDonate}style={{border: 'none', background: "none"}}>
                    <text className={"donate_fin_btn"} >{PrologueText.finishBtn2}</text>
                </button>

            </div>
        </Fragment>
    );
}
export default PreDonationAccountScreen