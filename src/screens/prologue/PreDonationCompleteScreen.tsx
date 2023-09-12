import React, {Fragment, useState} from "react";
import './styles.css';
import {IMAGES} from "../../constants/images";
import {Prologuimages} from "../../constants/prologuimages";
import {PrologueText} from "../../constants/prologueText";
import {Link, useLocation} from "react-router-dom";

const PreDonationCompleteScreen = () => {



    const handleComplete = () => {
        const completepage = process.env.REACT_APP_PUBLIC_URL+`/menu`;
        window.location.href = completepage
    }

    return (
        <Fragment>
            <div className={"sendinfo-container"}>
                <img className={"login-cat-icon"} src={Prologuimages.catFace3}/>
                <text className={"donate-txt"} style={{marginBottom: "4rem"}}>{PrologueText.completeDesc}</text>

                <button onClick={handleComplete} style={{border: 'none', background: "none"}}>
                    <text className={"goto-menu-btn"} >{PrologueText.gotoMenuBtn}</text>
                </button>
            </div>
        </Fragment>
    );
}
export default PreDonationCompleteScreen