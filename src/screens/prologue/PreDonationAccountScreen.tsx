import React, {Fragment, useState} from "react";
import './styles.css';
import {IMAGES} from "../../constants/images";
import {Prologuimages} from "../../constants/prologuimages";
import {PrologueText} from "../../constants/prologueText";
import {Link, useLocation} from "react-router-dom";

const PreDonationAccountScreen = () => {

    //프로젝트명 props로 전달받음
    const location = useLocation();
    const { donationKind } = location.state


    const handleDonate = () => {
        const loginpage = process.env.REACT_APP_PUBLIC_URL+`/pre/login`;
        window.location.href = loginpage
    }

    return (
        <Fragment>
            <div className={"sendinfo_container"}>
                <img className={"intro_cat_icon"} src={Prologuimages.catIcon1}/>
                <text className={"alert_txt"} style={{marginTop:"-2.11rem"}}>{donationKind}을(를)</text>
                <text className={"info_txt"} style={{marginTop:"1.61rem"}}>{PrologueText.donateInfo2Desc}</text>
                <text className={"info_txt"}>{PrologueText.account}</text>
                <text className={"info_txt"} style={{marginBottom:"1.94rem"}}>{PrologueText.donateDesc3}</text>


                <button onClick={() => handleDonate}>
                    <text className={"fin_btn"} >{PrologueText.finishBtn2}</text>
                </button>


            </div>
        </Fragment>
    );
}
export default PreDonationAccountScreen