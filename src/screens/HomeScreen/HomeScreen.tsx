import {IMAGES} from "../../constants/images";
import React, {Fragment, useEffect} from "react";
//import {BrowserRouter as Router, Outlet, Route, Routes} from 'react-router-dom';
import './styles.css';

import axios from "axios";
import * as process from "process";

const baseUrl = 'https://www.match-api-server.com';

const HomeScreen = ()=> {
    const REACT_APP_PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;

    const lookAroundScreenUrl = REACT_APP_PUBLIC_URL+'/lookArround';
    const handleLookBtn = () => {
        window.location.href = lookAroundScreenUrl;
    }



    return (
        <>
            <div>
                <div>
                    <img src={IMAGES.mainPage1}/>
                </div>
                <div>
                    <img src={IMAGES.mainPage2}/>
                </div>
                <div>
                    <img src={IMAGES.mainPage3}/>
                </div>
                <div className={"main4"}>
                    <img src={IMAGES.mainPage4}/>
                </div>

                <div className={"lookarround_nextpage"}>
                    <button className={"lookarround-btn"}
                            onClick={() => handleLookBtn()}
                    >성냥기부 하러가기</button>
                </div>
            </div>
        </>
    );
}

export default HomeScreen