import React, {Fragment, useState} from "react";
import '../styles.css';
import {IMAGES} from "../../../constants/images";
import {Prologuimages} from "../../../constants/prologuimages";
import {PrologueText} from "../../../constants/prologueText";
import * as process from "process";

const PreIntroScreen = () => {

    window.addEventListener('message', (event) => {
        if (event.origin !== 'your-popup-origin') {
            return; // Ensure that the message is from a trusted origin
        }
    });

    const handleLoginPopup = () => {
        const [popupData, setPopupData] = useState(null);

        const popupWidth = 330; // Set the width of the popup window
        const popupHeight = 250; // Set the height of the popup window

        // Calculate the left and top positions to center the popup window
        const left = window.innerWidth / 2 - popupWidth / 2 + window.screenX;
        const top = window.innerHeight / 2 - popupHeight / 2 + window.screenY;

        const popupURL = '/popupLogin';
        window.open(
            popupURL,
            'Login Popup', // Specify a window name or use '_blank' to open in a new tab
            `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`
        );

    }
    const handleIntro = () => {
        const intropage = `/intro/1`;
        window.location.href = intropage;
    }

    return (
        <Fragment>
            <div className={"intro-container"}>
                <img className={"intro-cat-icon"} src={Prologuimages.catIcon1}/>
                <text className={"intro-txt"}>{PrologueText.intro1}</text>
                <button onClick={handleIntro} style={{border: 'none', background: "none", color:"black"}}>
                    <text className={"intro-btn2"} >{PrologueText.introBtn}</text>
                </button>
                <button onClick={handleLoginPopup} style={{border: 'none', background: "none", color:"black"}}>
                    <text className={"intro-btn"} >{PrologueText.donateBtn}</text>
                </button>
            </div>
        </Fragment>
    );
}
export default PreIntroScreen