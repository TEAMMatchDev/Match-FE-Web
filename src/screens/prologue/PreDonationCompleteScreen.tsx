import React, {Fragment, useState} from "react";
import './styles.css';
import {IMAGES} from "../../constants/images";
import {Prologuimages} from "../../constants/prologuimages";
import {PrologueText} from "../../constants/prologueText";
import {Link, useLocation} from "react-router-dom";

const PreDonationCompleteScreen = () => {

    //프로젝트명 props로 전달받음
    const location = useLocation();
    const { donationKind } = location.state


    const handleDonate = () => {
        const completepage = process.env.REACT_APP_PUBLIC_URL+`/pre/donate/complete`;
        window.location.href = completepage
    }

    return (
        <Fragment>
            <div className={"sendinfo_container"}>
                기부 완료

            </div>
        </Fragment>
    );
}
export default PreDonationCompleteScreen