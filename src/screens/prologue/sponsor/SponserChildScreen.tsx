import React, {Fragment, useEffect, useState} from "react";
import '../styles.css';
import {IMAGES} from "../../../constants/images";
import {Prologuimages} from "../../../constants/prologuimages";
import {PrologueText} from "../../../constants/prologueText";
import * as process from "process";
import {Link, useLocation} from "react-router-dom";

const SponserChildScreen = () => {

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
            to={`/pre/donate/account`}
            state={{ username: name, phoneNumber: phone, email: mail, alarmMethod: method, donationKind: donationKind }}
            style={{ textDecoration: "none", color: "black"}}
            className={"spon-btn"}
            onClick={() => handleSetKind(donationKind)}
        >
            {PrologueText.sponsor_childBtn}
        </Link>
    );

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
            <div className={"spon-container"}>
                <img className={"intro-sponsor-img"} src={Prologuimages.introChild_1}/>
                <img className={"intro-sponsor-img"} src={Prologuimages.introChild_2}/>
                <img className={"intro-sponsor-img"} src={Prologuimages.introChild_3}/>
                <img className={"intro-sponsor-img"} src={Prologuimages.introChild_4}/>


                {generateDonationLink("CHILD")}

            </div>
        </Fragment>
    );
}
export default SponserChildScreen