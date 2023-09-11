import React, {Fragment, useState} from "react";
import './styles.css';
import {IMAGES} from "../constants/images";
import {Prologuimages} from "../constants/prologuimages";
import {PrologueText} from "../constants/prologueText";
import {Link, useLocation} from "react-router-dom";

const Menu = () => {



    const handleComplete = () => {
        const completepage = process.env.REACT_APP_PUBLIC_URL+`/menu`;
        window.location.href = completepage
    }

    return (
        <Fragment>
            <div className={"sendinfo_container"}>
                메뉴
            </div>
        </Fragment>
    );
}
export default Menu