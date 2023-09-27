import React, {Fragment, useState} from "react";
import './styles.css';
import {IMAGES} from "../../constants/images";
import {Prologuimages} from "../../constants/prologuimages";
import {PrologueText} from "../../constants/prologueText";
import {Link} from "react-router-dom";

const PreSendInfoScreen = () => {

    return (
        <Fragment>
            <div className={"sendinfo-container"}>
                <img className={"intro-cat-icon"} src={Prologuimages.catIcon1}/>
                <text className={"info-txt"} style={{marginTop:"1.61rem", marginBottom:"1.94rem"}}>{PrologueText.sendInfoDesc1}</text>

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