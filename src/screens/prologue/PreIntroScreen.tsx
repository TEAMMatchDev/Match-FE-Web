import React, {Fragment, useState} from "react";
import './styles.css';
import {IMAGES} from "../../constants/images";
import {Prologuimages} from "../../constants/prologuimages";
import {PrologueText} from "../../constants/prologueText";

const PreIntroScreen = () => {

    const handleDonate = () => {
        const loginpage = process.env.REACT_APP_PUBLIC_URL+`/pre/login`;
        window.location.href = loginpage
    }

    return (
        <Fragment>
            <div className={"intro_container"}>
                <img className={"intro_cat_icon"} src={Prologuimages.catIcon1}/>
                <text className={"intro_txt"}>{PrologueText.intro1}</text>
                <button onClick={handleDonate}style={{border: 'none', background: "none"}}>
                    <text className={"intro_btn"} >{PrologueText.donateBtn}</text>
                </button>
            </div>
        </Fragment>
    );
}
export default PreIntroScreen