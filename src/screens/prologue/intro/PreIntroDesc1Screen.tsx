import React, {Fragment, useState} from "react";
import '../styles.css';
import {IMAGES} from "../../../constants/images";
import {Prologuimages} from "../../../constants/prologuimages";
import {PrologueText} from "../../../constants/prologueText";

const PreIntroDesc1Screen = () => {

    const handleDonate = () => {
        const nextpage = `/intro/2`;
        window.location.href = nextpage
    }

    return (
        <Fragment>
            <div className={"intro-container"}>
                <img className={"intro-cat-icon"} src={Prologuimages.catIcon1}/>
                <text className={"desc-txt"}>{PrologueText.desc1_1}</text>
                <text className={"desc-txt"}>{PrologueText.desc1_2}</text>
                <text className={"desc-txt"}>{PrologueText.desc1_3}</text>
                <button onClick={handleDonate} style={{border: 'none', background: "none", color:"black"}}>
                    <text className={"intro-btn"} >{PrologueText.desc1_btn}</text>
                </button>
            </div>
        </Fragment>
    );
}
export default PreIntroDesc1Screen