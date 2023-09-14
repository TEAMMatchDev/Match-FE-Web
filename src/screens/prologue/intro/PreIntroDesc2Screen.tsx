import React, {Fragment, useState} from "react";
import '../styles.css';
import {IMAGES} from "../../../constants/images";
import {Prologuimages} from "../../../constants/prologuimages";
import {PrologueText} from "../../../constants/prologueText";

const PreIntroDesc2Screen = () => {

    const handleDonate = () => {
        const intropage = process.env.REACT_APP_PUBLIC_URL+`/`;
        window.location.href = intropage
    }

    return (
        <Fragment>
            <div className={"intro-container"}>
                <img className={"intro-cat-icon"} src={Prologuimages.catIcon1}/>
                <text className={"desc-txt"}>{PrologueText.desc2_1}</text>
                <text className={"desc-txt"}>{PrologueText.desc2_2}</text>
                <text className={"desc-txt"}>{PrologueText.desc2_3}</text>
                <text className={"desc-txt"}>{PrologueText.desc2_4}</text>
                <text className={"desc-txt"}>{PrologueText.desc2_5}</text>
                <button onClick={handleDonate} style={{border: 'none', background: "none"}}>
                    <text className={"intro-btn"} >{PrologueText.donateBtn}</text>
                </button>
            </div>
        </Fragment>
    );
}
export default PreIntroDesc2Screen