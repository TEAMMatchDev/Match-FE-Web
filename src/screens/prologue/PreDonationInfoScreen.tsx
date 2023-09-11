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


    return (
        <Fragment>
            <div className={"donate_container"}>
                <img className={"login_cat_icon"} src={Prologuimages.catFace2}/>
                <text className={"donate_txt"}>{username}{PrologueText.donateInfo1Desc}</text>

                <Link to={`/pre/donate/account`}
                      state={{ username: name, phoneNumber: phone, email: mail, alarmMethod: method, donationKind: 'DOG' }}
                      style={{textDecoration : "none", color: "black"}}>
                    <text className={"doante_loc_btn"} onClick={() => handleSetKind("DOG")}>{PrologueText.donateBtn1}</text>
                    </Link>
                <Link to={`/pre/donate/account`}
                      state={{ username: name, phoneNumber: phone, email: mail, alarmMethod: method, donationKind: 'CHILD' }}
                      style={{textDecoration : "none", color: "black"}}>
                    <text className={"doante_loc_btn"} onClick={() => handleSetKind("CHILD")}>{PrologueText.donateBtn2}</text>
                    </Link>
                <Link to={`/pre/donate/account`}
                      state={{ username: name, phoneNumber: phone, email: mail, alarmMethod: method, donationKind: 'OCEAN' }}
                      style={{textDecoration : "none", color: "black"}}>
                    <text className={"doante_loc_btn"} onClick={() => handleSetKind("OCEAN")}>{PrologueText.donateBtn3}</text>
                </Link>
                <Link to={`/pre/donate/account`}
                      state={{ username: name, phoneNumber: phone, email: mail, alarmMethod: method, donationKind: 'VISUALLY_IMPAIRED' }}
                      style={{textDecoration : "none", color: "black"}}>
                    <text className={"doante_loc_btn"} onClick={() => handleSetKind("VISUALLY_IMPAIRED")}>{PrologueText.donateBtn4}</text>
                </Link>
            </div>
        </Fragment>
    );
}
export default PreDonationInfoScreen