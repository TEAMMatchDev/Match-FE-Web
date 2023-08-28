import {IMAGES} from "../../constants/images";
import React, {Fragment, useEffect} from "react";
//import {BrowserRouter as Router, Outlet, Route, Routes} from 'react-router-dom';
import axios from "axios";
import * as process from "process";

const baseUrl = 'https://www.match-api-server.com';

const HomeScreen = ()=> {
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
                <div>
                    <img src={IMAGES.mainPage4}/>
                </div>
            </div>
        </>
    );
}

export default HomeScreen