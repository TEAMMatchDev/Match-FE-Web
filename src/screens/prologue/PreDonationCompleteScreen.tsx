import React, {Fragment, useState} from "react";
import './styles.css';
import {IMAGES} from "../../constants/images";
import {Prologuimages} from "../../constants/prologuimages";
import {PrologueText} from "../../constants/prologueText";
import {Link, useLocation} from "react-router-dom";

const PreDonationCompleteScreen = () => {



    const handleDonate = () => {
        const completepage = process.env.REACT_APP_PUBLIC_URL+`/pre/donate/complete`;
        window.location.href = completepage
    }

    return (
        <Fragment>
            <div className={"sendinfo_container"}>
                <img className={"login_cat_icon"} src={Prologuimages.catFace3}/>
                <text className={"donate_txt"} style={{marginBottom: "4rem"}}>{PrologueText.completeDesc}</text>

                <button onClick={handleDonate} style={{border: 'none', background: "none"}}>
                    <text className={"goto_menu_btn"} >{PrologueText.gotoMenuBtn}</text>
                </button>
            </div>
        </Fragment>
    );
}
export default PreDonationCompleteScreen