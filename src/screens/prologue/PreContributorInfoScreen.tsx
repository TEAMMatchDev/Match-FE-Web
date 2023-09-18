import React, {Fragment, useState} from "react";
import './styles.css';
import {IMAGES} from "../../constants/images";
import {TEXT} from "../../constants/text";
import {ALERTEXT} from "../../constants/alertText";
import {Prologuimages} from "../../constants/prologuimages";
import {PrologueText} from "../../constants/prologueText";
import {Link, useLocation, useParams} from "react-router-dom";
import axios from "axios";
import * as process from "process";

const baseUrl = process.env.REACT_APP_BASE_URL

const PreContributorInfoScreen: React.FC = () =>{
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    //오류메시지 상태저장
    const [nameMessage, setNameMessage] = useState<string>('')
    const [emailMessage, setEmailMessage] = useState<string>('')
    const [phoneMessage, setPhoneMessage] = useState<string>('')

    // 유효성 검사
    const [isName, setIsName] = useState<boolean>(false)
    const [isEmail, setIsEmail] = useState<boolean>(false)
    const [isPhone, setIsPhone] = useState<boolean>(false)

    //프로젝트명 props로 전달받음
    const location = useLocation();
    const { method } = location.state

    const handleDonate = () => {
        const loginpage = process.env.REACT_APP_PUBLIC_URL+`/pre/login`;
        window.location.href = loginpage
    }

    //todo 이름 validation
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const nameCurrent = e.target.value
        setName(nameCurrent)
        if (e.target.value.length < 2 || e.target.value.length > 5 || /\s/.test(nameCurrent)) {
            setNameMessage(ALERTEXT.nameValFalse)
            setIsName(false)
        } else {
            setNameMessage(ALERTEXT.nameValTrue)
            setIsName(true)
        }
    }

    //todo 전화번호 validation
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const phoneCurrent = e.target.value
        setPhone(phoneCurrent)
        if (e.target.value.length != 11 || /\s/.test(phoneCurrent)) {
            setPhoneMessage(ALERTEXT.phoneValFalse)
            setIsPhone(false)
        } else {
            setPhoneMessage(ALERTEXT.phoneValTrue)
            setIsPhone(true)
        }
    }

    //todo 이메일 validation
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const emailRegex =
            /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        const emailCurrent = e.target.value
        setEmail(emailCurrent)

        if (emailRegex.test(emailCurrent)) {
            setEmailMessage(ALERTEXT.idValTrue)
            console.log(emailMessage)
            setIsEmail(true)
        } else {
            setEmailMessage(ALERTEXT.idValFalse)
            console.log(emailMessage)
            setIsEmail(false)
        }
    }

    const handleFin = () => {
        alert(ALERTEXT.valfalse);
    }

    return (
        <Fragment>
            <div className={"info-container"}>
                <img className={"intro-cat-icon"} src={Prologuimages.catIcon1}/>
                <text className={"info-txt"}>{PrologueText.conInfoDesc1}</text>
                <text className={"alert-txt"}
                      style={{marginTop: "-2.11rem"}}>*{method}{PrologueText.conInfoAlert1} {method}{PrologueText.conInfoAlert2}</text>

                {/*todo 이름 입력*/}
                <div className={"input-name-container"}>
                    <div>
                        <input
                            className={"info-input"}
                            placeholder={"입금자 이름 (2~5글자 미만)"}
                            value={name !== null ? name : ""}
                            onChange={handleNameChange}
                        />
                        {name.length > 0 &&
                            <span className={`alert-text ${isName ? 'success' : 'error'}`}>{nameMessage}</span>}
                    </div>
                </div>

                {/*todo 전화번호 입력*/}
                <div className={"input-name-container"}>
                    {method === "SMS" && (
                        <div>
                            <input
                                className={"info-input"}
                                placeholder={"ex) 01012345678"}
                                value={phone !== null ? phone : ""}
                                onChange={handlePhoneChange}
                            />
                            {phone.length > 0 && (
                                <span className={`alert-text ${isPhone ? 'success' : 'error'}`}>{phoneMessage}</span>
                            )}
                        </div>
                    )}
                    {method === "EMAIL" && (
                        <div>
                            <input
                                className={"info-input"}
                                placeholder={"ex) example@xxx.com"}
                                value={email !== null ? email : ""}
                                onChange={handleEmailChange}
                            />
                            {email.length > 0 &&
                                <span className={`alert-text ${isEmail ? 'success' : 'error'}`}>{emailMessage}</span>}
                        </div>
                    )}
                </div>

                {(name !== '') || (phone !== '' || email !== '') ? (
                    <button onClick={handleFin} style={{border: 'none', background: "none", color:"black"}}>
                        <text className={"fin-btn"} >{PrologueText.finishBtn1}</text>
                    </button>
                ) : (
                    <Link to={`/pre/donate`} state={{username: name, phoneNumber: phone, email: email, alarmMethod: method}}
                          style={{textDecoration: "none", color: "black"}}>
                        <text className={"fin-btn"}>{PrologueText.finishBtn1}</text>
                    </Link>
                )}


            </div>
        </Fragment>
    );
}
export default PreContributorInfoScreen