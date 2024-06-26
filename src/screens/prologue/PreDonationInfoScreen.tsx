import React, {Fragment, useEffect, useState} from "react";
import './styles.css';
import {IMAGES} from "../../constants/images";
import {Prologuimages} from "../../constants/prologuimages";
import {PrologueText} from "../../constants/prologueText";
import {Link, useLocation} from "react-router-dom";
import axios from "axios";
import {useRecoilState} from "recoil";
import {accessTokenState} from "../../state/loginState";
import * as process from "process";

const baseUrl = process.env.REACT_APP_BASE_URL

const PreDonationInfoScreen = () => {

    //프로젝트명 props로 전달받음
    const location = useLocation();
    const { username } = location.state
    const { phoneNumber } = location.state
    const { email } = location.state
    const { alarmMethod } = location.state

    const [kind, setKind] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [mail, setMail] = useState<string>('');
    const [method, setMethod] = useState<string>('');

    useEffect(() => {
        setName(location.state.username)
        setPhone(location.state.phoneNumber)
        setMail(location.state.email)
        setMethod(location.state.alarmMethod)
    },[])



    const handleSetKind = (dKind: string) => {
        setKind(dKind)
        console.log('# DonationInfo --: '+name,phone,mail,method);
        console.log('# DonationInfo --기부유형: '+dKind);
    }
    const generateDonationLink = (donationKind: string) => (
        <Link
            to={`/pre/donate/${donationKind}`}
            state={{ username: name, phoneNumber: phone, email: mail, alarmMethod: method, donationKind: donationKind }}
            style={{ textDecoration: "none", color: "black", width: "17rem", marginBottom: "-2.11rem" }}
        >
            <text className={"doante-loc-btn"} onClick={() => handleSetKind(donationKind)}>
                {PrologueText[`donateBtn${donationKind}` as keyof typeof PrologueText]}
            </text>
        </Link>
    );

    return (
        <Fragment>
            <div className={"donate-container"}>
                <img className={"login-cat-icon"} src={Prologuimages.catFace2}/>
                <text className={"donate-txt"}>{username}{PrologueText.donateInfo1Desc}</text>

                {generateDonationLink("DOG")}
                {generateDonationLink("CHILD")}
                {generateDonationLink("OCEAN")}
                {generateDonationLink("VISUALLY_IMPAIRED")}
            </div>
        </Fragment>
    );
}
export default PreDonationInfoScreen