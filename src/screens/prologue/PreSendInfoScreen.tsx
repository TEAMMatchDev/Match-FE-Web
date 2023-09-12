import React, {Fragment, useState} from "react";
import './styles.css';
import {IMAGES} from "../../constants/images";
import {Prologuimages} from "../../constants/prologuimages";
import {PrologueText} from "../../constants/prologueText";
import {Link} from "react-router-dom";

const PreSendInfoScreen = () => {
    const handleDonate = () => {
        const loginpage = process.env.REACT_APP_PUBLIC_URL+`/pre/login`;
        window.location.href = loginpage
    }

    return (
        <Fragment>
            <div className={"sendinfo-container"}>
                <img className={"intro-cat-icon"} src={Prologuimages.catIcon1}/>
                <text className={"info-txt"} style={{marginTop:"1.61rem"}}>{PrologueText.sendInfoDesc1}</text>
                <text className={"info-txt"}>{PrologueText.sendInfoDesc2}</text>
                <text className={"info-txt"} style={{marginBottom:"1.94rem"}}>{PrologueText.sendInfoDesc3}</text>

                <Link to={`/pre/sendInfo/sms`} state= {{ method: `SMS` }} style={{textDecoration : "none", color: "black"}}>
                    <text className={"sendinfo-btn"} style={{marginBottom:"0.56rem"}}>문자로 받기</text>
                </Link>
                <Link to={`/pre/sendInfo/email`} state= {{ method: `EMAIL` }}  style={{textDecoration : "none", color: "black"}}>
                    <text className={"sendinfo-btn"}>이메일로 받기</text>
                </Link>

            </div>
        </Fragment>
    );
}
export default PreSendInfoScreen