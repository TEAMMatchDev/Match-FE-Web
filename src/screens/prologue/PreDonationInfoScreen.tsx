import React, {Fragment, useState} from "react";
import './styles.css';
import {IMAGES} from "../../constants/images";
import {Prologuimages} from "../../constants/prologuimages";
import {PrologueText} from "../../constants/prologueText";
import {Link, useLocation} from "react-router-dom";
import axios from "axios";
import {useRecoilState} from "recoil";
import {accessTokenState} from "../../state/loginState";

const baseUrl = 'https://www.match-api-server.com';

const PreDonationInfoScreen = () => {

    //프로젝트명 props로 전달받음
    const location = useLocation();
    const { username } = location.state
    const { phoneNumber } = location.state
    const { email } = location.state
    const { alarmMethod } = location.state

    const [kind, setKind] = useState<any>();

    const [token, setToken] = useRecoilState(accessTokenState);


    const handleDonate = (name: string, phone: string, email: string, method: string, kind: string) => {

        const data = {
            username: name,
            phoneNumber: phone,
            email: email,
            alarmMethod: method,
            donationKind: kind
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
            })
            .then(function () {
                // 항상 실행
                //console.log("데이터 요청 완료");
            });


    };

    return (
        <Fragment>
            <div className={"donate_container"}>
                <img className={"login_cat_icon"} src={Prologuimages.catFace2}/>
                <text className={"donate_txt"}>{PrologueText.donateInfo1Desc}</text>

                <button onClick={() => handleDonate(username, phoneNumber, email, alarmMethod, kind)} style={{border: 'none', background: "none"}}>
                    <Link to={`/pre/donate/account`} state= {{ donationKind: kind }}  style={{textDecoration : "none", color: "black"}}>
                        <text className={"intro_btn"} onClick={() => setKind("DOG")}>{PrologueText.donateBtn1}</text>
                        <text className={"intro_btn"} onClick={() => setKind("CHILD")}>{PrologueText.donateBtn2}</text>
                        <text className={"intro_btn"} onClick={() => setKind("OCEAN")}>{PrologueText.donateBtn3}</text>
                        <text className={"intro_btn"} onClick={() => setKind("VISUALLY_IMPAIRED")}>{PrologueText.donateBtn4}</text>
                    </Link>
                </button>

                {/*<text className={"alert_txt"} style={{marginTop: "-2.11rem"}}>{username}</text>
                <text className={"alert_txt"} style={{marginTop: "-2.11rem"}}>{phoneNumber}</text>
                <text className={"alert_txt"} style={{marginTop: "-2.11rem"}}>{email}</text>
                <text className={"alert_txt"} style={{marginTop: "-2.11rem"}}>{alarmMethod}</text>*/}
            </div>
        </Fragment>
    );
}
export default PreDonationInfoScreen