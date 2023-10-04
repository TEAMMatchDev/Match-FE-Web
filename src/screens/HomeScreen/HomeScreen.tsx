import {IMAGES} from "../../constants/images";
import React, {Fragment, useEffect} from "react";
//import {BrowserRouter as Router, Outlet, Route, Routes} from 'react-router-dom';
import './styles.css';

import axios from "axios";
import * as process from "process";

const baseUrl = process.env.REACT_APP_BASE_URL

const HomeScreen = ()=> {
    const REACT_APP_PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;

    const lookAroundScreenUrl = REACT_APP_PUBLIC_URL+'/lookAround';
    const handleLookBtn = () => {
        window.location.href = lookAroundScreenUrl;
    }



    return (
        <>
            <div>
                <div>
                    <img src={IMAGES.mainPage1} style={{width:"100%"}}/>
                </div>
                <div>
                    <img src={IMAGES.mainPage2} style={{width:"100%"}}/>
                </div>
                <div>
                    <img src={IMAGES.mainPage3} style={{width:"100%"}}/>
                </div>
                <div className={"main4"}>
                    <img src={IMAGES.mainPage4} style={{width:"100%"}}/>
                </div>

                {/*todo --lookAround 페이지로 이동하는 버튼*/}
                <div className={"lookaround_nextpage"}>
                    <button className={"lookaround-btn"}
                            onClick={() => handleLookBtn()}
                    >성냥기부 하러가기</button>
                </div>
            </div>
        </>
    );
}

export default HomeScreen