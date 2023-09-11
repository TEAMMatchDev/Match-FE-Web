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
            <div className={"sendinfo_container"}>
                <img className={"intro_cat_icon"} src={Prologuimages.catIcon1}/>
                <text className={"info_txt"} style={{marginTop:"1.61rem"}}>{PrologueText.sendInfoDesc1}</text>
                <text className={"info_txt"}>{PrologueText.sendInfoDesc2}</text>
                <text className={"info_txt"} style={{marginBottom:"1.94rem"}}>{PrologueText.sendInfoDesc3}</text>

                <Link to={`/pre/sendInfo/sms`} state= {{ method: `SMS` }} style={{textDecoration : "none", color: "black"}}>
                    <text className={"sendinfo_btn"} style={{marginBottom:"0.56rem"}}>문자로 받기</text>
                </Link>
                <Link to={`/pre/sendInfo/email`} state= {{ method: `EMAIL` }}  style={{textDecoration : "none", color: "black"}}>
                    <text className={"sendinfo_btn"}>이메일로 받기</text>
                </Link>

            </div>
        </Fragment>
    );
}
export default PreSendInfoScreen