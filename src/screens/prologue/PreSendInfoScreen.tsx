import React, {Fragment, useState} from "react";
import './styles.css';
import {IMAGES} from "../../constants/images";
import {Prologuimages} from "../../constants/prologuimages";
import {PrologueText} from "../../constants/prologueText";

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

                <button onClick={handleDonate} style={{border: 'none', background: "none", }}>
                    <text className={"intro_btn"} style={{marginBottom:"0.56rem"}}>문자로 받기</text>
                    <text className={"intro_btn"} >이메일로 받기</text>
                </button>
            </div>
        </Fragment>
    );
}
export default PreSendInfoScreen